import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Darslinker Agency — Ta'lim biznesi uchun IT yechimlar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#232324",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #ffc700, #e6b400, #ffc700)",
          }}
        />

        {/* Logo squares */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 80,
            height: 80,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              border: "3px solid #ffc700",
              borderRadius: 8,
              transform: "rotate(45deg)",
              top: 5,
              left: 15,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              border: "3px solid rgba(255,199,0,0.5)",
              borderRadius: 8,
              transform: "rotate(30deg)",
              top: 10,
              left: 10,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              border: "3px solid rgba(255,199,0,0.25)",
              borderRadius: 8,
              transform: "rotate(60deg)",
              top: 0,
              left: 20,
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#f5f5f5",
            letterSpacing: -1,
            marginBottom: 16,
          }}
        >
          Darslinker Agency
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#9a9a9a",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Ta&apos;lim biznesi uchun website, CRM va SEO yechimlari
        </div>

        {/* Gold badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 40,
            padding: "10px 24px",
            borderRadius: 100,
            border: "1px solid rgba(255,199,0,0.3)",
            backgroundColor: "rgba(255,199,0,0.08)",
          }}
        >
          <div style={{ fontSize: 16, color: "#ffc700" }}>
            darslinker.agency
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
