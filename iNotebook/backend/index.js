const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo(); // Ensure the database connection is established

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/note'))

app.listen(port, () => {
    console.log(`iNotebook Backend App is running on http://localhost:${port}`);
});
