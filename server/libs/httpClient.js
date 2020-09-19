const axios = require('axios');

module.exports = (options) => {
    return new Promise(async (res, rej) => {
        try {
            const res = await axios(options);
            return res(res.data);
        } catch (error) {
            return rej(error);
        }
    })
}