const CONSTANTS = require('../helpers/constants');
const APP_CONSTANTS = require('../helpers/appConstants');
const { validate } = require('uuid');

const userKeysValidator = (reqBody) => {
    let keyMissingMsg = CONSTANTS.VALIDATION_MSG.KEY_MISSING;
    let keyName = "${keyName}";
    let result = [];
    let userKeys = APP_CONSTANTS.USER_KEYS;

    for(let i=0; i < userKeys.length; i++) {
        if(!(reqBody.hasOwnProperty(userKeys[i])))
        {
            msg = keyMissingMsg.replace(keyName, userKeys[i]);
            result.push(msg);
        }
    }
    return result;
}

/**
 * Method to validate the username given by a new user while registration
 * @param {*} username 
 * @returns 
 */
const userNameValidator = (username) => {
    if((/^[a-zA-Z0-9_]{6,30}$/).test(username) == false)
        return false;
    return true;
}

/**
 * Method to validate the password given by a new user while registration
 * @param {*} password 
 * @returns 
 */
const passwordValidator = (password) => {
    if((/^[a-zA-Z0-9\W]{8,}$/).test(password) == false)
        return false;
    return true;
}

const taskValidationRegex = [
    {
        key: "title",
        regex: /^[a-zA-Z0-9 -']{1,40}$/
    },
    {
        key: "description",
        regex: /^[a-zA-Z0-9 -]{1,125}$/
    },
    {
        key: "priority",
        regex: /^(LOW|MEDIUM|HIGH)$/
    },
    {
        key: "dueDate",
        regex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/
    },
]

const taskCommentsValidationRegex = [
    {
        key: "comment",
        regex: /^[a-zA-Z0-9 ]{1,80}$/
    }
]

/**
 * Method to validate all the keys of task
 * @param {*} task 
 * @returns 
 */
const taskValidator = (task) => {
    let keyMissingMsg = CONSTANTS.VALIDATION_MSG.KEY_MISSING;
    let formatInvalidMsg = CONSTANTS.VALIDATION_MSG.NOT_IN_FORMAT_MSG;
    let keyName = "${keyName}";
    let result = [];

    for(let i=0; i < taskValidationRegex.length; i++) {
        if(!(task.hasOwnProperty(taskValidationRegex[i].key)))
        {
            msg = keyMissingMsg.replace(keyName, taskValidationRegex[i].key);
            result.push(msg);
        }
        else if(!(taskValidationRegex[i].regex).test(task[taskValidationRegex[i].key])) {
            msg = formatInvalidMsg.replace(keyName, taskValidationRegex[i].key);
            result.push(msg);
        }
    }

    // Validates the comments key
    if(!(task.hasOwnProperty("comments")))
    {
        msg = formatInvalidMsg.replace(keyName, "comments");
        result.push(msg);
    }
    else if(task["comments"].length > 0) {
        for(let i=0; i < task.comments.length; i++) {
            for(let j=0; j < taskCommentsValidationRegex.length; j++) {
                if(!(task.comments[i].hasOwnProperty(taskCommentsValidationRegex[j].key)))
                {
                    msg = keyMissingMsg.replace(keyName, taskCommentsValidationRegex[j].key);
                    result.push(msg);
                }
                else if(!((taskCommentsValidationRegex[j].regex).test(task.comments[i][taskCommentsValidationRegex[j].key]))) {
                    msg = formatInvalidMsg.replace(keyName, taskCommentsValidationRegex[j].key);
                    result.push(msg);
                }
            }
        }
    }
    return result;
}

/**
 * Method to validate taskId
 * @param {*} taskId 
 * @returns 
 */
const taskIdValidator = (taskId) => {
    return validate(taskId);
}

/**
 * Method to validate filterTask query param keys
 * @param {*} queryParams 
 * @returns 
 */
const filterTaskValidator = (queryParams) => {
    let result = [];
    let keyMissingMsg = CONSTANTS.VALIDATION_MSG.KEY_MISSING;
    let keyName = "${keyName}";
    let filterTaskKeys = APP_CONSTANTS.FILTER_TASK_KEYS;

    for(let i=0; i < filterTaskKeys.length; i++) {
        if(!(queryParams.hasOwnProperty(filterTaskKeys[i]))) {
            msg = keyMissingMsg.replace(keyName, filterTaskKeys[i]);
            result.push(msg);
        }
    }

    if(!(APP_CONSTANTS.FILTER_OPTIONS.includes(queryParams.criteria))) {
        result.push(CONSTANTS.FILTER_TASK.VALIDATION_MSG);
    }
    return result;
}
/**
 * Method to validate pagination keys
 * @param {*} queryParams 
 * @returns 
 */
const paginationKeyValidator = (queryParams) => {
    let result = [];
    let keyMissingMsg = CONSTANTS.VALIDATION_MSG.KEY_MISSING;
    let formatInvalidMsg = CONSTANTS.PAGINATION.VALIDATION_ERROR;
    let keyName = "${keyName}";
    let paginationKeys = APP_CONSTANTS.PAGINATION_KEYS;

    for(let i=0; i < paginationKeys.length; i++) {
        if(!(queryParams.hasOwnProperty(paginationKeys[i]))) {
            msg = keyMissingMsg.replace(keyName, paginationKeys[i]);
            result.push(msg);
        }
        else if((typeof parseInt(queryParams[paginationKeys[i]]) != "number") || parseInt(queryParams[paginationKeys[i]]) <= 0) {
            msg = formatInvalidMsg.replace(keyName, paginationKeys[i]);
            result.push(msg);
        }
    }
    return result;
}
/**
 * Method to check if sort valu key is either 'asc' or 'desc'
 * @param {*} queryParams 
 * @param {*} validationResult 
 * @returns 
 */
const sortValueValidator = (queryParams, validationResult) => {
    if(!(queryParams.value.toLowerCase() == 'asc' || queryParams.value.toLowerCase() == 'desc')) {
        validationResult.push(CONSTANTS.SORT_TASK.VALUE_VALIDATION_ERROR);
    }
    return validationResult;
}

module.exports = { userKeysValidator, userNameValidator, passwordValidator, taskValidator, taskIdValidator,
    filterTaskValidator, paginationKeyValidator, sortValueValidator }