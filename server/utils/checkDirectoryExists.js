import * as fs from 'node:fs/promises';
import * as fsSync from 'node:fs';
import {pathToServer, folderToSaveImg} from '../config/config.js';

export const checkDirectoryExistsAndCreate = async (path) => {
  try {
    await fs.access(path);
    console.log('dir is exists');
  } catch (error) {
    await createDirectory(path);
  }
}

const createDirectory = async (path) => {
  try {
    await fs.mkdir(path, {recursive: true});
    console.log('dir is created');
  } catch (error) {
    console.log('dir create error');
  }
}

export const checkDirectoryFiles = async (path) => {
  try {
    await fs.access(path);
    const files = await fs.readdir(path);
    return files.length > 0;
  } catch (error) {
    return false;
  }
}

export const checkDirectory = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

export const deleteDir = async (userId, carId) => {
  const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

  if (fsSync.existsSync(path)) {
    fsSync.readdirSync(path).forEach((file, index) => {
      const filePath = `${path}/${file}`;
      if (fsSync.lstatSync(filePath).isDirectory()) {
        deleteDir(filePath);
      } else {
        fsSync.unlinkSync(filePath);
      }
    });
    fsSync.rmdirSync(path);
    console.log(`Directory ${path} deleted successfully!`);
  } else {
    console.log(`Directory ${path} does not exist.`);
  }
}