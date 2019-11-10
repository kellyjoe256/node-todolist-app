const mongoose = require('mongoose');

/* eslint-disable comma-dangle */
const TaskSchema = mongoose.Schema(
    {
        title: String,
        priority: { type: String, default: 'low' },
        completed: { type: Boolean, default: false },
        start_date: { type: Date, default: Date.now },
        due_date: Date,
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

module.exports = mongoose.model('Task', TaskSchema);
