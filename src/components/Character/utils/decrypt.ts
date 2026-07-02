async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string,
  onProgress?: (loaded: number, total: number) => void
): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  const total = Number(response.headers.get("content-length")) || 0;
  const reader = response.body?.getReader();

  let encryptedData: ArrayBuffer;
  if (reader) {
    const chunks: Uint8Array[] = [];
    let loaded = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.length;
      onProgress?.(loaded, total);
    }
    const merged = new Uint8Array(loaded);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.length;
    }
    encryptedData = merged.buffer;
  } else {
    // Fallback for browsers without a readable stream body — no
    // incremental progress, but still resolves correctly.
    encryptedData = await response.arrayBuffer();
    onProgress?.(encryptedData.byteLength, encryptedData.byteLength || 1);
  }

  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
};
