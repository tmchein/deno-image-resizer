import { serve } from "https://deno.land/std@0.173.0/http/server.ts";
import { initializeImageMagick } from "https://deno.land/x/imagemagick_deno@0.0.14/mod.ts";
import { getRemoteImage } from "./helpers/getRemoteImage.ts";
import { modifyImage } from "./helpers/modifyImage.ts";
import { parseParams } from "./helpers/parseParams.ts";

serve(async (req: Request) => {
  await initializeImageMagick();
  const reqURL = new URL(req.url);
  const params = parseParams(reqURL);
  if (typeof params === "string") {
    return new Response(params, { status: 400 });
  }
  const remoteImage = await getRemoteImage(params.image);
  if (typeof remoteImage === "string") {
    return new Response(remoteImage, { status: 400 });
  }

  const modifiedImage = await modifyImage(remoteImage.buffer, params);
  return new Response(modifiedImage, {
    headers: {
      "Content-Type": remoteImage.mediaType,
    },
  });
});
