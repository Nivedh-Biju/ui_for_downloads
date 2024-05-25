const express = require('express');
const FileModel = require('../db_schemas/File');
const multer = require('multer');

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

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await FileModel.findByIdAndDelete(id);
        res.status(200).send('File deleted successfully!');
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Failed to delete file!');
    }
});

router.put('/edit/:id', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    try {
        const { filename, link, description, roles: rolesString, image } = req.body;
        const roles = JSON.parse(rolesString); 

        const currentDate = new Date(); 

        console.log(roles);
        const fileLink = link !== '' ? link : `/api/addData/download/${req.files['file'][0].filename}`;

        const updatedFileData = {
            filename,
            link: fileLink,
            description,
            roles, 
            image: image,
            updatedDate: currentDate 
        };


        await FileModel.findByIdAndUpdate(req.params.id, updatedFileData);

        res.status(200).send('Data updated successfully!');
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Failed to update data!');
    }
});



module.exports = router;



