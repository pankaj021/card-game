const mongoose = require('mongoose');
const logger = require('./logger');
const {DB_USER, DB_PASSWORD} = process.env;
const url = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@ds125273.mlab.com:25273/fake-card`
module.exports = {
    init: async () => {
        mongoose.connection.on("connected", function() {
            logger.info("Connected to mongo server.");
        });
        mongoose.connection.on("error", function(error) {
            logger.error("Could not connect to mongo server!", error);
        });
        mongoose.connection.on('disconnected', function(){
            logger.warn("Mongoose default connection is disconnected");
        });
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                logger.info("Node process is exiting. Closing mongodb connection too...");
                process.exit(0);
            });
        });
        try {
            await mongoose.connect( url, { 
                useNewUrlParser: true, 
                useCreateIndex: true, 
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        } catch (error) {
            logger.error("Could not connect to mongo server!", error);
        }
    }
}