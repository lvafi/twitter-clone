const express = require('express');
const { response } = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const logger = require('morgan');

app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.get("/welcome", (request, response) => {
    response.render('welcome');
});

app.listen(3000, () => {
    console.log('Express web app on localhost: 3000');
});