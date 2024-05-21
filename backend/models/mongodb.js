const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/polus_file_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

module.exports = connectDB;
