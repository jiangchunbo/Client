import Axios from 'axios'
// import qs from 'qs'
import querystring from 'querystring'

/* 为了规范等，这里末尾不加 / */
let base = 'http://127.0.0.1';
// let base = '';
Axios.defaults.withCredentials = true
export default {
    // post: (path, params) => {
    //     /* 将参数进行转换 */
    //     let data = querystring.stringify(params);
    //
    //     return Axios.post(`${base}${path}`, data);
    // },
    post: (path, params) => {
        window.console.log(path);
        let data = querystring.stringify(params);
        return Axios.post(`${base}${path}`,  data);
    },

    get: (path, params) => {
        return Axios.get(`${base}${path}`, {
            params: params
        });
    }
}