const express = require('express')
const router = express.Router();
const FormModel = require('../Models/FormModel')
const Doctor=require('../Models/DoctorModel')

router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({},'username');
    res.json({ success: true, data: doctors });
    console.log(doctors)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
  }
});

router.post('/upload', async (req, res) => {
  try {
    console.log(req.body + "Body...");
      const { name, phoneno, description, dname } = req.body;
      console.log(dname + "dufhjdshgfjdsgfjgdsfjhdgsj"); 

      // Create a new form entry
      const newForm = new FormModel({
        name: name,
        phoneno:phoneno,
        description: description,
        dname:dname      
    });
    console.log(newForm+ " hulalalalalalal");

      // Save the form entry to the database
      const savedForm = await newForm.save();

    
      res.status(200).json({ savedForm, success: true });
  } catch (error) {
      // Handle errors here and send an error response
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/getRecords/:username', async(req, res) => {
  try {
    console.log("fuck");
    const { username } = req.params;
    const donors=await FormModel.find({name:username}); // Filter donors based on location
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this location" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});

router.get('/getprecords/:username', async(req, res) => {
  try {
    console.log("fuck");
    const { username } = req.params;
    console.log(username);
    const donors=await FormModel.find({dname:username}); // Filter donors based on location
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this location" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});



module.exports = router;

