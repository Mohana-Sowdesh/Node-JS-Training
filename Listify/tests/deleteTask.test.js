const axios = require('axios');
const DELETE_TASK_URL = 'http://localhost:4000/tasks/';
const CONSTANTS = require('../helpers/constants');
const fileAccess = require('../helpers/fileAccess');
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvd2Rlc2giLCJpYXQiOjE3MDU0NzIwOTB9.otA9sChr93Gw7OYfw-CjHGUk026YqzRWP755mPXCNPo';
const testTaskId = ['5', 'test', '578', '65'];
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
                      errMsg: CONSTANTS.DELETE_TASK.TASK_NOT_FOUND
                    },
    TASK_DELETED_SUCCESS: {
                            status: "SUCCESS",
                            code: 200,
                            data: CONSTANTS.DELETE_TASK.DELETION_SUCCESS
                          }                                       
};

describe("Delete task testing", () => {
    test('Should return an error message if user is unauthorized', async() => {
        // await axios({
        //   method: "delete",
        //   url: DELETE_TASK_URL+testTaskId[0],
        //   headers: {},
        // }).catch((err) => {
        //   expect(err.response.data).toEqual(TEST_RESPONSES.UNAUTHORIZED_USER);
        // });
      });

      // test('Should return an error message if taskId to be deleted is not a number', async() => {
      //   await axios({
      //     method: "delete",
      //     url: DELETE_TASK_URL+testTaskId[1],
      //     headers: {authorization: `Bearer ${TOKEN}`},
      //   }).catch((err) => {
      //     expect(err.response.data).toEqual(TEST_RESPONSES.TASK_ID_VALIDATION_ERROR);
      //   })
      // });

      // test('Should return an error message if taskId to be deleted is not found', async() => {
      //   await axios({
      //     method: "delete",
      //     url: DELETE_TASK_URL+testTaskId[2],
      //     headers: {authorization: `Bearer ${TOKEN}`},
      //   }).catch((err) => {
      //     expect(err.response.data).toEqual(TEST_RESPONSES.TASK_NOT_FOUND);
      //   })
      // });

      // test('Should return a success message if task is deleted', async() => {
      //   await axios({
      //     method: "delete",
      //     url: DELETE_TASK_URL+testTaskId[3],
      //     headers: {authorization: `Bearer ${TOKEN}`},
      //   }).then((res) => {
      //     expect(res.data.code).toEqual(TEST_RESPONSES.TASK_DELETED_SUCCESS.code);
      //   })
      // });
});