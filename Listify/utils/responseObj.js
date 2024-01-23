
/**
 * Method to create a HTTP Success response object
 * @param {*} data 
 * @returns 
 */
const httpSuccessObj = (data) => {
    return {
        code: 200,
        data: data
    }
}

/**
 * Method to create a HTTP Error response object
 * @param {*} req 
 * @param {*} err 
 * @returns 
 */
const httpErrorObj = (err, code) => {
    return {
        code: code,
        errMsg: err
    }
}

/**
 * Method to create a HTTP Success msg response object
 * @param {*} req 
 * @param {*} err 
 * @returns 
 */
const httSuccessMsgObj = (msg) => {
    return {
        code: 200,
        msg: msg
    }
}

module.exports = { httpSuccessObj, httpErrorObj, httSuccessMsgObj }