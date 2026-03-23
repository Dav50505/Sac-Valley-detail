import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

async function getLogoDataUrl() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo-sac.png"));
  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}

export default async function Icon() {
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
            "radial-gradient(circle at top, rgba(255,107,0,0.28), transparent 52%), #0a0a0a",
          border: "4px solid #ff6b00",
          borderRadius: "16px",
        }}
      >
        <img
          src={logoDataUrl}
          alt=""
          width={42}
          height={42}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size,
  );
}
