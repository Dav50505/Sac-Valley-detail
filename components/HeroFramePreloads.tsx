import { preload } from "react-dom";

const FRAME_DIRECTORY = "/frames";
const FRAME_PREFIX = "frame_";
const FRAME_EXTENSION = "png";
const FRAME_PAD_LENGTH = 4;
const PRELOAD_FRAME_COUNT = 10;

function getFramePath(index: number) {
  return `${FRAME_DIRECTORY}/${FRAME_PREFIX}${String(index + 1).padStart(
    FRAME_PAD_LENGTH,
    "0",
  )}.${FRAME_EXTENSION}`;
}

export default function HeroFramePreloads() {
  for (let index = 0; index < PRELOAD_FRAME_COUNT; index += 1) {
    preload(getFramePath(index), {
      as: "image",
      fetchPriority: index < 2 ? "high" : "low",
    });
  }

  return null;
}
