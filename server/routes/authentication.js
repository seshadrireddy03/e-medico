const express = require('express')
const router = express.Router()
const Patient = require('../Models/PatientModel')
const JWT_SECRET = "Sin"
var jwt = require('jsonwebtoken')
const Doctor = require('../Models/DoctorModel')
const FormModel=require('../Models/FormModel')

router.post('/CreatePatient',async(req,res)=>{
    const {username,email,phone,password,dob,branch,section} = req.body
    const patient = await Patient.create({
        username:username,
        email:email,
        phone:phone,
        password:password,
        dob:dob,
        branch:branch,
        section:section,
    })
    const data = {
        user:{
            id:patient.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,patient,authtoken})
})

router.post('/createDoctor',async(req,res)=>{
    const {username,email,password,phone,dob} = req.body
    const doctor = await Doctor.create({
        username:username,
        email:email,
        password:password,
        phone:phone,
        dob:dob
    })
    const data = {
        user:{
            id:doctor.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,doctor,authtoken})
})



router.post('/PatientLogin',async(req,res)=>{
    const {email,password} = req.body
    const patient = await Patient.findOne({email:email})
    if(!patient){
        return res.status(200).json({success:false,message:"login with correct credentials"})
    }
    if(password!==patient.password){return res.status(200).json({success:false,message:"login with correct credentials"})}
    const data = {
        user:{
            id:patient.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,patient,authtoken})
})

router.post('/Doctorlogin',async(req,res)=>{
    const {email,password} = req.body
    const doctor = await Doctor.findOne({email:email})
    if(!doctor){
        return res.status(200).json({success:false,message:"login with correct credentials"})
    }
    if(password!==doctor.password){return res.status(200).json({success:false,message:"login with correct credentials"})}
    const data = {
        user:{
            id:doctor.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,doctor,authtoken})
})

router.post('/GetPatient',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const patient = jwt.verify(token,JWT_SECRET)
    const user = await Patient.findById(patient.user.id)
    return res.status(200).json(user)
})

router.post('/GetDoctor',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const doctor = jwt.verify(token,JWT_SECRET)
    const user = await Doctor.findById(doctor.user.id)
    return res.status(200).json(user)
})

router.post('/uploadcomment', async (req, res) => {
    const { recordId, comments } = req.body;
    console.log("ïn Service")
    try {
      // Update the record in the database based on recordId
      const result = await FormModel.updateOne(
        { _id: recordId }, // Assuming your records have an _id field
        { $set: { comments: comments } }
      );
  
      if (result.modifiedCount === 1) {
        return res.status(200).json({ success: true, message: 'Comment submitted successfully' });
      } else {
        return res.status(404).json({ success: false, message: 'Record not found or not updated' });
      }
    } catch (error) {
      console.error('Error updating record:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

module.exports = router