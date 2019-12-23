import axios from 'axios'
import {Message} from 'element-ui'
import querystring from 'querystring'

/* 为了规范等，这里末尾不加 / */
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.1.107:80';

axios.interceptors.response.use((message) => {
    return message;
}, (error) => {
    window.console.log('onRejected');
    window.console.log(error);
    window.console.log(JSON.stringify(error));
    window.console.log(error.response);
    if(!error.response) {
        Message.error('服务器无响应');
    }
    Message.error(error.response.data);
    return Promise.reject(error);
});

export default {
    post: (path, params) => {
        let data = querystring.stringify(params);
        return axios.post(path, data);
    },

    get: (path, params) => {
        return axios.get(path, {
            params: params
        });
    }
}