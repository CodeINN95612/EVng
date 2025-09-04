import { ImageDto } from '@/features/events/events.types';
import fs from 'node:fs';

export const saveImage = async (image: ImageDto) => {
  if (image.storage === 'local') {
    // Save the image to local storage
    const filePath = await saveLocal(image.file);
    return filePath;
  }
  throw new Error('Unsupported storage type');
};

const saveLocal = async (file: File): Promise<string> => {
  const dir = 'C:/evng/images';
  const path = `${dir}/${file.name}`;

  // Ensure the directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write the file to the specified path
  fs.writeFileSync(path, buffer);

  return path;
};
