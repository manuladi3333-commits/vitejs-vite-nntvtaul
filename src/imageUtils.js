// src/imageUtils.js
const MAX_DIM = 1024;
const THUMB_DIM = 256;
const QUALITY = 0.85;
const MAX_FILE_BYTES = 40 * 1024 * 1024;   // 40MB — beyond this, decoding risks an OOM crash
const MAX_SOURCE_PIXELS = 40_000_000;      // ~40MP decoded ceiling

/**
 * Decodes a File into a bitmap, honoring EXIF orientation where supported.
  * Falls back to Image + object URL on browsers without createImageBitmap.
   */
   async function loadImage(file) {
     if (typeof createImageBitmap === "function") {
         try {
               // imageOrientation: "from-image" applies the EXIF rotation flag.
                     return await createImageBitmap(file, { imageOrientation: "from-image" });
                         } catch {
                               // fall through to the Image path
                                   }
                                     }
                                       return new Promise((resolve, reject) => {
                                           const url = URL.createObjectURL(file);
                                               const img = new Image();
                                                   img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
                                                       img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Unreadable image file")); };
                                                           img.src = url;
                                                             });
                                                             }

                                                             function sourceSize(img) {
                                                               return { sw: img.width, sh: img.height };
                                                               }

                                                               function drawToBlob(img, maxDim) {
                                                                 const { sw, sh } = sourceSize(img);
                                                                   const scale = Math.min(1, maxDim / Math.max(sw, sh));
                                                                     const w = Math.max(1, Math.round(sw * scale));
                                                                       const h = Math.max(1, Math.round(sh * scale));

                                                                         const canvas = document.createElement("canvas");
                                                                           canvas.width = w;
                                                                             canvas.height = h;
                                                                               const ctx = canvas.getContext("2d");
                                                                                 ctx.imageSmoothingQuality = "high";      // better downscale quality, no cost to us
                                                                                   ctx.drawImage(img, 0, 0, w, h);

                                                                                     return new Promise((resolve, reject) => {
                                                                                         canvas.toBlob(
                                                                                               (blob) => {
                                                                                                       if (!blob) return reject(new Error("Encode failed"));
                                                                                                               resolve({ blob, w, h, type: blob.type });
                                                                                                                     },
                                                                                                                           "image/webp",
                                                                                                                                 QUALITY
                                                                                                                                     );
                                                                                                                                       });
                                                                                                                                       }

                                                                                                                                       /** Returns { imageBlob, thumbBlob, width, height, type } — never the raw original. */
                                                                                                                                       export async function processImageFile(file) {
                                                                                                                                         if (!file.type.startsWith("image/")) throw new Error("Not an image file");
                                                                                                                                           if (file.size > MAX_FILE_BYTES) {
                                                                                                                                               throw new Error(`Image too large (${Math.round(file.size / 1048576)}MB). Max 40MB.`);
                                                                                                                                                 }

                                                                                                                                                   const img = await loadImage(file);
                                                                                                                                                     try {
                                                                                                                                                         const { sw, sh } = sourceSize(img);
                                                                                                                                                             if (sw * sh > MAX_SOURCE_PIXELS) {
                                                                                                                                                                   throw new Error(`Image resolution too high (${sw}×${sh}).`);
                                                                                                                                                                       }

                                                                                                                                                                           // Both encodes run concurrently — one decode, two parallel encodes.
                                                                                                                                                                               const [full, thumb] = await Promise.all([
                                                                                                                                                                                     drawToBlob(img, MAX_DIM),
                                                                                                                                                                                           drawToBlob(img, THUMB_DIM),
                                                                                                                                                                                               ]);

                                                                                                                                                                                                   return {
                                                                                                                                                                                                         imageBlob: full.blob,
                                                                                                                                                                                                               thumbBlob: thumb.blob,
                                                                                                                                                                                                                     width: full.w,
                                                                                                                                                                                                                           height: full.h,
                                                                                                                                                                                                                                 type: full.type,          // "image/webp", or "image/png" if WebP encode is unsupported
                                                                                                                                                                                                                                     };
                                                                                                                                                                                                                                       } finally {
                                                                                                                                                                                                                                           // ImageBitmap holds decoded pixels until explicitly closed.
                                                                                                                                                                                                                                               if (typeof img.close === "function") img.close();
                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                 }

                                                                                                                                                                                                                                                 export function blobToDataURL(blob) {
                                                                                                                                                                                                                                                   return new Promise((resolve, reject) => {
                                                                                                                                                                                                                                                       const r = new FileReader();
                                                                                                                                                                                                                                                           r.onload = () => resolve(r.result);
                                                                                                                                                                                                                                                               r.onerror = () => reject(new Error("Read failed"));
                                                                                                                                                                                                                                                                   r.readAsDataURL(blob);
                                                                                                                                                                                                                                                                     });
                                                                                                                                                                                                                                                                     }

                                                                                                                                                                                                                                                                     export async function dataURLToBlob(dataURL) {
                                                                                                                                                                                                                                                                       return (await fetch(dataURL)).blob();
                                                                                                                                                                                                                                                                       }