import axios from 'axios';
import {API_KEY} from "./settings";

const request = async (method, url, params = {}) => {
  params['api_key'] = API_KEY;
  params['language'] = 'ru-RU';
  try {
    const {data} = await axios({
      url,
      baseURL: 'https://api.themoviedb.org/3',
      method,
      [method === 'get' ? 'params' : 'data']: params,
    });
    return data;
  } catch (e) {
    alert(e.message);
    console.log(e);
    throw e;
  }
};

export default {
  get: async (url, params) => {
    return await request('get', url, params);
  },
  post: async (url, data) => {
    return await request('post', url, data);
  },
};
