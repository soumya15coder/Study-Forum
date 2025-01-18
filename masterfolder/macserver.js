touch public/page3.html

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configure storage for uploaded files
const upload = multer({
    dest: 'uploads/', // Directory to store uploaded files
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

// Endpoint to fetch uploaded files
app.get('/files', (req, res) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
        return res.json([]);
    }
    const files = fs.readdirSync(dir).map(file => ({
        name: file,
        path: `/uploads/${file}`,
    }));
    res.json(files);
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
