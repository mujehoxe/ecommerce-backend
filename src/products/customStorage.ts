import { createHash } from 'crypto';
import { diskStorage } from 'multer';

export const customStorage = diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = './uploads'; // Adjust this as needed
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;
    const fileExtension = originalFilename.slice(
      ((originalFilename.lastIndexOf('.') - 1) >>> 0) + 2,
    );

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7); // Random string
    const uniqueFilename = `${timestamp}-${randomString}-${originalFilename}`;

    const hash = createHash('md5');
    hash.update(uniqueFilename);

    const md5Hash = hash.digest('hex');

    const uniqueFileName = `${md5Hash}.${fileExtension}`;

    cb(null, uniqueFileName);
  },
});
