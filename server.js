const express = require('express');
const fs = require('fs');
const path = require('path');
const {uuid} = require('uuidv4');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


// HTML route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// API routes
app.get('/api/notes',(req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes)
});

app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    let newNote = req.body;
    newNote.id = uuid();
    let updatedNotes = [...notes, newNote];
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
    res.json(updatedNotes);
})



// HTML route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});



app.listen(PORT, () => console.log(`listing on PORT: ${PORT}`));


