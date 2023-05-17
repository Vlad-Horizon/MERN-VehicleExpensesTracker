export const base64DecodeFile = (base64String: string, filename?: string): File | undefined => {
  if (!base64String) return;

  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  if (filename) {
    return new File([u8arr], filename, { type: mime });
  }
  return new File([u8arr], 'file', { type: mime });
}