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

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
    console.log('🍪:', req.cookies);
    const username = req.cookies.username;
  
    res.locals.username = "";
    // properties set on res.locals become accessible in any view
    if (username) {
      res.locals.username = username
      console.log(`Signed in as ${username}`);
    }
    // next is a function, when invoked it will tell express to move on to the next middleware
    next();
  })

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

app.post('/sign_out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/welcome');
  });

app.listen(3000, () => {
    console.log('Express web app on localhost: 3000');
});