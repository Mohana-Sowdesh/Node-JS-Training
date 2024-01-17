const axios = require('axios');
const REGISTRATION_URL = 'http://localhost:4000/users/register';
const fileAccess = require('../helpers/fileAccess');
const sinon = require('sinon');
const CONSTANTS = require('../helpers/constants');
const TEST_USER_FILE_PATH = '/Users/mohanasowdesh/Desktop/Node JS Training/Exercise 7/data/users-test.json';
const FILE_WRITE_CONTENT = '';
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
  ];
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
                          status: "ERROR",
                          code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                          errMsg: ["The key username is missing"]
                        },
  MISSING_PASSWORD_KEY: {
                          status: "ERROR",
                          code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                          errMsg: ["The key password is missing"]
                        },                      
  INVALID_USERNAME: {
                        status: "ERROR",
                        code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                        errMsg: CONSTANTS.REGISTER.USERNAME_INVALID
                    },
  INVALID_PASSWORD: {
                        status: "ERROR",
                        code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                        errMsg: CONSTANTS.REGISTER.PASSWORD_INVALID
                    },
  USER_ALREADY_EXISTS: {
                        status: "ERROR",
                        code: CONSTANTS.STATUS_CODES.BAD_REQUEST,
                        errMsg: CONSTANTS.REGISTER.USER_ALREADY_EXISTS
                      },
  USER_REGISTRATION_SUCCESS: {
                                status: "SUCCESS",
                                code: 200,
                                data: CONSTANTS.REGISTER.REGISTRATION_SUCCESS
                            }                                    
};

describe("User registration testing", () => {
    let fileAccessReadStub, fileAccessWriteStub;
  
    beforeEach(() => {
      // Create a Sinon stub for fileAccess.readFromFile
      fileAccessReadStub = sinon.stub(fileAccess, 'readFromFile');
      fileAccessWriteStub = sinon.stub(fileAccess, 'writeToFile');
    });
  afterEach(() => {
    sinon.restore();
  });

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
    fileAccessReadStub.readFromFile.returns(mockUsersFileData);

    // Act
    await axios({
      method: "post",
      url: REGISTRATION_URL,
      headers: {},
      data: testData.existingUser
    }).catch((err) => { 
      // Assert
      expect(err.response.data).toEqual(TEST_RESPONSES.USER_ALREADY_EXISTS);
    });
  });

  test('Should return a success message on entering valid user details', async() => {
    // Arrange
    fileAccessReadStub.readFromFile.returns(mockUsersFileData);

    // Act
    await axios({
      method: "post",
      url: REGISTRATION_URL,
      headers: {},
      data: testData.validUserCreds
    }).then((res) => { 
      // Assert
      expect(res.data).toEqual(TEST_RESPONSES.USER_REGISTRATION_SUCCESS);
    });
  });
});