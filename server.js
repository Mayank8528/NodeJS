const Person = require('./models/Person'); // Make sure this path is correct
const express = require('express')
const app = express();
const db = require('./db') // Import the database connection
require('dotenv').config(); // Load environment variables from .env file
const passport=require('./auth'); // Import passport for authentication
const LocalStrategy = require('passport-local').Strategy;


const bodyParser=require('body-parser'); // Import body-parser to parse request bodies
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
const PORT=process.env.PORT || 3000; // Set the port to the value in the .env file or default to 3000


//const Menuitem =require('./models/MenuItem'); // Import the Menuitem model
const MenuItem = require('./models/MenuItem');



//Middleware Function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${(req.originalUrl)}`);
  next(); // Move on to the next phase
}
app.use(logRequest); // Use the middleware function for all requests

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/', function (req, res) {
  res.send('Welcome to my Hotel..');
})

passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
//authentication logic here
try{
 'Received credentials:', USERNAME, password; // Log the received credentials
  const user=await Person.findOne({username:USERNAME});
  if(!user)
    return done(null,false,{messsage:'Incorrect Username'});

  const isPasswordMatch=user.password==password?true:false; // Check if the password matches
  if(isPasswordMatch){
    return done(null,user)
  }else{
    return done(null,false,{message:'Incorrect Password'}); // If password is incorrect, return error message

  }
}catch(err){
  return done(err); // If an error occurs, return the error
}
}))


//Import the router files
const personRoutes=require('./routes/personRoutes'); // Import the person routes
const MenuItemRoutes=require('./routes/menuItemRoutes');

//use the routers
app.use('/person',localAuthMiddleware,personRoutes); // Use the person routes for all requests to '/person'
app.use('/MenuItem',MenuItemRoutes);
 
app.listen(3000,()=>{
    console.log('Listening on port 3000');
})