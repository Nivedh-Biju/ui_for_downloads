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
        type: String,
        required: true
    },
    roles: { 
        type: [String],
        required: false
    },
    uploadedDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', fileSchema);
