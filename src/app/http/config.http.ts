import { message } from 'antd';
import axios from 'axios';
import i18n from 'i18next';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

export function configAxios() {
  const auth = useContext(AuthContext)
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url && config.url.indexOf('private') > -1)
      config.headers = { ...config.headers, Authorization: `Bearer ` + auth.jwt }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.request.status === 400) {
      message.warn(i18n.t('NET_BAD_REQUEST'))
    } else if (error.request.status === 500 || error.request.status === 503) {
      message.warn(i18n.t('NET_INTERNAL_ERROR'))
    } else if (error.request.status === 0) {
      message.warn(i18n.t('NET_ERROR'))
    } else if (error.request.status === 403) {
      message.warn(i18n.t('NET_NOT_ALLOW'))
    } else if (error.request.status === 404) {
      message.warn(i18n.t('URL_NOT_FOUND'))
    } else {
      message.warn(i18n.t('NET_UNKNOWN'))
    }
    // return Promise.resolve<any>({ data: [] })
    return Promise.reject(error);
  });
}