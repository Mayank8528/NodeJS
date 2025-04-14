const express=require('express');
const router=express.Router(); // Create a new router instance
const Person=require('./../models/Person'); // Import the Person model

//POST route to add a person
router.post('/',async(req,res)=>{
    try{
      const data=req.body //Assume the request body contains person data
    
      //Create a new person document using the Mongoose model
      const newPerson = new Person(data);
    
      //save the new person to the database
      const response= await newPerson.save();
      console.log('Data Saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
    })


    //GET method to get the person
    router.get('/',async(req,res)=>{
        try{
          const data=await Person.find();
          console.log('Data Fetched');
        res.status(200).json(data);
        }catch(err){
          console.log(err);
          res.status(500).json({error:'Internal Server Error'});
        }
      })


      //parametrized call of person
      router.get('/:workType',async(req,res)=>{
        try{
          const workType=req.params.workType; //Get the work type from the URL parameter
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
          const response=await Person.find({work:workType});
          console.log('response fetched');
          res.status(200).json(response); //Send the response back to the client
        }else{
          res.status(404).json({error:'Invalid work type'});
        }
        } catch(err){
          console.log(err);
          res.status(500).json({error:'Internal Server Error'});
        }
      })

      router.put('/:id',async(req,res)=>{
        try{
            const personId=req.params.id; //Get the person ID from the URL parameter
            const updatedPersonData=req.body; //Get the updated person data from the request body

            const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
                new:true, //Return the updated document
                runValidators:true //Run Mongoose Validation
            })

            if(!updatedPersonData){
                return res.status(404).json({error:'Person not found'}); //If the person is not found, return a 404 error
            }

            console.log('Data updated');
            res.status(200).json(response);
        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'});
        }
      })



      router.delete('/:id',async(req,res)=>{
        try{
            const personId=req.params.id; //Get the person ID from the URL parameter

            //Assuming you have a Person Model
            const response=await Person.findByIdAndDelete(personId);
            if(!response){
                return res.status(404).json({error:'Person not found'}); //If the person is not found, return a 404 error
            }
            console.log('data deleted');
            res.status(200).json({message:'Person deleted Successfully'}); //Return a success message
        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'}); //Return a 500 error for any other errors
        }
      })

      module.exports=router; // Export the router for use in other files