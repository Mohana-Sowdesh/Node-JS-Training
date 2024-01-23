const axios = require('axios');
const READ_TASK_BY_ID_URL = 'http://localhost:4000/tasks/';
const CONSTANTS = require('../helpers/constants');
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvd2Rlc2giLCJpYXQiOjE3MDU0NzIwOTB9.otA9sChr93Gw7OYfw-CjHGUk026YqzRWP755mPXCNPo';
const testTaskId = ['5', 'test', '9d4cf23b-19b3-469c-ab52-df666e452c3f', '70', '1'];
const sinon = require('sinon');
const readTaskByIdService = require('../services/task.service');
const successResult = { exists: 5, data: {
    "taskId": "5",
    "title": "Attend cousin's marriage",
    "description": "At Villupuram",
    "priority": "MEDIUM",
    "dueDate": "17/01/2024",
    "comments": [
        {
            "comment": "Task pending",
            "timestamp": "2024-01-11T15:43:21Z"
        }
    ]
}}
const TEST_RESPONSES = {
    UNAUTHORIZED_USER: {
                            code: CONSTANTS.STATUS_CODES.UNAUTHORIZED,
                            errMsg: CONSTANTS.USER_UNAUTHORIZED
                        },
    TASK_ID_VALIDATION_ERROR: {
                                code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                                errMsg: CONSTANTS.READ_TASK_BY_ID.TASK_ID_INVALID
                              },
    TASK_NOT_FOUND: {
                      code: 404,
                      errMsg: CONSTANTS.READ_TASK_BY_ID.TASK_NOT_FOUND
                    }                                      
};

describe("Read task by ID testing", () => {
    test('Should return an error message if user is unauthorized', async() => {
        await axios({
          method: "get",
          url: READ_TASK_BY_ID_URL+testTaskId[0],
          headers: {},
        }).catch((err) => {
          expect(err.response.data).toEqual(TEST_RESPONSES.UNAUTHORIZED_USER);
        });
      });

      test('Should return an error message if taskId to be read is not valid', async() => {
        await axios({
          method: "get",
          url: READ_TASK_BY_ID_URL+testTaskId[1],
          headers: {authorization: `Bearer ${TOKEN}`},
        }).catch((err) => {
          expect(err.response.data).toEqual(TEST_RESPONSES.TASK_ID_VALIDATION_ERROR);
        })
      });

      test('Should return an error message if taskId to be read is not found', async() => {
        await axios({
          method: "get",
          url: READ_TASK_BY_ID_URL+testTaskId[2],
          headers: {authorization: `Bearer ${TOKEN}`},
        }).catch((err) => {
          expect(err.response.data).toEqual(TEST_RESPONSES.TASK_NOT_FOUND);
        })
      });

      test('Should return taskData if taskId is found', async() => {
        // Arrange
        let readTaskByIdServiceStub = sinon.stub(readTaskByIdService);
        readTaskByIdServiceStub.readTaskByID.returns(successResult);

        // Act
        let res = readTaskByIdService.readTaskByID({}, 5);

        // Assert
        expect(res).toEqual(successResult);

        sinon.restore();
      });
});