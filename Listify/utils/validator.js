const CONSTANTS = require('../helpers/constants');

/**
 * Method to validate the username given by a new user while registration
 * @param {*} username 
 * @returns 
 */
const userNameValidator = (username) => {
    if((/^[a-zA-Z_]{1,30}$/).test(username) == false)
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
        key: "taskId",
        regex: /^[0-9]{1,15}$/
    },
    {
        key: "title",
        regex: /^[a-zA-Z0-9 ]{1,30}$/
    },
    {
        key: "description",
        regex: /^[a-zA-Z0-9 ]{1,125}$/
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
    },
    {
        key: "timestamp",
        regex: /^[A-Z0-9 :-]{13,}$/
    }
]
/**
 * Method to validate all the keys of task
 * @param {*} task 
 * @returns 
 */
const taskValidator = (task) => {
    let keyMissingMsg = CONSTANTS.CREATE_TASK.KEY_MISSING;
    let formatInvalidMsg = CONSTANTS.CREATE_TASK.NOT_IN_FORMAT_MSG;
    let keyName = "${keyName}";
    let result = { flag: true, messages: []};

    for(let i=0; i < taskValidationRegex.length; i++) {
        if(!(task.hasOwnProperty(taskValidationRegex[i].key)))
        {
            result["flag"] = false;
            msg = keyMissingMsg.replace(keyName, taskValidationRegex[i].key);
            result["messages"].push(msg);
        }
        else if(!(taskValidationRegex[i].regex).test(task[taskValidationRegex[i].key])) {
            result["flag"] = false;
            msg = formatInvalidMsg.replace(keyName, taskValidationRegex[i].key);
            result["messages"].push(msg);
        }
    }

    // Validates the comments key
    if(!(task.hasOwnProperty("comments")))
    {
        result["flag"] = false;
        msg = formatInvalidMsg.replace(keyName, "comments");
        result["messages"].push(msg);
    }
    else if(task["comments"].length > 0) {
        for(let i=0; i < task.comments.length; i++) {
            for(let j=0; j < taskCommentsValidationRegex.length; j++) {
                if(!(task.comments[i].hasOwnProperty(taskCommentsValidationRegex[j].key)))
                {
                    result["flag"] = false;
                    msg = keyMissingMsg.replace(keyName, taskCommentsValidationRegex[j].key);
                    result["messages"].push(msg);
                }
                else if(!((taskCommentsValidationRegex[j].regex).test(task.comments[i][taskCommentsValidationRegex[j].key]))) {
                    result["flag"] = false;
                    msg = formatInvalidMsg.replace(keyName, taskCommentsValidationRegex[j].key);
                    result["messages"].push(msg);
                }
            }
        }
    }
    return result;
}

const taskIdValidator = (taskId) => {
    if((/^[0-9]{1,15}$/).test(taskId))
        return true;
    return false;
}

module.exports = { userNameValidator, passwordValidator, taskValidator, taskIdValidator}