import { AxiosResponse } from 'axios';
import  axios, {uninterceptedAxiosInstance } from '../utils/axios';
import { API } from '../constants/constants';

class ApiService {
  getUserList = () => new Promise<any>((resolve, reject) => {
    axios.get(`${ API }/User/List`)
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

  createPercentagePrice = (data: any) => new Promise<any>((resolve, reject) => {
    axios.post(`${API}/PercentagePrice`, data)
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

  editPercentagePrice = (data: any) => new Promise<any>((resolve, reject) => {
    axios.put(`${API}/PercentagePrice/${data.id}`, data)
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

  deletePercentagePrice = (ids: number[]) => new Promise<any>((resolve, reject) => {
    axios.delete(`${API}/PercentagePrice/list`, {data: ids})
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

const apiService = new ApiService();

export default apiService
