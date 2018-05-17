import axios from 'axios';
export const get = async url => await axios.get(url, {
  params: {
    t: new Date().getTime(),
  },
});

export const download = async (url, params) => await axios({
  url: url,
  method: 'GET',
  responseType: 'blob',
  params: params,
});

export const post = async (url, params) => await axios.request({
  url: url,
  method: 'POST',
  data: params,
});
