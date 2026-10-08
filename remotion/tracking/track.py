"""Rastreia as aréolas no vídeo e salva as posições em public/tracking.json.

Uso:
    python tracking/track.py public/07out_Reels.mp4

1. Uma janela abre com um controle deslizante: arraste até o frame em que a
   aréola aparece pela primeira vez e aperte ENTER.
2. Desenhe um retângulo em cada aréola (ENTER confirma cada uma, ESC termina).
3. O vídeo roda com os círculos. Teclas durante o rastreio:
     ESPAÇO  pausa e reseleciona. Se você apertar ESC sem desenhar nada, os
             círculos somem a partir dali (aréola fora de quadro/coberta);
             ESPAÇO de novo, no frame em que ela volta, para selecionar outra vez.
     q       cancela.
Frames sem aréola ficam sem círculo.
"""
import argparse
import json
import sys

import cv2
import numpy as np


MAX_VIEW_H = 800  # altura máxima das janelas (cabe em telas pequenas)


def fit(img):
    """Reduz a imagem para caber na tela; devolve (imagem, fator)."""
    h = img.shape[0]
    if h <= MAX_VIEW_H:
        return img, 1.0
    k = MAX_VIEW_H / h
    return cv2.resize(img, None, fx=k, fy=k, interpolation=cv2.INTER_AREA), k


def make_tracker():
    if hasattr(cv2, "TrackerCSRT_create"):
        return cv2.TrackerCSRT_create()
    return cv2.legacy.TrackerCSRT_create()


def pick_start_frame(cap, total):
    state = {"pos": 0}

    def show(pos):
        state["pos"] = pos
        cap.set(cv2.CAP_PROP_POS_FRAMES, pos)
        ok, fr = cap.read()
        if ok:
            view = fr.copy()
            cv2.putText(view, f"frame {pos}/{total - 1}  (ENTER = usar este)",
                        (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
            cv2.imshow("Escolha o frame em que a areola aparece", fit(view)[0])

    cv2.namedWindow("Escolha o frame em que a areola aparece", cv2.WINDOW_AUTOSIZE)
    cv2.createTrackbar("frame", "Escolha o frame em que a areola aparece", 0,
                       max(total - 1, 1), show)
    show(0)
    while True:
        key = cv2.waitKey(30) & 0xFF
        if key in (13, 10):
            break
        if key == ord("q"):
            sys.exit("Cancelado")
        if key in (81, ord("a")):  # seta esquerda
            pos = max(0, state["pos"] - 1)
            cv2.setTrackbarPos("frame", "Escolha o frame em que a areola aparece", pos)
        if key in (83, ord("d")):  # seta direita
            pos = min(total - 1, state["pos"] + 1)
            cv2.setTrackbarPos("frame", "Escolha o frame em que a areola aparece", pos)
    cv2.destroyAllWindows()
    return state["pos"]


def select_rois(frame, title):
    rois = []
    img, k = fit(frame.copy())
    print("Clique e ARRASTE com o botão esquerdo sobre a areola; "
          "depois ENTER (ou ESPAÇO). ESC = terminar.")
    while True:
        box = cv2.selectROI(f"{title} (arraste, depois ENTER; ESC=terminar)",
                            img, False)
        if box[2] == 0 or box[3] == 0:
            break
        rois.append(tuple(int(round(v / k)) for v in box))
        cv2.rectangle(img, (box[0], box[1]),
                      (box[0] + box[2], box[1] + box[3]), (0, 255, 0), 2)
    cv2.destroyAllWindows()
    return rois


def init_trackers(frame, rois):
    trackers = []
    for r in rois:
        t = make_tracker()
        t.init(frame, r)
        trackers.append(t)
    return trackers


def smooth_runs(series, window):
    """series: lista (por frame) de lista de [cx, cy, r]; suaviza cada aréola
    nos trechos contínuos em que ela existe."""
    if window <= 1:
        return series
    out = [[p[:] for p in f] for f in series]
    max_n = max((len(f) for f in series), default=0)
    for i in range(max_n):
        start = None
        for f in range(len(series) + 1):
            has = f < len(series) and len(series[f]) > i
            if has and start is None:
                start = f
            if not has and start is not None:
                seg = np.array([series[k][i] for k in range(start, f)], dtype=float)
                if len(seg) >= window:
                    pad = window // 2
                    padded = np.pad(seg, ((pad, pad), (0, 0)), mode="edge")
                    kern = np.ones(window) / window
                    seg = np.stack([np.convolve(padded[:, c], kern, mode="valid")
                                    for c in range(3)], axis=1)
                for k, row in zip(range(start, f), seg):
                    out[k][i] = [float(v) for v in row]
                start = None
    return out


def finish(args, rows, lost_frames, fps, width, height):
    series = []
    for f in rows:
        series.append([[b[0] + b[2] / 2, b[1] + b[3] / 2,
                        max(b[2], b[3]) * args.scale / 2] for b in f])
    series = smooth_runs(series, args.smooth)
    tracks = [[[round(float(v), 1) for v in p] for p in f] for f in series]

    with open(args.out, "w") as fh:
        json.dump({"fps": fps, "width": width, "height": height,
                   "frames": len(tracks), "tracks": tracks}, fh)
    print(f"OK: {len(tracks)} frames -> {args.out}")
    if lost_frames:
        print(f"ATENÇÃO: rastreio perdido em {len(lost_frames)} frames "
              f"(ex.: {lost_frames[:10]}). Confira esses trechos no Studio.")


def parse_plan(text, fps):
    """'4.2@x,y,w,h;x,y,w,h|9.8@|11.5@x,y,w,h' -> {frame: [rois]}"""
    kf = {}
    for part in text.split("|"):
        part = part.strip()
        if not part:
            continue
        t, _, boxes = part.partition("@")
        rois = [tuple(int(float(v)) for v in b.split(","))
                for b in boxes.split(";") if b.strip()]
        kf[int(round(float(t) * fps))] = rois
    return kf


def run_plan(cap, kf):
    """Rastreia sem janelas: reinicia os rastreadores em cada ponto do plano."""
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    rows, lost_frames = [], []
    trackers, boxes = [], []
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if idx in kf:
            boxes = [list(r) for r in kf[idx]]
            trackers = init_trackers(frame, kf[idx])
        else:
            lost = False
            for i, t in enumerate(trackers):
                good, box = t.update(frame)
                if good:
                    boxes[i] = [int(v) for v in box]
                else:
                    lost = True
            if lost:
                lost_frames.append(idx)
        rows.append([b[:] for b in boxes])
        idx += 1
    return rows, lost_frames


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--out", default="public/tracking.json")
    ap.add_argument("--start-frame", type=int,
                    help="frame inicial (pula o controle deslizante)")
    ap.add_argument("--rois", help="x,y,w,h;x,y,w,h (pula a seleção manual)")
    ap.add_argument("--scale", type=float, default=1.8,
                    help="diâmetro do círculo = lado maior da caixa * scale")
    ap.add_argument("--smooth", type=int, default=5)
    ap.add_argument("--no-preview", action="store_true")
    ap.add_argument("--plan",
                    help="plano gerado pelo picker.html (sem janelas do OpenCV)")
    ap.add_argument("--export-frame", type=int,
                    help="salva esse frame em frame.png (para ler as coordenadas "
                         "no Paint) e sai")
    args = ap.parse_args()

    cap = cv2.VideoCapture(args.video)
    if not cap.isOpened():
        sys.exit(f"Não consegui abrir {args.video}")
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    if args.plan:
        rows, lost_frames = run_plan(cap, parse_plan(args.plan, fps))
        finish(args, rows, lost_frames, fps, width, height)
        return

    if args.export_frame is not None:
        cap.set(cv2.CAP_PROP_POS_FRAMES, args.export_frame)
        ok, fr = cap.read()
        if not ok:
            sys.exit("Frame inválido")
        cv2.imwrite("frame.png", fr)
        sys.exit(f"Salvo frame.png ({width}x{height}).")

    start = args.start_frame
    if start is None:
        start = 0 if args.no_preview else pick_start_frame(cap, total)
    cap.set(cv2.CAP_PROP_POS_FRAMES, start)
    ok, first = cap.read()
    if not ok:
        sys.exit("Não consegui ler o frame inicial")

    if args.rois:
        rois = [tuple(int(v) for v in r.split(",")) for r in args.rois.split(";")]
    else:
        rois = select_rois(first, "Selecione cada areola")
    if not rois:
        sys.exit("Nenhuma aréola selecionada")

    trackers = init_trackers(first, rois)
    boxes = [list(r) for r in rois]

    rows = [[] for _ in range(start)] + [[b[:] for b in boxes]]
    lost_frames = []
    idx = start
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        idx += 1
        lost = False
        for i, t in enumerate(trackers):
            good, box = t.update(frame)
            if good:
                boxes[i] = [int(v) for v in box]
            else:
                lost = True
        if lost:
            lost_frames.append(idx)
        rows.append([b[:] for b in boxes] if trackers else [])

        if not args.no_preview:
            view = frame.copy()
            for b in rows[-1]:
                cx, cy = b[0] + b[2] / 2, b[1] + b[3] / 2
                rad = int(max(b[2], b[3]) * args.scale / 2)
                cv2.circle(view, (int(cx), int(cy)), rad, (90, 20, 10), -1)
            if lost:
                cv2.putText(view, "PERDEU - reselecione", (20, 40),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            elif not trackers:
                cv2.putText(view, "SEM CIRCULO - ESPACO quando a areola voltar",
                            (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
            cv2.imshow("Rastreio (ESPACO=reselecionar/ocultar, q=sair)", fit(view)[0])
            key = cv2.waitKey(1) & 0xFF
            if key == ord("q"):
                sys.exit("Cancelado")
            if key == 32 or lost:
                cv2.destroyAllWindows()
                new = select_rois(frame, "Reselecione (mesma ordem; ESC sem nada = ocultar)")
                trackers = init_trackers(frame, new)
                boxes = [list(r) for r in new]
                rows[-1] = [b[:] for b in boxes]

    finish(args, rows, lost_frames, fps, width, height)


if __name__ == "__main__":
    main()
