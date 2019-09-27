const setTitleErrorMessages = function (errors) {
    errors.forEach(error => {
        let message = '';

        switch (error.code) {
            case 'string.min':
                message = 'Title must be a minimum of ';
                message += error.local.limit + ' characters';

                error.message = message;
                break;

            case 'string.max':
                message = 'Title must be less than or equal to ';
                message += error.local.limit + ' characters';

                error.message = message;
                break;

            case 'string.empty':
                error.message = 'Title is required';
                break;

            default:
                break;
        }
    });

    return errors;
};

const setPriorityErrorMessages = function (errors) {
    errors.forEach(error => {
        switch (error.code) {
            case 'any.only':
                error.message = 'Priority must either be low, medium, or high';
                break;

            default:
                break;
        }
    });

    return errors;
};

const setCompletedErrorMessages = function (errors) {
    errors.forEach(error => {
        switch (error.code) {
            case 'any.only':
            case 'boolean.base':
                error.message = 'Completed must either be true or false';
                break;

            case 'any.required':
                error.message = 'Completed is required';
                break;

            default:
                break;
        }
    });

    return errors;
};

const setStartDateErrorMessages = function (errors) {
    errors.forEach(error => {
        switch (error.code) {
            case 'date.base':
                error.message = 'Start date must be a valid date';
                break;

            case 'string.empty':
                error.message = 'Start date is required';
                break;

            default:
                break;
        }
    });

    return errors;
};

const setDueDateErrorMessages = function (errors) {
    errors.forEach(error => {
        switch (error.code) {
            case 'date.base':
                error.message = 'Due date must be a valid date';
                break;

            case 'string.empty':
                error.message = 'Due date is required';
                break;

            default:
                break;
        }
    });

    return errors;
};

module.exports.setTitleErrorMessages = setTitleErrorMessages;
module.exports.setCompletedErrorMessages = setCompletedErrorMessages;
module.exports.setPriorityErrorMessages = setPriorityErrorMessages;
module.exports.setStartDateErrorMessages = setStartDateErrorMessages;
module.exports.setDueDateErrorMessages = setDueDateErrorMessages;
