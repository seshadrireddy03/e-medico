const express = require('express')
const router = express.Router();
const FormModel = require('../Models/FormModel')


router.post('/upload', async (req, res) => {
  try {
    console.log(req.body + "Body...");
      const { name, location, description, phoneno } = req.body;
      console.log(location + "dufhjdshgfjdsgfjgdsfjhdgsj"); 

      // Create a new form entry
      const newForm = new FormModel({
        name: name,
        location:location,
        description: description,
        dphoneno:phoneno, 
        rphoneno:" ",
        vphoneno:" ",
        accepted: false,
        raccepted: false,
        vname:" ",
        rname: " ",
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

router.get('/getdonor/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const donors = await FormModel.find({ location, accepted: !!false,raccepted:!false }); // Filter donors based on location
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this location" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});

router.get('/getdonor00/:vname', async (req, res) => {
  try {
    const { vname } = req.params;
    const donors = await FormModel.find({name:vname}); // Filter donors based on location
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this location" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});

router.get('/getdonor11/:vname', async (req, res) => {
  try {
    const { vname } = req.params;
    const donors = await FormModel.find({ vname, accepted: !false}); // Filter donors based on location
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this location" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});

router.get('/getdonor1/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const donors = await FormModel.find({ location, raccepted: !!false }); // Filter donors based on location
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this location" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});

router.get('/getdonor12/:rname', async (req, res) => {
  try {
    const { rname } = req.params;
    const donors = await FormModel.find({ rname, raccepted: !false}); // Filter donors based on location
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this location" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});

router.post('/uploadcomment',async(req,res)=>{
  const {donorid,volunter,vphone, accepted} = req.body;
  console.log(req.body);
  const updateAcceptedStatus = async (id, newAcceptedValue) => {
  try {
    const filter = { _id: id }; // Specify the filter based on _id
    const update = { accepted: newAcceptedValue,vname:volunter,vphoneno: vphone }; // Specify the field you want to update and its new value

    // Use updateOne method to update the document
    const result = await FormModel.updateOne(filter, update);

    if (result.nModified === 1) {
      console.log(`Document with _id ${id} updated successfully.`);
    } else {
      console.log(`Document with _id ${id} not found.`);
    }
  } catch (error) {
    console.error(`Error updating document: ${error.message}`);
  }
};
updateAcceptedStatus(donorid, true);

  return res.status(200).json({message:"comment sent successfully"})
})

router.post('/uploadcomment1',async(req,res)=>{
  const {donorid, donorName, donorLocation,description,recipient,rphone, accepted,raccepted} = req.body;
  console.log(req.body);
  const updateAcceptedStatus = async (id, newAcceptedValue) => {
  try {
    const filter = { _id: id }; // Specify the filter based on _id
    const update = { raccepted: newAcceptedValue ,rname:recipient,rphoneno:rphone}; // Specify the field you want to update and its new value

    // Use updateOne method to update the document
    const result = await FormModel.updateOne(filter, update);

    if (result.nModified === 1) {
      console.log(`Document with _id ${id} updated successfully.`);
    } else {
      console.log(`Document with _id ${id} not found.`);
    }
  } catch (error) {
    console.error(`Error updating document: ${error.message}`);
  }
};

updateAcceptedStatus(donorid, true);
  return res.status(200).json({message:"comment sent successfully"})
})

router.delete('/deleteform/:name',async(req,res)=>{
  try {
    const {name} = req.params
    const comment = await Image.deleteOne({name:name})
    return res.status(200).json({comment})
  } catch (error) {
    console.log(error);
  }

})

module.exports = router

