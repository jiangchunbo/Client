export const validateHost = (rule, value, callback) => {
    if (!/^(((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9])\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9]))$/.test(value)) {
        return callback(new Error('请输入合法的 IP 地址'));
    }
    return callback();
};

export const validatePort = (rule, value, callback) => {
    if (value.trim() !== '' && isNaN(value) || value > 65535 || value < 0) {
        return callback(new Error('请输入合法的端口号'));
    }
    return callback();
};

export const validateConnectRetry = (rule, value, callback) => {
    if (value.trim() !== '' && isNaN(value) || value > 1316134911 || value < 0) {
        return callback(new Error('请输入 1 - 1316134911 之间的数字'));
    }
    return callback();
};