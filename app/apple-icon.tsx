import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

async function getLogoDataUrl() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo-sac.png"));
  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}

export default async function AppleIcon() {
  const logoDataUrl = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, rgba(255,107,0,0.24), transparent 50%), #0a0a0a",
          border: "10px solid #ff6b00",
          borderRadius: "42px",
        }}
      >
        <img
          src={logoDataUrl}
          alt=""
          width={116}
          height={116}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size,
  );
}
