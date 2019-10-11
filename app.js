/**
 * Entry point of the service provider(FS) demo app.
 */
const
  express = require('express'),
  session = require('express-session'),
  sessionstore = require('sessionstore'),
  bodyParser = require('body-parser');

const app = express();

// Note this enable to store user session in memory
// As a consequence, restarting the node process will wipe all sessions data
app.use(session({
  store: sessionstore.createSessionStore(),
  secret: 'demo secret',
  cookie: {},
  saveUninitialized: true,
  resave: true,
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('home'));

app.post('/login', (req, res) => {
  console.log("@TODO: Login form", req.body);
  res.render('home');
});

// Setting app port
const port = process.env.PORT || '3000';

// Starting server
const server = app.listen(port, () => {
  console.log(`\x1b[32mServer listening on http://localhost:${port}\x1b[0m`);
});
