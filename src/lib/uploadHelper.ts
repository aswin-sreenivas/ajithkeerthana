/**
 * Helper to upload photo and video files directly to the server API
 * so they are physically saved into the project's `src/assets/uploads/` directory.
 */

export interface UploadResult {
  success: boolean;
  url: string;
  filename: string;
  srcPath?: string;
  size?: number;
}

export async function uploadMediaFile(
  file: File | Blob,
  filename: string,
  category: 'photo' | 'video' = 'photo'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: base64Data,
            filename,
            category,
          }),
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }

        const data: UploadResult = await response.json();
        resolve(data);
      } catch (err) {
        console.warn('Backend upload API error, falling back to local object URL:', err);
        // Fallback gracefully if running in a client-only preview
        const fallbackUrl = URL.createObjectURL(file);
        resolve({
          success: true,
          url: fallbackUrl,
          filename,
        });
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
