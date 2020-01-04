const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('../routes/');


const dbURI = 'mongodb://localhost:27017/angeldb';
mongoose.connect(dbURI, { useNewUrlParser: true });

const app = express();

app.use('/api', apiRoutes);
module.exports = app;
