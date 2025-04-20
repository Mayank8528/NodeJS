 const mongoose = require('mongoose');
 require('dotenv').config();

 //Define the MongoDB connection URL
 const mongoURL = process.env.MONGODB_URL_LOCAL // Replace with your MongoDB connection string
 //const mongoURL =process.env.MONGODB_URL; //written password of mongodb that is 'mayank@8528' as 'mayank%408528' in the connection string.

 //set up MongoDB connection 
 mongoose.connect(mongoURL, {
     useNewUrlParser: true,
     useUnifiedTopology: true 
    })

    //get the default connection
    //mongoose maintains a default connection object representing the Mongodb connection.
    const db = mongoose.connection;

    //Define event listeners for the database connection

    db.on('connected',()=>{
        console.log('Connected to Mongodb server');
    }) //'connected','error','disconnected' are predefined eventlistener keywords in mongodb.

    db.on('error',(err)=>{
        console.error('Mongodb connection error:', err);
    })

    db.on('disconnected',()=>{
        console.log('Mongodb server disconnected');
    })

    //export the database connection
    module.exports = db; // Export the database connection for use in other files 