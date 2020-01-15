import axios from 'axios'
import {Message} from 'element-ui'
import querystring from 'querystring'

const instance = axios.create({
    baseURL: 'http://192.168.1.107:80',
    withCredentials: true
});


instance.interceptors.response.use((message) => {
    return message;
}, (error) => {
    window.console.log('onRejected');
    window.console.log(error);
    window.console.log(JSON.stringify(error));
    window.console.log('error.response', error.response);
    if (!error.response) {
        Message.error('服务器无响应');
    }
    Message.error(error.response.data);
    return Promise.reject(error);
});

export default {
    post: (path, params) => {
        let data = querystring.stringify(params);
        return instance.post(path, data);
    },

    get: (path, params) => {
        return instance.get(path, {
            params: params
        });
    },

    delete: (path, params) => {
        return instance.delete(path, {
            params: params
        });
    }
}