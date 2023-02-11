import {
  ImageMagick,
  MagickGeometry,
} from "https://deno.land/x/imagemagick_deno@0.0.14/mod.ts";

type paramsType = {
  width: number;
  height: number;
};

export function modifyImage(imageBuffer: Uint8Array, params: paramsType) {
  const sizingData = new MagickGeometry(params.width, params.height);
  sizingData.ignoreAspectRatio = params.height > 0 && params.width > 0;
  return new Promise<Uint8Array>((resolve) => {
    ImageMagick.read(imageBuffer, (image) => {
      image.resize(sizingData);
      image.write((data) => resolve(data));
    });
  });
}
