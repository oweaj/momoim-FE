const imageValidChecker = (src: string) => {
  if (!src || typeof src !== "string") return false;
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|ico)$/i;
  if (imageExtensions.test(src)) return true;
  const dataUrlPattern = /^data:image\/(png|jpg|jpeg|gif|webp|bmp|svg\+xml|ico);base64,/;
  if (dataUrlPattern.test(src)) return true;
  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (e) {
    return false;
  }
};

export { imageValidChecker };
