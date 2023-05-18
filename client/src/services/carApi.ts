import { AxiosResponse } from 'axios';
import  axios, {uninterceptedAxiosInstance } from '../utils/axios';
import { API } from '../config/config';

class CarApi {
  getAllCars = () => new Promise<any>((resolve, reject) => {
    axios.get(`${ API }/GetAllCar`)
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
  })

  getCarById = (carId: string) => new Promise<any>((resolve, reject) => {
    axios.get(`${ API }/GetCarById/${carId}`)
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
  })

  createCar = (data: any) => new Promise<any>((resolve, reject) => {
    axios.post(`${ API }/createCar`, data)
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
  })

  editCar = (data: any) => new Promise<any>((resolve, reject) => {
    axios.put(`${ API }/editCar`, data)
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
  })

  deleteCar = (carId: string) => new Promise<any>((resolve, reject) => {
    axios.delete(`${ API }/DeleteCar/${carId}`)
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
  })
}
const carApi = new CarApi();

export default carApi;
