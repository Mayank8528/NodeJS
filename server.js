const express = require('express')
const app = express();

const db = require('./db') // Import the database connection
const bodyParser=require('body-parser'); // Import body-parser to parse request bodies
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies

const Person=require('./models/Person'); // Import the Person model
//const Menuitem =require('./models/MenuItem'); // Import the Menuitem model
const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('Welcome to my Hotel..');
})

//Import the router files
const personRoutes=require('./routes/personRoutes'); // Import the person routes
const MenuItemRoutes=require('./routes/menuItemRoutes');

//use the routers
app.use('/person',personRoutes); // Use the person routes for all requests to '/person'
app.use('/MenuItem',MenuItemRoutes);
 
app.listen(3000,()=>{
    console.log('Listening on port 3000');
})