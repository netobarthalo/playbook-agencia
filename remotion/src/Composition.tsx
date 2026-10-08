import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";

const VIDEO_FILE = "07out_Reels.mp4";

type Track = [number, number, number]; // x, y, raio (px)

type Props = {
  tracks: Track[][]; // [frame][areola]
  color: string;
  padding: number; // px extras no raio, margem de segurança
};

const calculateMetadata: CalculateMetadataFunction<Props> = async () => {
  const res = await fetch(staticFile("tracking.json"));
  const data = await res.json();
  return {
    durationInFrames: data.frames,
    fps: data.fps,
    width: data.width,
    height: data.height,
    props: { tracks: data.tracks, color: "#050d2e", padding: 6 },
  };
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={60}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ tracks: [], color: "#050d2e", padding: 6 }}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = ({ tracks, color, padding }) => {
  const frame = useCurrentFrame();
  const circles = tracks[Math.min(frame, tracks.length - 1)] ?? [];

  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(VIDEO_FILE)} />
      {circles.map(([x, y, r], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - r - padding,
            top: y - r - padding,
            width: (r + padding) * 2,
            height: (r + padding) * 2,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
