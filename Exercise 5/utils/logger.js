const { createLogger, format, transports } = require('winston');
require("dotenv").config();

const errLogger = createLogger({
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

const infoLogger = createLogger({
    level: process.env.LOGGER_LEVEL_INFO,
    transports:
        new transports.File({
        filename: "./logs/info.log",
        format:format.combine(
            format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
    });

module.exports = {errLogger, infoLogger};