const axios = require('axios');

module.exports = async (options) => {
    return new Promise((res, rej) => {
        try {
            const res = await axios(options);
            return res(res.data);
        } catch (error) {
            return rej(error);
        }
    })
}