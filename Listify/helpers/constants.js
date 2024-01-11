const STATUS_CODES = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
}

const REGISTER = {
    USERNAME_INVALID: "Username is invalid",
    PASSWORD_INVALID: "Password is not valid",
    USER_ALREADY_EXISTS: "User already exists",
    REGISTRATION_SUCCESS: "User registered successfully",
    REGISTRATION_FAILURE: "Sorry! User cannot be registered"
}

const INTERNAL_SERVER_ERROR_MSG = "Internal server error";

const LOGIN = {
    LOGIN_ERROR: "Invalid username or password"
}

const USER_UNAUTHORIZED = "User is unauthorized. Please login";

const CREATE_TASK = {
    TASK_CREATED: "Task created successfully",
    KEY_MISSING: "The key ${keyName} is missing",
    NOT_IN_FORMAT_MSG: "The key ${keyName} is not in the correct format",
    CANNOT_CREATE_TASK: "Cannot create task"
}

const READ_TASK_BY_ID = {
    TASK_ID_INVALID: "Task ID should be number",
    TASK_NOT_FOUND: "Task not found"
}

const DELETE_TASK = {
    DELETION_SUCCESS: "Task deleted successfully",
    TASK_NOT_FOUND: "Task to be deleted cannot be found"
}
module.exports = { STATUS_CODES, REGISTER, INTERNAL_SERVER_ERROR_MSG, LOGIN, 
    USER_UNAUTHORIZED, CREATE_TASK, READ_TASK_BY_ID, DELETE_TASK };