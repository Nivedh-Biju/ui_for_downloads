const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer, 
        contentType: String 
    }
});

module.exports = mongoose.model('File', fileSchema);
