import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Antanox";
  const description =
    searchParams.get("description") ||
    "Digital architecture and security intelligence for organizations where failure is not an option.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#050505",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#0047FF",
                borderRadius: "2px",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#888888",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ANTANOX
            </span>
          </div>

          <h1
            style={{
              fontSize: title.length > 30 ? "48px" : "64px",
              fontWeight: 700,
              color: "#F4F4F4",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "#888888",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "700px",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#0047FF",
              borderRadius: "50%",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              color: "#888888",
              letterSpacing: "0.05em",
            }}
          >
            ACCEPTING ENGAGEMENTS
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
