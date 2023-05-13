import * as fs from "node:fs/promises";
import {checkDirectoryExistsAndCreate, checkDirectoryFiles, checkDirectory} from './checkDirectoryExists.js';
import {pathToServer, folderToSaveImg, regex} from '../config/config.js';

// ----------------------------------------------------------------------

export const saveImage = async (images, userId, carId) => {
  if (images.length > 0) {
    const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

    await checkDirectoryExistsAndCreate(path);

    images.forEach((image, i) => {
      const extension = image.split(';')[0].split('/')[1];
      
      const base64Data = image.split(',')[1];
      const decodedImage = Buffer.from(base64Data, 'base64');

      fs.writeFile(`${path}/image_${i}.${extension}`, decodedImage, (err) => {
        if (err) throw err;
        console.log('The image has been saved!');
      });
    });
  }
}

// ----------------------------------------------------------------------

export const codeImages = async (userId, carId) => {
  const filesToUser = [];
  const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

  if (!await checkDirectoryFiles(path)) return filesToUser;
  
  const files = await fs.readdir(path);

  for (const file of files) {
    const filePath = `${path}/${file}`;
    const fileType = file.match(regex.getFileType)[0];
    const fileData = await fs.readFile(filePath, function(err) {
      if (err) throw err;
    });
      
    const base64Data = `data:image/${fileType};base64,${fileData.toString('base64')}`;

    filesToUser.push(base64Data);
  }

  return filesToUser;
}

// ----------------------------------------------------------------------

export const codeFirstImage = async (userId, carId) => {
  const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

  if (!await checkDirectoryFiles(path)) return '';
  
  const files = await fs.readdir(path);
  const file = files[0];

  const filePath = `${path}/${file}`;
  const fileType = file.match(regex.getFileType)[0];
  const fileData = await fs.readFile(filePath, function(err) {
    if (err) throw err;
  });

  const fileToUser = `data:image/${fileType};base64,${fileData.toString('base64')}`;

  return fileToUser;
}