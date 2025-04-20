const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

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
    },
    username:{
        required:true,
        type:String,
        unique:true,
    },
    password:{
        required:true,
        type:String,
    }
});


personSchema.pre('save',async function (next) {
    const person=this; // Get the current person document

    //hash the password only if it has been modified (or its new)
    if(!person.isModified('password')) return next(); // If password is not modified, move to the next middleware

    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);

        //hash password
        const hashedPassword= await bcrypt.hash(person.password,salt);

        //override the plain password with hashed one
        person.password=hashedPassword; // Set the password to the hashed password

        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
    }catch(err){

        throw err; // If an error occurs, throw the error
    }
}

  //Create Person model
  const Person=mongoose.model('Person',personSchema); //Model name is 'Person' and schema is personSchema.
  module.exports=Person; //Export the Person model for use in other files.
//This model can be used to perform CRUD operations on the 'Person' collection in the MongoDB database.