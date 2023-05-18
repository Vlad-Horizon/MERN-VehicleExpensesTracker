import { AxiosResponse } from 'axios';
import  axios, {uninterceptedAxiosInstance } from '../utils/axios';
import { API } from '../config/config';

interface deleteCost {
  carId: string,
  costId: string,
}

class CostApi {
  addCost = (data: any) => new Promise<any>((resolve, reject) => {
    axios.post(`${ API }/addCost`, data)
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

  editCost = (data: any) => new Promise<any>((resolve, reject) => {
    axios.put(`${ API }/editCarCost`, data)
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

  deleteCost = (data: any) => new Promise<any>((resolve, reject) => {   
    axios.delete(`${ API }/deleteCarCost`, {data})
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
const costApi = new CostApi();

export default costApi;
