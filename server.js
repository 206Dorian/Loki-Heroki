const express = require('express');
const path = require('path');
const clog = require('clog');
// const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/db.json');
// Import custom middleware, "cLog"
// app.use(clog);
const uuid = require('./helper/uuid');
const fs = require('fs');
const {readFromFile, readAndAppend} = require('./helper/fsUtils')
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Congrats `);
  } else {
    res.error('Error');
  }
});

// GET Route for notes
app.get('/notes', (_req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// // GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

// // Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// ## Gitting Started

// On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

// The following HTML routes should be created:

// * `GET /notes` should return the `notes.html` file.

// * `GET *` should return the `index.html` file.

// The following API routes should be created:

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
