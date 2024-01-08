/**
 * Function to send response to the client
 * @param {*} response 
 */
const sendResponse = (res, response) => {
    res.status(response.code).send(response);
}

module.exports = { sendResponse } 