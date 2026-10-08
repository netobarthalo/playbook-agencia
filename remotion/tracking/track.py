"""Rastreia as aréolas no vídeo e salva as posições em public/tracking.json.

Uso:
    python tracking/track.py public/07out_Reels.mp4

Você seleciona cada aréola no primeiro frame (ENTER confirma, ESC termina a
seleção). Durante o rastreio, aperte ESPAÇO para pausar e reselecionar caso o
círculo escape; 'q' cancela.
"""
import argparse
import json
import sys

import cv2
import numpy as np


def make_tracker():
    if hasattr(cv2, "TrackerCSRT_create"):
        return cv2.TrackerCSRT_create()
    return cv2.legacy.TrackerCSRT_create()


def select_rois(frame, title):
    rois = []
    while True:
        box = cv2.selectROI(f"{title} (ENTER=ok, ESC=terminar)", frame, False)
        if box[2] == 0 or box[3] == 0:
            break
        rois.append(tuple(int(v) for v in box))
        cv2.rectangle(frame, (box[0], box[1]),
                      (box[0] + box[2], box[1] + box[3]), (0, 255, 0), 2)
    cv2.destroyAllWindows()
    return rois


def smooth(series, window):
    if window <= 1 or len(series) < window:
        return series
    pad = window // 2
    padded = np.pad(series, ((pad, pad), (0, 0)), mode="edge")
    kernel = np.ones(window) / window
    return np.stack(
        [np.convolve(padded[:, c], kernel, mode="valid") for c in range(series.shape[1])],
        axis=1,
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--out", default="public/tracking.json")
    ap.add_argument("--rois", help='x,y,w,h;x,y,w,h (pula a seleção manual)')
    ap.add_argument("--scale", type=float, default=1.8,
                    help="diâmetro do círculo = lado maior da caixa * scale")
    ap.add_argument("--smooth", type=int, default=5)
    ap.add_argument("--no-preview", action="store_true")
    args = ap.parse_args()

    cap = cv2.VideoCapture(args.video)
    if not cap.isOpened():
        sys.exit(f"Não consegui abrir {args.video}")
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    ok, first = cap.read()
    if not ok:
        sys.exit("Vídeo vazio")

    if args.rois:
        rois = [tuple(int(v) for v in r.split(",")) for r in args.rois.split(";")]
    else:
        rois = select_rois(first.copy(), "Selecione cada aréola")
    if not rois:
        sys.exit("Nenhuma aréola selecionada")

    trackers = []
    for r in rois:
        t = make_tracker()
        t.init(first, r)
        trackers.append(t)
    boxes = [list(r) for r in rois]

    rows = [[b[:] for b in boxes]]
    lost_frames = []
    idx = 0
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
        rows.append([b[:] for b in boxes])

        if not args.no_preview:
            view = frame.copy()
            for b in boxes:
                cx, cy = b[0] + b[2] / 2, b[1] + b[3] / 2
                rad = int(max(b[2], b[3]) * args.scale / 2)
                cv2.circle(view, (int(cx), int(cy)), rad, (90, 20, 10), -1)
            if lost:
                cv2.putText(view, "PERDEU - ESPACO para reselecionar", (20, 40),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            cv2.imshow("Rastreio (ESPACO=reselecionar, q=sair)", view)
            key = cv2.waitKey(1) & 0xFF
            if key == ord("q"):
                sys.exit("Cancelado")
            if key == 32 or lost:
                cv2.destroyAllWindows()
                new = select_rois(frame.copy(), "Reselecione (mesma ordem)")
                if len(new) == len(trackers):
                    trackers = []
                    for r in new:
                        t = make_tracker()
                        t.init(frame, r)
                        trackers.append(t)
                    boxes = [list(r) for r in new]
                    rows[-1] = [b[:] for b in boxes]

    arr = np.array(rows, dtype=float)  # frames x aréolas x (x,y,w,h)
    out_tracks = []
    n_frames, n_areas = arr.shape[0], arr.shape[1]
    per_area = []
    for a in range(n_areas):
        cx = arr[:, a, 0] + arr[:, a, 2] / 2
        cy = arr[:, a, 1] + arr[:, a, 3] / 2
        rad = np.maximum(arr[:, a, 2], arr[:, a, 3]) * args.scale / 2
        per_area.append(smooth(np.stack([cx, cy, rad], axis=1), args.smooth))
    for f in range(n_frames):
        out_tracks.append([[round(float(per_area[a][f][c]), 1) for c in range(3)]
                           for a in range(n_areas)])

    with open(args.out, "w") as fh:
        json.dump({"fps": fps, "width": width, "height": height,
                   "frames": n_frames, "tracks": out_tracks}, fh)
    print(f"OK: {n_frames} frames, {n_areas} aréolas -> {args.out}")
    if lost_frames:
        print(f"ATENÇÃO: rastreio perdido em {len(lost_frames)} frames "
              f"(ex.: {lost_frames[:10]}). Confira esses trechos no Studio.")


if __name__ == "__main__":
    main()
