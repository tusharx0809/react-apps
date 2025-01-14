require('dotenv').config();
const connecToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connecToMongo();

const app = express();
const port = 5050;

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization","authToken","email"]
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('api/settings', require('./routes/settings'));

app.listen(port, ()=>{
    console.log(`Banking Mongo backend is running on http://localhost:${port}`);
})