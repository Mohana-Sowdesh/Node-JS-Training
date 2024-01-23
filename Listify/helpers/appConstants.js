const ERROR = "Error";
const FILE_READ_WRITE_ERROR_CODE = -2;
const SUCCESS_CODE = 1;
const USER_KEYS = ["username", "password"];
const FILTER_OPTIONS = ["title", "priority", "dueDate"];
const FILTER_TASK_KEYS = ["criteria", "value"];
const PAGINATION_KEYS = ["offset", "limit"];
const TOKEN_EXPIRATION = "30m";
const TASKS_FILE_PATH = "/../data/tasks.json";
const USERS_FILE_PATH = "/../data/users.json";

module.exports = { ERROR, FILE_READ_WRITE_ERROR_CODE, SUCCESS_CODE, FILTER_OPTIONS,
    FILTER_TASK_KEYS, PAGINATION_KEYS, USER_KEYS, TOKEN_EXPIRATION, TASKS_FILE_PATH, USERS_FILE_PATH };