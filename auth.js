const passport=require('passport'); // Import passport for authentication
const LocalStrategy=require('passport-local').Strategy; // Import local strategy for username/password authentication
const Person=require('./models/Person'); // Import the Person model

passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
    //authentication logic here
    try{
      console.log('Received credentials:', USERNAME, password); // Log the received credentials
      const user=await Person.findOne({username:USERNAME});
      if(!user)
        return done(null,false,{messsage:'Incorrect Username'});
    
      const isPasswordMatch= await user.comparePassword(password); // Check if the password matches
      if(isPasswordMatch){
        return done(null,user)
      }else{
        return done(null,false,{message:'Incorrect Password'}); // If password is incorrect, return error message
    
      }
    }catch(err){
      return done(err); // If an error occurs, return the error
    }
}))

module.exports=passport; // Export the passport instance for use in other files

