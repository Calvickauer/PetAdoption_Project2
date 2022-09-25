require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const router = express.Router();
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
var methodOverride = require('method-override');
const db = require('./models');

const SECRET_SESSION = process.env.SECRET_SESSION;
const API_KEY = process.env.API_KEY;
// console.log('yooooooooooo..... >>> ',SECRET_SESSION, "api key: ",API_KEY);
console.log('yooooooooooo..... >>> ');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));
app.use(flash());            // flash middleware
app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log('res locals.. >>> ',res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/profile/edit', isLoggedIn, (req, res) => {
  res.render('edit');
})

app.put('/profile/:id', isLoggedIn, async (req, res) => {
  try {
    const usersUpdated = await db.user.update({
      email: req.body.email,
      name: req.body.name
    }, {
      where: {
        id: req.params.id
      }
    });
    console.log('TTTTTTTTTTTTTTTTTT put it in TTTTTTTTTTTTTTTTTTT');
    console.log(usersUpdated, "users updated");
    console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
  
    // redirect back to profile page
    res.redirect('/profile');

  } catch (error) {
    console.log(error, "  MY PUT ERROR!!!")
    console.log('***************************************************************');
    res.render('edit');
  }
});




// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

// access to all of our auth routes  GET /auth/login  GET /auth/signup POST routes as well
app.use('/auth', require('./controllers/auth'));
app.use('/search', require('./controllers/search'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});


module.exports = server;


// NOTES

// understand Bootstrap, GET / POST practice/understanding, FORMS, EJS, SEEDING/MIGRATING, GRABBING AND USING MODEL DATA, module.exports, 