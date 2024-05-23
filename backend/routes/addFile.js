const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

router.post('/', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    try {
        const { filename, link, description, roles: rolesString, image } = req.body;
        const roles = JSON.parse(rolesString); // Parse the roles from the JSON string

        console.log(image);
        const fileLink = link !== '' ? link : `/api/addData/download/${req.files['file'][0].filename}`;

        const newFile = new FileModel({ 
            filename,
            link: fileLink,
            description,
            roles, // Include roles array
            image: image,
        });
        console.log(newFile);
        await newFile.save();

        res.status(201).send('Data added successfully!');
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Failed to add data!');
    }
});

router.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads', filename);
    
    if (fs.existsSync(filePath)) {
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
