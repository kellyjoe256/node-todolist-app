const Joi = require('@hapi/joi');
const customErrorMessages = require('./custom_error_messages');

module.exports = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .error(customErrorMessages.setTitleErrorMessages),
    priority: Joi.string()
        .trim()
        .valid('low', 'medium', 'high')
        .error(customErrorMessages.setPriorityErrorMessages),
    completed: Joi.boolean().error(
        /* eslint-disable comma-dangle */
        customErrorMessages.setCompletedErrorMessages
    ),
    start_date: Joi.date().error(customErrorMessages.setStartDateErrorMessages),
    due_date: Joi.date().error(customErrorMessages.setDueDateErrorMessages),
});
