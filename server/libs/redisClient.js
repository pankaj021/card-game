const redis = require("redis");
const client = redis.createClient();

module.exports = {
    get: (key) => {
        return new Promise((resolve, reject) => {
            client.get(key, (err, res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        })
    },
    set: (key, value) => {
        return new Promise((resolve, reject) => {
            client.set(key, value, (err, res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        })
    },
    setex: (key, expiryInSec, value) => {
        return new Promise((resolve, reject) => {
            client.setex(key, expiryInSec, value, (err, res) => {
                if(err) return reject(err);
                return resolve(res);
            });
        })
    },
}