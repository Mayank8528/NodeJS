const express=require('express');
const router=express.Router(); // Create a new router instance
const MenuItem = require('./../models/MenuItem');

//Post route to add a menuItem
router.post('/',async(req,res)=>{
    try{
      const data2=req.body //Assume the request body contains person data
    
      //Create a new person document using the Mongoose model
      const MenuItem2 = new MenuItem(data2);
    
      //save the new person to the database
      const response2= await MenuItem2.save();
      console.log('Data Saved');
      res.status(200).json(response2);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
    })
  
  
    //GET method to get the menuItem
  router.get('/',async(req,res)=>{
    try{
      const data2=await MenuItem.find();
      console.log('Data Fetched');
    res.status(200).json(data2);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })

  module.exports=router; // Export the router for use in other files