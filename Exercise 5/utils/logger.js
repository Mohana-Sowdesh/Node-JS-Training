const { createLogger, format, transports } = require('winston');
require("dotenv").config();

module.exports = createLogger({
    level: process.env.LOGGER_LEVEL_ERROR,
    transports:
        new transports.File({
        filename: "./logs/error.log",
        format:format.combine(
            format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
    });
