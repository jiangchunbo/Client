import axios from 'axios'
// import qs from 'qs'
import querystring from 'querystring'

/* 为了规范等，这里末尾不加 / */
let base = 'http://127.0.0.1';
// let base = '';
axios.defaults.withCredentials = true
export default {
    post: (path, params) => {
        window.console.log(path);
        let data = querystring.stringify(params);
        return axios.post(`${base}${path}`,  data);
    },

    get: (path, params) => {
        return axios.get(`${base}${path}`, {
            params: params
        });
    }
}