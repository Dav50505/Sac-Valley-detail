import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteDescription, siteName } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getLogoDataUrl() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo-sac.png"));
  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const logoDataUrl = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,107,0,0.24), transparent 34%), linear-gradient(180deg, rgba(255,107,0,0.08), transparent 45%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 56,
            right: 56,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, rgba(255,107,0,0.95), transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "84px 72px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 28,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "#9d9d9d",
            }}
          >
            <img
              src={logoDataUrl}
              alt=""
              width={72}
              height={72}
              style={{ objectFit: "contain" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "#ff6b00",
                  boxShadow: "0 0 18px rgba(255,107,0,0.7)",
                }}
              />
              Sacramento Valley Mobile Detailing
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div
              style={{
                fontSize: 112,
                lineHeight: 0.88,
                fontWeight: 900,
                letterSpacing: "-0.08em",
                textTransform: "uppercase",
                maxWidth: 920,
              }}
            >
              {siteName}
            </div>
            <div
              style={{
                width: 180,
                height: 3,
                background:
                  "linear-gradient(90deg, rgba(255,107,0,0.95), transparent)",
              }}
            />
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.4,
                color: "#d4d4d4",
                maxWidth: 880,
              }}
            >
              {siteDescription}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
