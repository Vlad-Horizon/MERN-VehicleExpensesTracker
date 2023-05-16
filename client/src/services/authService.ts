import axios, { uninterceptedAxiosInstance } from '../utils/axios';
// @ts-ignore
import { API } from '../constants/constants';
// import {setAccessToken, setPhoneNumber, setRefreshToken, triggerLoader} from '../redux/action';
import { dispatch, store } from '../redux/store';
import { triggerLoader } from '../redux/slices/utils';

class AuthService {

  setAxiosInterceptors = ({ onLogout }: { onLogout: Function }) => {
    axios.interceptors.response.use(
      (response) => {
        triggerLoader(false);
        return response;
      },
      async (error) => {
        triggerLoader(false);
        if (error.response && error.response.status === 401) {
          try {
            // await this.loginInWithToken();
            onLogout();
          } catch (e) {
            this.setSession(null);

            if (onLogout) {
              onLogout();
            }
          }
        }

        return Promise.reject(error.response);
      }
    );
    axios.interceptors.request.use(
      (response) => {
        store.dispatch(triggerLoader(true) as any);
        return response;
      },
      (error) => {
        store.dispatch(triggerLoader(false) as any);
        return Promise.reject(error);
      }
    );
  };

  login = (userName: string, password: string) => new Promise<any>((resolve, reject) => {
    axios.post(`${API}/Login`, { userName, password })
      .then((response: any) => {
        if (response.data) {
          this.setSession(response.data.AuthToken, userName);
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  token = (refreshToken: string | null) => new Promise<any>((resolve, reject) => {
    axios.post(`${API}/refresh`, { refreshToken })
      .then((response: any) => {
        if (response.data) {
          // this.setSession(response.data.AuthToken, userName);
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  logout = () => new Promise<Boolean>((resolve, reject) => {
    axios.post(`${API}/Account/Logout`)
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
    this.setSession(null);
  });

  setSession = (authToken: string | null, userName?: string) => {
    if (authToken && userName) {
      localStorage.setItem('authToken', authToken);
      axios.defaults.headers.common['X-Access-Token'] = `${ authToken }`;
      uninterceptedAxiosInstance.defaults.headers.common['X-Access-Token'] = `${ authToken }`;
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      delete axios.defaults.headers.common['X-Access-Token'];
      delete uninterceptedAxiosInstance.defaults.headers.common['X-Access-Token'];
    }
  };

  getCurrentUser = () => new Promise<any>((resolve, reject) => {
    axios.get(`${ API }/myAccount`)
      .then((response: any) => {
        if (response.data) {
          const {data} = response;
          resolve(data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

  // register = (data: object) => new Promise<any>((resolve, reject) => {
  //   axios.post(`${API}/Account/Registration`, data)
  //     .then((response: any) => {
  //       if (response.data) {
  //         // this.setSession(response.data.access_token, response.data.token_type, rememberMe, emailAddress, response.data.refresh_token);
  //         resolve(response.data);
  //       } else {
  //         reject(response.data.error);
  //       }
  //     })
  //     .catch((error: any) => {
  //       reject(error);
  //     });
  // });

  // sendVerifyPhone = (data: object) => new Promise<Boolean>((resolve, reject) => {
  //   axios.post(`${API}/Account/SendVerifyPhone`, data)
  //     .then((response: any) => {
  //       if (response.data) {
  //         // this.setSession(response.data.access_token, response.data.token_type, rememberMe, emailAddress, response.data.refresh_token);
  //         resolve(Boolean(response.data.is_verified));
  //       } else {
  //         reject(response.data.error);
  //       }
  //     })
  //     .catch((error: any) => {
  //       reject(error);
  //     });
  // });

  // verify = (code: string, userId: number) => new Promise<boolean>((resolve, reject) => {
  //   axios.post(`${API}/Account/VerifyPhone`, {
  //     code,
  //     userId,
  //   })
  //     .then((response: any) => {
  //       if (response.status === 200) {
  //         resolve(true);
  //       } else {
  //         reject(response.data.error);
  //       }
  //     })
  //     .catch((error: any) => {
  //       reject(error);
  //     });
  // });

}

const authService = new AuthService();

export default authService;
