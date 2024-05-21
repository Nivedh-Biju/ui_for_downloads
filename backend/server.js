require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/mongodb');
const getFiles = require('./routes/fileRoutes');
const addFile = require('./routes/addFile');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectDB();


app.use('/api', apiRoutes);
app.use('/api/files', getFiles);
app.use('/api/addData', addFile);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
