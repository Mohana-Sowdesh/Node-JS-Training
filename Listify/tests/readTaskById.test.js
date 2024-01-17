const axios = require('axios');
const READ_TASK_BY_ID_URL = 'http://localhost:4000/tasks/';
const CONSTANTS = require('../helpers/constants');
const fileAccess = require('../helpers/fileAccess');
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvd2Rlc2giLCJpYXQiOjE3MDU0NzIwOTB9.otA9sChr93Gw7OYfw-CjHGUk026YqzRWP755mPXCNPo';
const testTaskId = ['5', 'test', '578', '70', '1'];
const TEST_RESPONSES = {
    UNAUTHORIZED_USER: {
                            status: "ERROR",
                            code: CONSTANTS.STATUS_CODES.UNAUTHORIZED,
                            errMsg: CONSTANTS.USER_UNAUTHORIZED
                        },
    TASK_ID_VALIDATION_ERROR: {
                                status: "ERROR",
                                code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                                errMsg: CONSTANTS.READ_TASK_BY_ID.TASK_ID_INVALID
                              },
    TASK_NOT_FOUND: {
                      status: "ERROR",
                      code: 404,
                      errMsg: CONSTANTS.READ_TASK_BY_ID.TASK_NOT_FOUND
                    }                                      
};

describe("Read task by ID testing", () => {
    test('Should return an error message if user is unauthorized', async() => {
        // await axios({
        //   method: "get",
        //   url: READ_TASK_BY_ID_URL+testTaskId[0],
        //   headers: {},
        // }).catch((err) => {
        //   expect(err.response.data).toEqual(TEST_RESPONSES.UNAUTHORIZED_USER);
        // });
      });

    //   test('Should return an error message if taskId to be read is not a number', async() => {
    //     await axios({
    //       method: "get",
    //       url: READ_TASK_BY_ID_URL+testTaskId[1],
    //       headers: {authorization: `Bearer ${TOKEN}`},
    //     }).catch((err) => {
    //       expect(err.response.data).toEqual(TEST_RESPONSES.TASK_ID_VALIDATION_ERROR);
    //     })
    //   });

    //   test('Should return an error message if taskId to be read is not found', async() => {
    //     await axios({
    //       method: "get",
    //       url: READ_TASK_BY_ID_URL+testTaskId[2],
    //       headers: {authorization: `Bearer ${TOKEN}`},
    //     }).catch((err) => {
    //       expect(err.response.data).toEqual(TEST_RESPONSES.TASK_NOT_FOUND);
    //     })
    //   });

    //   test('Should return a success code if task is read successfully', async() => {
    //     await axios({
    //       method: "get",
    //       url: READ_TASK_BY_ID_URL+testTaskId[3],
    //       headers: {authorization: `Bearer ${TOKEN}`},
    //     }).then((res) => {
    //       expect(res.data.code).toEqual(CONSTANTS.STATUS_CODES.SUCCESS);
    //     })
    //   });
});