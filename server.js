const express = require('express');
const session = require('express-session');
const path= require('path');
const exphbs= require ('express-handlebars');
const routes = require('./controllers');
const models = require('./models');
const sequelize= require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3002;
const app = express();

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  app.use(session(sess));
const hbs= exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
sequelize.sync({force: false}).then(()=>{
    app.listen (PORT, () =>{
        console.log('Do you work?');
        sequelize.sync({ force: false });
});
});