export const createUrlToFile = (file: File | undefined) => {
  if (!file) return '';

  return URL.createObjectURL(file);
}