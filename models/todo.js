const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    title: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    due_date: {
        type: Date,
    }
});

module.exports = mongoose.model('Todo', TodoSchema);