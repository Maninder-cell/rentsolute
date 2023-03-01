const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const amenityRoutes = require('./routes/amenity');
const questionRoutes = require('./routes/question');
const {verify} = require('./middlewares/verify');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/auth',authRoutes);
app.use('/property', verify, propertyRoutes);
app.use('/amenity', verify, amenityRoutes);
app.use('/question', verify, questionRoutes);

app.listen(3000);