"use client";

type LogoProps = {
  size?: number;
  animate?: boolean;
};

export function Logo({ size = 40, animate = false }: LogoProps) {
  const layerSize = size * 0.7;
  const radius = size * 0.15;
  const halfLayer = layerSize / 2;
  const gap = size * 0.15;

  const baseStyle = (left: number, opacity: number) => ({
    width: layerSize,
    height: layerSize,
    borderRadius: radius,
    background: "#ffc700",
    top: "50%",
    marginTop: -halfLayer,
    left,
    opacity,
  });

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className={`absolute ${animate ? "dl-nav-back" : ""}`}
        style={{
          ...baseStyle(0, 0.2),
          ...(!animate ? { transform: "rotate(45deg)" } : {}),
        }}
      />
      <div
        className={`absolute ${animate ? "dl-nav-mid" : ""}`}
        style={{
          ...baseStyle(gap, 0.5),
          ...(!animate ? { transform: "rotate(45deg)" } : {}),
        }}
      />
      <div
        className={`absolute ${animate ? "dl-nav-front" : ""}`}
        style={{
          ...baseStyle(gap * 2, 1),
          ...(!animate ? { transform: "rotate(45deg)" } : {}),
        }}
      />
    </div>
  );
}
