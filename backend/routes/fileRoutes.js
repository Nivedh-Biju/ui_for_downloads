const express = require('express');
const FileModel = require('../db_schemas/File');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const files = await FileModel.find();
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data!');
    }
});

module.exports = router;


