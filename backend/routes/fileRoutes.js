const express = require('express');
const FileModel = require('../db_schemas/File');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const files = await FileModel.find().sort({ filename: 1 }); // Sort by filename in ascending order
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data!');
    }
});

router.post('/search', async (req, res) => {
    const { filename } = req.body;
    try {
        const files = await FileModel.find({
            filename: { $regex: filename, $options: 'i' }
        }).sort({ filename: 1 }); // Sort by filename in ascending order
        res.status(200).json(files);
        console.log(`Search request for filename: ${filename}`);
    } catch (error) {
        console.error('Error searching files:', error);
        res.status(500).send('Failed to search files!');
    }
});


module.exports = router;


