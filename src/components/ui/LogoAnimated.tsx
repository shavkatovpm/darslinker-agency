"use client";

type LogoAnimatedProps = {
  size?: number;
};

export function LogoAnimated({ size = 60 }: LogoAnimatedProps) {
  const layerSize = size * 0.7;
  const radius = size * 0.15;
  const halfLayer = layerSize / 2;
  const gap = size * 0.15;

  return (
    <>
      <div
        className="dl-logo-anim relative"
        style={{ width: size, height: size }}
      >
        <div
          className="dl-anim-back absolute"
          style={{
            width: layerSize,
            height: layerSize,
            borderRadius: radius,
            background: "#ffc700",
            top: "50%",
            marginTop: -halfLayer,
            left: 0,
            opacity: 0.2,
            transform: "rotate(45deg)",
          }}
        />
        <div
          className="dl-anim-mid absolute"
          style={{
            width: layerSize,
            height: layerSize,
            borderRadius: radius,
            background: "#ffc700",
            top: "50%",
            marginTop: -halfLayer,
            left: gap,
            opacity: 0.5,
            transform: "rotate(45deg)",
          }}
        />
        <div
          className="dl-anim-front absolute"
          style={{
            width: layerSize,
            height: layerSize,
            borderRadius: radius,
            background: "#ffc700",
            top: "50%",
            marginTop: -halfLayer,
            left: gap * 2,
            opacity: 1,
            transform: "rotate(45deg)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes dl-rot-f {
          0%, 33%, 100% { transform: rotate(45deg); }
          55% { transform: rotate(135deg); }
          75% { transform: rotate(45deg); }
        }
        @keyframes dl-rot-m {
          0%, 33%, 100% { transform: rotate(45deg); }
          57% { transform: rotate(130deg); }
          77% { transform: rotate(45deg); }
        }
        @keyframes dl-rot-b {
          0%, 33%, 100% { transform: rotate(45deg); }
          59% { transform: rotate(125deg); }
          79% { transform: rotate(45deg); }
        }
        .dl-anim-front { animation: dl-rot-f 1.5s ease-in-out infinite; }
        .dl-anim-mid   { animation: dl-rot-m 1.5s ease-in-out infinite 0.06s; }
        .dl-anim-back  { animation: dl-rot-b 1.5s ease-in-out infinite 0.12s; }
      `}</style>
    </>
  );
}
