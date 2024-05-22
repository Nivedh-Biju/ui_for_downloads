const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Add this line to import the 'fs' module
const FileModel = require('../db_schemas/File');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { filename,link, description } = req.body;
        const file = req.file;

        // If link is empty, set it to the download URL of the uploaded file
        const fileLink = link !== '' ? link : `/api/addData/download/${file.filename}`;

        const newFile = new FileModel({ 
            filename,
            link: fileLink,
            description,
        });
        console.log(newFile);
        await newFile.save();

        res.status(201).send('Data added successfully!');
        console.log(req.body);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Failed to add data!');
    }
});

// Route to handle file downloads
router.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    console.log("Download request received for file:", filename);
    const filePath = path.join(__dirname, '../../uploads', filename);
    console.log(filePath);
    // Check if file exists
    if (fs.existsSync(filePath)) {
        // Serve the file for download
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
});

module.exports = router;
