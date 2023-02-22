const express = require('express');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth',authRoutes);

app.listen(3000);