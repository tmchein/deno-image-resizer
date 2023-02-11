export function parseParams(reqUrl: URL) {
  const image = reqUrl.searchParams.get("image");

  if (image === null) {
    return "Missing 'image' query parameter.";
  }

  const height = Number(reqUrl.searchParams.get("height")) || 0;
  const width = Number(reqUrl.searchParams.get("width")) || 0;

  if (height < 0 || width < 0) {
    return "Negative width or height is not supported.";
  }

  const maxDimension = 2048;
  if (height > maxDimension || width > maxDimension) {
    return `Width and height cannot exceed ${maxDimension}`;
  }

  return {
    image,
    height,
    width,
  };
}
