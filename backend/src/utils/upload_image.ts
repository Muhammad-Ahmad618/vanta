import cloudinary from "@/config/cloudinary.js";

export const uploadImage = async (
  fileBuffer: Buffer,
  folder: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      },
    );
    stream.end(fileBuffer);
  });
};
