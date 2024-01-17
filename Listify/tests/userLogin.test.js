const axios = require('axios');
const LOGIN_URL = 'http://localhost:4000/users/login';
const CONSTANTS = require('../helpers/constants');
const sinon = require('sinon');
const loginService = require('../services/userServices/login.service');
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvd2Rlc2giLCJpYXQiOjE3MDU0NzIwOTB9.otA9sChr93Gw7OYfw-CjHGUk026YqzRWP755mPXCNPo';
const testData = {
    usernameKeyMissing: {
                          "password": "test1234"
                        },
    passwordKeyMissing: {
                          "username": "Test7"
                        },                   
    wrongCreds: {   
                    "username": "Test2",
                    "password": "vcdsjv"
                },
    validUserCreds: {
                      "username": "Test3",
                      "password": "test12345"
                    }                               
};
const mockUsersFileData = [
  {
    "username": "Test1",
    "password": "test1234"
  },
  {
    "username": "Test2",
    "password": "test1234"
  },
  {
    "username": "Test3",
    "password": "test1234"
  }
]
const TEST_RESPONSES = {
    MISSING_USERNAME_KEY: {
                            status: "ERROR",
                            code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                            errMsg: ["The key username is missing"]
                          },
    MISSING_PASSWORD_KEY: {
                            status: "ERROR",
                            code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                            errMsg: ["The key password is missing"]
                          },                      
    INVALID_CREDS: {
                        status: "ERROR",
                        code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                        errMsg: CONSTANTS.LOGIN.LOGIN_ERROR
                   }                              
  };

describe("User login testing", () => {
    test('Should return an error message on missing username key in request', async() => {
        await axios({
          method: "post",
          url: LOGIN_URL,
          headers: {},
          data: testData.usernameKeyMissing
        }).catch((err) => {
          expect(err.response.data).toEqual(TEST_RESPONSES.MISSING_USERNAME_KEY);
        })
      });

      test('Should return an error message on missing password key in request', async() => {
        await axios({
          method: "post",
          url: LOGIN_URL,
          headers: {},
          data: testData.passwordKeyMissing
        }).catch((err) => { 
          expect(err.response.data).toEqual(TEST_RESPONSES.MISSING_PASSWORD_KEY);
        })
      });

      test('Should return an error message on entering an invalid user credentials', async() => {
        await axios({
          method: "post",
          url: LOGIN_URL,
          headers: {},
          data: testData.wrongCreds
        }).catch((err) => { 
            expect(err.response.data).toEqual(TEST_RESPONSES.INVALID_CREDS);
        });
      });

      test('Should return a success code on entering valid user details', async() => {
        // Arrange
        let loginServiceStub = sinon.stub(loginService);
        loginServiceStub.login.returns(TOKEN);

        // Act
        let res = await loginService.login(mockUsersFileData, 'Test1', 'test1234');

        // Assert
        expect(res).toEqual(TOKEN);

        sinon.restore();
      });
  });