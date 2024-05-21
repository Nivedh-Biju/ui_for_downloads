const express = require('express');
const FileModel = require('../db_schemas/File');

const router = express.Router();


router.post('/', async (req, res) => {
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






module.exports = router;


