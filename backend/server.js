require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FileModel = require('./db_schemas/File');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0:27017/polus_file_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.post('/api/addData', async (req, res) => {
    try {
        const { filename, link, description } = req.body;
        const newFile = new FileModel({ filename, link, description });
        await newFile.save();
        res.status(201).send('Data added successfully!');
        console.log(req.body);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Failed to add data!');
    }
});

app.get('/api/files', async (req, res) => {
    try {
        const files = await FileModel.find();
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data!');
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
