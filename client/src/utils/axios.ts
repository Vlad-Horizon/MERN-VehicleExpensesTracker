import axios from 'axios';
// config
import { API } from '../constants/constants';
import { triggerLoader } from '../redux/slices/utils';
import { logout } from '../redux/slices/userSlice';

axios.defaults.headers.common['X-Access-Token'] = String(localStorage.getItem('authToken'));

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API,
});

export const uninterceptedAxiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.response.use(
  (response) => {
    triggerLoader(false);
    return response;
  },
  async (error) => {
    triggerLoader(false);
    if (error.response && error.response.status === 401) {
      try {
        // await this.loginInWithToken();
        await logout();
      } catch (e) {
        // setSession(null);

          await logout();
      }
    }

    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

axiosInstance.interceptors.request.use(
  (response) => {
    triggerLoader(true);
    return response;
  },
  (error) => {
    triggerLoader(false);
    return Promise.reject(error);
  }
);

export default axiosInstance;
