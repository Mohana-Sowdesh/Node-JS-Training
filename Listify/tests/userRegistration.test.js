const axios = require('axios');
const REGISTRATION_URL = 'http://localhost:4000/users/register';
const fileAccess = require('../helpers/fileAccess');
const sinon = require('sinon');
const CONSTANTS = require('../helpers/constants');
const registerService = require('../services/user.service');
const APP_CONSTANTS = require('../helpers/appConstants');
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
const testData = {
    usernameKeyMissing: {
                          "password": "test1234"
                        },
    passwordKeyMissing: {
                          "username": "Test7"
                        },                   
    invalidUsername: {
                        "username": "Test 56",
                        "password": "test1234"
                     },
    invalidPassword: {  
                        "username": "Test6",
                        "password": "test"
                     },
    existingUser: {
                    "username": "Test3",
                    "password": "test12345"
                  },
    validUserCreds: {
                      "username": "Test4",
                      "password": "test1234"
                    }                               
};
const TEST_RESPONSES = {
  MISSING_USERNAME_KEY: {
                          code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                          errMsg: ["The key username is missing"]
                        },
  MISSING_PASSWORD_KEY: {
                          code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                          errMsg: ["The key password is missing"]
                        },                      
  INVALID_USERNAME: {
                        code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                        errMsg: CONSTANTS.REGISTER.USERNAME_INVALID
                    },
  INVALID_PASSWORD: {
                        code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                        errMsg: CONSTANTS.REGISTER.PASSWORD_INVALID
                    },
  USER_ALREADY_EXISTS: {
                        code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                        errMsg: CONSTANTS.REGISTER.USER_ALREADY_EXISTS
                      },
  USER_REGISTRATION_SUCCESS: {
                                code: 200,
                                data: CONSTANTS.REGISTER.REGISTRATION_SUCCESS
                            }                                    
};

describe("User registration testing", () => {
  test('Should return an error message on missing username key in request', async() => {
    await axios({
      method: "post",
      url: REGISTRATION_URL,
      headers: {},
      data: testData.usernameKeyMissing
    }).catch((err) => { 
      expect(err.response.data).toEqual(TEST_RESPONSES.MISSING_USERNAME_KEY);
    })
  });

  test('Should return an error message on missing password key in request', async() => {
    await axios({
      method: "post",
      url: REGISTRATION_URL,
      headers: {},
      data: testData.passwordKeyMissing
    }).catch((err) => { 
      expect(err.response.data).toEqual(TEST_RESPONSES.MISSING_PASSWORD_KEY);
    })
  });

  test('Should return an error message on entering an invalid username', async() => {
    await axios({
      method: "post",
      url: REGISTRATION_URL,
      headers: {},
      data: testData.invalidUsername
    }).catch((err) => { 
      expect(err.response.data).toEqual(TEST_RESPONSES.INVALID_USERNAME);
    })
  });

  test('Should return an error message on entering an invalid password', async() => {
    await axios({
      method: "post",
      url: REGISTRATION_URL,
      headers: {},
      data: testData.invalidPassword
    }).catch((err) => { 
      expect(err.response.data).toEqual(TEST_RESPONSES.INVALID_PASSWORD);
    })
  });

  test('Should return an error message on entering an existing username', async() => {
    await axios({
      method: "post",
      url: REGISTRATION_URL,
      headers: {},
      data: testData.existingUser
    }).catch((err) => { 
      expect(err.response.data).toEqual(TEST_RESPONSES.USER_ALREADY_EXISTS);
    });
  });

  test('Should return a success message on entering valid user details', async() => {
    // Arrange
    let fileAccessStub = sinon.stub(fileAccess);
    fileAccessStub.readFromFile.returns(JSON.stringify(mockUsersFileData));
    fileAccessStub.writeToFile.returns();

    // Act
    let res = registerService.register('Test6', 'Test1234');

    // Assert
    expect(res).toEqual(APP_CONSTANTS.SUCCESS_CODE);

    sinon.restore();
  });
});