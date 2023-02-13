const exphbs = require("express-handlebars");
const express = require ('express');
const routes = require ("./controllers/");
const sequelize = require("./config/connection");
const apiRoutes = require('./controllers/api')


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// This makes the express application USE the route content.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(apiRoutes);
app.use(routes);

app.get('/', (req, res) => {
  console.log('hello msg')
  res.send('Hello World')
})



sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Lets go MVPS');
    });
});



