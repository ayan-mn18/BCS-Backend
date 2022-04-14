const express = require('express');
const morgan = require('morgan');
const bd = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const { db } = require('./Config');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(bd.urlencoded({extended : false}));
app.use(bd.json());

app.get('/' ,(req,res) =>{
    res.send('Hello');
});

app.listen(PORT , () =>{
    console.log(`App running on PORT ${`${PORT}`.bold.yellow}`);
})