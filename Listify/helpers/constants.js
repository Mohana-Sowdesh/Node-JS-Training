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
    TASK_ALREADY_EXISTS: "Cannot create task as this taskId already exists"
}

const VALIDATION_MSG = {
    KEY_MISSING: "The key ${keyName} is missing",
    NOT_IN_FORMAT_MSG: "The key ${keyName} is not in the correct format",
}

const READ_ALL_TASKS = {
    NO_TASKS: "No tasks to display. Create one to view tasks."
}

const READ_TASK_BY_ID = {
    TASK_ID_INVALID: "Task ID should be number",
    TASK_NOT_FOUND: "Task not found"
}

const DELETE_TASK = {
    DELETION_SUCCESS: "Task deleted successfully",
    TASK_NOT_FOUND: "Task to be deleted cannot be found"
}

const UPDATE_TASK = {
    TASK_NOT_FOUND: "The task to be updated cannot be found",
    UPDATION_SUCCESS: "Task updated successfully",
    TASK_ID_NOT_MATCH: "Task id in path param and request body does not match"
}

const FILTER_TASK = {
    VALIDATION_MSG: "Tasks can be filtered only on the basis of title/priority/dueDate",
    NO_DATA_FOUND: "No data found for this filter condition"
}

const PAGINATION = {
    VALIDATION_ERROR: "${keyName} value should be a number and should be greater than 0",
}

const SORT_TASK = {
    VALUE_VALIDATION_ERROR: "Sort value should be either 'asc' or 'desc'"
}

module.exports = { STATUS_CODES, REGISTER, INTERNAL_SERVER_ERROR_MSG, LOGIN, 
    USER_UNAUTHORIZED, CREATE_TASK, READ_TASK_BY_ID, DELETE_TASK, READ_ALL_TASKS, UPDATE_TASK, VALIDATION_MSG,
    FILTER_TASK, PAGINATION, SORT_TASK };