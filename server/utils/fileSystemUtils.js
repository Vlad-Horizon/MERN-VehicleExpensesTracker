import * as fs from 'node:fs/promises';
import { pathToServer, folderToSaveImg } from '../config/config.js';

// ----------------------------------------------------------------------

export const useFileSystemErrorsMessages = {
  errorCreateDir: `useFileSystem.createDir, dir create error`,
  errorDeleteDir: `useFileSystem.deleteDir, error delete dir`,
  errorDeleteFilesInDir: `useFileSystem.deleteFilesInDir, error delete files in dir`,
};

const errorMessages = useFileSystemErrorsMessages;

// ----------------------------------------------------------------------

export const createDir = async (path) => {
  try {
    await fs.mkdir(path, { recursive: true });
  } catch (error) {
    console.error(`### Error create directory '${path}':`, error);
    throw new Error(errorMessages.errorCreateDir);
  }
};

export const checkDir = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

export const checkDirFiles = async (path) => {
  try {
    await fs.access(path);
    const files = await fs.readdir(path);
    return files.length > 0;
  } catch (error) {
    return false;
  }
};

export const forcedCreateFolder = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    await createDir(path);
  }
};

export const deleteDir = async (userId, carId) => {
  try {
    const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

    if (await checkDir(path)) {
      const files = await fs.readdir(path);

      for (const file of files) {
        const filePath = `${path}/${file}`;
        if ((await fs.lstat(filePath)).isDirectory()) {
          await deleteDir(filePath);
        } else {
          await fs.unlink(filePath);
        }
      }
      await fs.rmdir(path);
    }
  } catch (error) {
    console.error(`### Error delete directory '${path}':`, error);
    throw new Error(errorMessages.errorDeleteDir);
  }
};

export const deleteFilesInDir = async (userId, carId) => {
  try {
    const path = `${pathToServer}/${folderToSaveImg}/${userId}/${carId}`;

    if (!(await checkDir(path))) return;

    const files = await fs.readdir(path);
    for (const file of files) {
      await fs.unlink(`${path}/${file}`);
    }
    return true;
  } catch (error) {
    console.error(`### Error delete files in directory '${path}':`, error);
    throw new Error(errorMessages.errorDeleteFilesInDir);
  }
};
