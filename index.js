const express = require('express');
const { response } = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));

const logger = require('morgan');

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: true}));
app.use(cookieParser());  
app.use(logger('dev'));

app.get("/welcome", (request, response) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    response.cookie('Hello', 'World', { maxAge: ONE_DAY })
    response.render('welcome');
});

app.post('/sign_in', (req, res) => {
    const COOKIE_EXPIRE = 1000 * 60 * 60 * 24 * 7;
    const username = req.body.username;
    res.cookie('username', username, { maxAge: COOKIE_EXPIRE });
    res.redirect('/welcome'); 
})

app.listen(3000, () => {
    console.log('Express web app on localhost: 3000');
});