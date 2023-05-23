const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./auth/passport-config')(passport)
const cloudinary = require('cloudinary').v2;

const port = 3000;

app.use(express.static('public'));
app.use(helmet())
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieSession({
    name: 'session',
    keys: ['gq;neoisandgwe23gin'],
    maxAge: null
}))

app.use(passport.initialize());

app.use(passport.session())

//routes 
app.use(require('./routes/index.js'))
app.use(require('./routes/profile.js'))
app.use(require('./routes/newpost.js'))
app.use(require('./routes/login.js'))
app.use(require('./routes/registration.js'))
app.use(require('./routes/exercises.js'))
app.use(require('./routes/friends.js'))

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})