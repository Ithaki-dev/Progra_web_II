const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: String,
        unique: true
    },
    age: {
        required: true,
        type: Number
    }   
})

module.exports = mongoose.model('Profesor', profesorSchema)