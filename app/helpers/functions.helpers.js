const objectIsEmpty = function (obj) {
    return (Object.keys(obj)).length === 0;
}

const formatValidationErrors = function (validationErrorObject) {
    const errors = [];
    validationErrorObject.details.forEach(validationError => {
        const label = validationError.context.label;
        // check if an error with matching validation error label
        // already exists in the current errors to be returned
        const check = errors.find(error => {
            return Object.keys(error).indexOf(label) !== -1;
        });

        // If validation message belonging to the current label does not
        // already exist in current array of errors to be returned
        // add it, otherwise ignore
        if (!check) {
            let temp = {};
            temp[label] = validationError.message.replace(/"/g, '');

            errors.push(temp);
        }
    });
    
    return errors;
}

module.exports.objectIsEmpty = objectIsEmpty;
module.exports.formatValidationErrors = formatValidationErrors;
