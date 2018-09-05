export function toBlob(imageData) {
  let byteString = atob(imageData.split(",")[1]);
  let mimeString = imageData
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  let arrayBuffer = new ArrayBuffer(byteString.length);
  let _ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i);
  }
  let dataView = new DataView(arrayBuffer);
  return new Blob([dataView], { type: mimeString });
}
