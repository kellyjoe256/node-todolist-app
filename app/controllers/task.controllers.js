const Task = require('../models/task.model');
const helpers = require('../helpers/functions.helpers');
const validatorConfig = require('../../config/input_validator.config');
const createSchema = require('../validators/task/create_task.validator');
const updateSchema = require('../validators/task/update_task.validator');

const keys = [
    'title',
    'priority',
    'completed',
    'start_date',
    'due_date'
];

module.exports = {
    // Retrieve and return all tasks from the database
    getAll: (req, res) => {
        const sort = { due_date: 1 };
        const search = {};
        const projection = { updated_at: 0 };

        Task.find(search, projection)
            .sort(sort)
            .then(tasks => {
                res.send(tasks);
            }).catch(err => {
                const message = err.message || 'An error occurred';

                res.status(500).send({
                    message,
                });
            });
    },

    // Create and save a new task
    create: (req, res) => {
        const result = createSchema.validate(req.body, validatorConfig.options);
        if (result.error) {
            return res.status(400)
                .send(helpers.formatValidationErrors(result.error));
        }

        const taskContent = {};
        for (let i = 0, len = keys.length; i < len; i += 1) {
            if (req.body[keys[i]] !== undefined) {
                taskContent[keys[i]] = req.body[keys[i]];
            }
        }

        // Create a new task
        const task = new Task(taskContent);

        // Save task to the database
        task.save().then(data => {
            res.status(201).send(data);
        }).catch(error => {
            const message = error.message || 'An error occurred';

            res.status(500).send({
                error: {
                    message,
                    code: 500,
                },
            });
        });
    },

    // Retrieve a single task with id provided in the request
    getOne: (req, res) => {
        const taskId = req.params.id;
        const projection = {
            _id: 1,
            title: 1,
            completed: 1,
            priority: 1,
            start_date: 1,
            due_date: 1,
            created_at: 1,
        };

        Task.findById(taskId, projection)
            .then(task => {
                if (!task) {
                    return res.status(404).send({
                        error: {
                            code: 404,
                            message: 'Task not found',
                        },
                    });
                }

                res.status(200).send(task);
            }).catch(error => {
                const message = error.message || 'An error occurred';

                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        error: {
                            code: 404,
                            message: 'Task not found',
                        },
                    });
                }

                return res.status(500).send({
                    error: {
                        message,
                        code: 500,
                    },
                });
            });
    },

    // Update a single task with id provided in the request
    update: (req, res) => {
        const taskId = req.params.id;

        const result = updateSchema.validate(req.body, validatorConfig.options);
        if (result.error) {
            return res.status(400)
                .send(helpers.formatValidationErrors(result.error));
        }

        const taskContent = {};
        for (let i = 0, len = keys.length; i < len; i += 1) {
            // all are optional
            if (req.body[keys[i]] !== undefined) {
                taskContent[keys[i]] = req.body[keys[i]];
            }
        }

        // Find task and update it
        Task.findByIdAndUpdate(taskId, taskContent, { new: true })
            .then(task => {
                if (!task) {
                    return res.status(404).send({
                        error: {
                            code: 404,
                            message: 'Task not found',
                        },
                    });
                }

                res.status(200).send(task);
            }).catch(error => {
                const message = error.message || 'An error occurred';

                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        error: {
                            code: 404,
                            message: 'Task not found',
                        },
                    });
                }

                return res.status(500).send({
                    error: {
                        message,
                        code: 500,
                    },
                });
            });
    },

    // Delete a single task with id provided in the request
    delete: (req, res) => {
        const taskId = req.params.id;

        Task.findByIdAndDelete(taskId)
            .then(task => {
                if (!task) {
                    return res.status(404).send({
                        error: {
                            code: 404,
                            message: 'Task not found',
                        },
                    });
                }

                res.status(204).send();
            }).catch(error => {
                const message = error.message || 'An error occurred';

                if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                    return res.status(404).send({
                        error: {
                            code: 404,
                            message: 'Task not found',
                        },
                    });
                }

                return res.status(500).send({
                    error: {
                        message,
                        code: 500,
                    },
                });
            });
    },
};

