/**
 * Method to create a HTTP Success response object
 * @param {*} data 
 * @returns 
 */
const httpSuccessObj = (data) => {
    return {
        status: "SUCCESS",
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
        status: "ERROR",
        code: code,
        data: err
    }
}

module.exports = { httpSuccessObj, httpErrorObj }