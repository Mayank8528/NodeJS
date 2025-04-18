const mongoose = require('mongoose');

//define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true,
    }
});

  //Create Person model
  const Person=mongoose.model('Person',personSchema); //Model name is 'Person' and schema is personSchema.
  module.exports=Person; //Export the Person model for use in other files.
//This model can be used to perform CRUD operations on the 'Person' collection in the MongoDB database.