import { parseMediaType } from "https://deno.land/std@0.175.0/media_types/parse_media_type.ts";

export async function getRemoteImage(image: string) {
  const sourceRes = await fetch(image);
  if (!sourceRes.ok) {
    return "Error retrieving image from";
  }
  const mediaType = parseMediaType(sourceRes.headers.get("Content-Type")!)[0];
  if (mediaType.split("/")[0] !== "image") {
    return "URL is not image type.";
  }
  return {
    buffer: new Uint8Array(await sourceRes.arrayBuffer()),
    mediaType,
  };
}
