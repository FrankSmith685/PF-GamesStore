const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
require('./passport')
const passport = require('passport')
const cors = require('cors')
const cookieSession = require('cookie-session')
const {
  URL_VERCEL
} = process.env;


require('./db.js');

/* npm i passport cors cookie-session
    en el json cambiar la versión de passport por la 0.5.0
    npm install passport-google-oauth
*/

const server = express();

server.name = 'API';



// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));
server.use(express.json())
server.use(cors(
  // { origin: `${URL_VERCEL}` }
  ))
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `https://pf-gamestore.vercel.app`)
  res.header('Access-Control-Allow-Credentials', 'true'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused- vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//GOOGLE AUTH:

server.use(cookieSession({
  name: 'session',
  keys: ['algo'],
  maxAge: 24*60*60*100

}))

server.use(passport.initialize())
server.use(passport.session())




server.use('/', routes);


module.exports = server;