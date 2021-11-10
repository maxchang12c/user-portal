import { userApi } from '@/api';

export default {
  get(url, data = {}) {
    return userApi({
      url: url,
      method: 'get',
      params: data,
    });
  },
  post(url, data) {
    return userApi({
      url: url,
      method: 'post',
      data,
    });
  },
  put(url, data) {
    return userApi({
      url: url,
      method: 'put',
      data,
    });
  },
};