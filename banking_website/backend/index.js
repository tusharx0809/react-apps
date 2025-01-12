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
    allowedHeaders: ["Content-Type", "Authorization","authToken"]
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(port, ()=>{
    console.log(`Banking Mongo backend is running on http://localhost:${port}`);
})