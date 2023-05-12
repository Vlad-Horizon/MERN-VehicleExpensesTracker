import * as fs from "node:fs/promises";
import {checkDirectoryExistsAndCreate, checkDirectoryFiles, checkDirectory} from './checkDirectoryExists.js';
import {pathToServer, folderToSaveImg} from '../config/config.js';

// ----------------------------------------------------------------------

export const saveImage = async (images, userId, carId) => {
  if (images.length > 0) {
    const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

    await checkDirectoryExistsAndCreate(path);

    images.forEach(image => {
      const base64Data = image.split(';base64,').pop();
      const decodedImage = Buffer.from(base64Data, 'base64');

      fs.writeFile(`${path}/image.jpeg`, decodedImage, (err) => {
        if (err) throw err;
        console.log('The image has been saved!');
      });
    });
  }
}

// ----------------------------------------------------------------------

export const codeImage = async (userId, carId) => {
  const filesToUser = [];

  if (!checkDirectoryFiles(`./${folderToSaveImg}/${userId}/${carId}`)) return filesToUser;
  
  const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

  const files = await fs.readdir(path);

  for (const file of files) {
    const filePath = `${path}/${file}`;
    const fileData = await fs.readFile(filePath);
    const base64Data = fileData.toString('base64');
    filesToUser.push({
      fileName: file,
      fileBase64: base64Data,
    });
  }

  return filesToUser;
}