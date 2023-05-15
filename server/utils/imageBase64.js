import * as fs from 'node:fs/promises';
import { forcedCreateFolder, checkDirFiles } from './fileSystemUtils.js';
import { pathToServer, folderToSaveImg, regex } from '../config/config.js';

// ----------------------------------------------------------------------

export const imageBase64ErrorsMessages = {
  errorConvertToBase64: 'error convert image to base64',
  errorSaveImage: 'error save image',
};

const errorMessages = imageBase64ErrorsMessages;

// ----------------------------------------------------------------------

const toBase64 = async (file, path) => {
  const filePath = `${path}/${file}`;
  const fileType = file.match(regex.getFileType)[0];
  const fileData = await fs.readFile(filePath, function (err) {
    if (err) throw new Error(errorMessages.errorConvertToBase64);
  });

  return `data:image/${fileType};base64,${fileData.toString('base64')}`;
};

// ----------------------------------------------------------------------

export const saveImage = async (images, userId, carId) => {
  try {
    if (images.length > 0) {
      const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

      await forcedCreateFolder(path);

      images.forEach((image, i) => {
        const extension = image.split(';')[0].split('/')[1];
        const base64Data = image.split(',')[1];
        const decodedImage = Buffer.from(base64Data, 'base64');

        fs.writeFile(`${path}/image_${i}.${extension}`, decodedImage);
      });
    }
  } catch (error) {
    throw new Error(errorMessages.errorSaveImage);
  }
};

// ----------------------------------------------------------------------

export const toBase64Images = async (userId, carId) => {
  const filesToUser = [];
  const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

  if (!(await checkDirFiles(path))) return filesToUser;

  const files = await fs.readdir(path);

  for (const file of files) {
    const imageInBase64 = await toBase64(file, path);
    filesToUser.push(imageInBase64);
  }

  return filesToUser;
};

// ----------------------------------------------------------------------

export const toBase64FirstImage = async (userId, carId) => {
  const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

  if (!(await checkDirFiles(path))) return '';

  const files = await fs.readdir(path);
  const file = files[0];

  const imageInBase64 = await toBase64(file, path);

  return imageInBase64;
};
