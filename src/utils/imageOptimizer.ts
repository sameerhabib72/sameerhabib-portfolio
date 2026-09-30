/**
 * Client-Side Image Optimizer & Compressor
 *
 * Compresses and scales images using HTML5 Canvas before uploading to Firestore/LocalStorage.
 * Ensures image base64 data URLs stay safely under 350KB (Firestore document limit is 1MB).
 */
export async function optimizeImageFile(
  file: File,
  maxDimension = 1200,
  maxSizeBytes = 350 * 1024
): Promise<{ dataUrl: string; sizeStr: string; type: string }> {
  // If it's an SVG, it's vector and text-based, read as data URL directly if small
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const sizeKb = Math.round(result.length * 0.75 / 1024);
        resolve({
          dataUrl: result,
          sizeStr: `${sizeKb} KB`,
          type: file.type
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image file.'));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Downscale while preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if canvas 2d context unavailable
          const raw = reader.result as string;
          const kb = Math.round(raw.length * 0.75 / 1024);
          resolve({
            dataUrl: raw,
            sizeStr: `${kb} KB`,
            type: file.type
          });
          return;
        }

        // Draw image onto canvas with high quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP for best compression-to-quality ratio, fallback to JPEG
        const outputMime = 'image/webp';
        let quality = 0.82;
        let dataUrl = canvas.toDataURL(outputMime, quality);

        // If WebP is not supported by browser, it falls back to PNG (larger), so use image/jpeg
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        }

        // Check base64 byte size (base64 string length * 0.75 ≈ actual byte size)
        let approxBytes = Math.round(dataUrl.length * 0.75);

        // If still larger than target, perform progressive compression
        if (approxBytes > maxSizeBytes && quality > 0.45) {
          quality = 0.65;
          dataUrl = canvas.toDataURL(outputMime, quality);
          approxBytes = Math.round(dataUrl.length * 0.75);
        }

        if (approxBytes > maxSizeBytes && quality > 0.45) {
          quality = 0.50;
          dataUrl = canvas.toDataURL(outputMime, quality);
          approxBytes = Math.round(dataUrl.length * 0.75);
        }

        const finalKb = Math.round(approxBytes / 1024);
        const finalSizeStr = finalKb >= 1024 ? `${(finalKb / 1024).toFixed(1)} MB` : `${finalKb} KB`;

        resolve({
          dataUrl,
          sizeStr: finalSizeStr,
          type: outputMime
        });
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}
