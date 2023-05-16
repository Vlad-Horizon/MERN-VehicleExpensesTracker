import { AxiosResponse } from 'axios';
import  axios, {uninterceptedAxiosInstance } from '../utils/axios';
import { API } from '../constants/constants';

class DriveApi {
  // Drive
  getDrive = () => new Promise<any>((resolve, reject) => {
    axios.get(`${ API }/myDrive`)
      .then((response: any) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  // Folder
  getFodler = (id: string) => new Promise<any>((resolve, reject) => {
    axios.get(`${ API }/folder/view/${ id }`)
      .then((response: any) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  createFolder = (data: any) => new Promise<any>((resolve, reject) => {
    axios.post(`${ API }/folder/create`, data)
      .then((response: any) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  deleteFolder = (id: string) => new Promise<any>((resolve, reject) => {
    axios.delete(`${ API }/folder/delete/${ id }`)
      .then((response: any) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });  

  // File
  deleteFile = (id: string) => new Promise<any>((resolve, reject) => {
    axios.delete(`${ API }/delete/${ id }`)
      .then((response: any) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });  

  downloadFile = (id: string) => new Promise<any>((resolve, reject) => {
    axios.get(`${ API }/download/${ id }`)
      .then((response: any) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
const driveApi = new DriveApi();

export default driveApi
