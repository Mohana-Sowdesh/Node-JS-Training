const STATUS_CODES = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
}

const REGISTER = {
    USERNAME_INVALID: "Username is invalid",
    PASSWORD_INVALID: "Password is not valid",
    USER_ALREADY_EXISTS: "User already exists",
    REGISTRATION_SUCCESS: "User registered successfully",
    REGISTRATION_FAILURE: "Sorry! User cannot be registered"
}

const USERS_FILE_PATH = './data/users';
const TASKS_FILE_PATH = './data/tasks';

const INTERNAL_SERVER_ERROR_MSG = "Internal server error";

const LOGIN = {
    LOGIN_ERROR: "Invalid username or password"
}

const fileReadError = "ERROR : Error occurred while reading file";
const fileWriteError = "ERROR : Error occurred while writing to file";
const registrationCredentialsError = "ERROR : Please enter valid username and password";
const registrationSuccess = "SUCCESS : User successfully registered";
const registrationFailure = "ERROR : Failed to register user";
const loginError = "ERROR : Invalid login credentials";
const loginSuccess = "SUCCESS : Login successful";
const addTaskSuccess = "SUCCESS: New task added";
const addTaskError = "ERROR : New task cannot be added";
const deleteTaskError = "ERROR : Task cannot be deleted";
const deleteTaskSuccess = "SUCCESS : Task successfully deleted";
const filterTaskError = "ERROR : Tasks cannot be filtered";
const readTaskByIDError = "ERROR : This task is not found for the specific user";
const readTasks = "ERROR : No tasks present for this user";
const sortTask = "ERROR : Tasks cannot sorted";
const updateTaskError = "ERROR : Task cannot be found";
const updateTaskSuccess = "SUCCESS : Task updated successfully";

module.exports = { STATUS_CODES, REGISTER, USERS_FILE_PATH, TASKS_FILE_PATH, INTERNAL_SERVER_ERROR_MSG, LOGIN, fileReadError, fileWriteError, registrationCredentialsError, registrationSuccess, registrationFailure, loginError, 
    loginSuccess, addTaskSuccess, addTaskError, deleteTaskError, deleteTaskSuccess, filterTaskError, 
    readTaskByIDError, readTasks, sortTask, updateTaskError, updateTaskSuccess};