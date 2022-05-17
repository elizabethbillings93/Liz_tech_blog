// Pull in Express
const express = require('express');
// Pull in Express-Session
const session = require('express-session');
// Pull in Path
const path= require('path');
// Pull in Express-Handlebars
const exphbs= require ('express-handlebars');
// Make object for helpers.js
const helpers= require('./utils/helpers');
// Make object for controllers.js
const routes = require('./controllers');
// const models = require('./models');
// Make object for connection.js
const sequelize= require('./config/connection');
// Make object for Session Storage; Cleared when page session ends
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Access open port or 3002
const PORT = process.env.PORT || 3002;
// Object made from pulling in express
const app = express();
// Express version for connect-session-storage
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
// use express version of above object
app.use(session(sess));
// Create new object 
const hbs= exphbs.create({helpers});
// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
// Use controllers.js route
app.use(routes);
// Listen to Port
    app.listen (PORT, () =>{
        console.log('Do you work?');
        sequelize.sync({ force: false });
});