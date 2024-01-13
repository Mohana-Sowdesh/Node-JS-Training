const axios = require('axios');
const DELETE_TASK_URL = 'http://localhost:4000/tasks/';
const CONSTANTS = require('../helpers/constants');
const sinon = require('sinon');
const fileAccess = require('../helpers/fileAccess');
const testTaskId = ['5', 'test'];
const TEST_RESPONSES = {
    UNAUTHORIZED_USER: {
                            status: "ERROR",
                            code: CONSTANTS.STATUS_CODES.UNAUTHORIZED,
                            errMsg: CONSTANTS.USER_UNAUTHORIZED
                        },
    TASK_ID_VALIDATION_ERROR: {
                                status: "ERROR",
                                code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                                errMsg: "Task ID should be number"
                              }                    
};

describe("Delete task testing", () => {
    test('Should return an error message if user is unauthorized', async() => {
        await axios({
          method: "delete",
          url: DELETE_TASK_URL+testTaskId[0],
          headers: {},
        }).catch((err) => {
          expect(err.response.data).toEqual(TEST_RESPONSES.UNAUTHORIZED_USER);
        })
      });

      test('Should return an error message if taskId to be deleted is not a number', async() => {
        await axios({
          method: "delete",
          url: DELETE_TASK_URL+testTaskId[1],
          headers: {},
        }).catch((err) => {
          expect(err.response.data).toEqual(TEST_RESPONSES.UNAUTHORIZED_USER);
        })
      });
});