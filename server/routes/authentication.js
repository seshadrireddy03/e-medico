const express = require('express')
const router = express.Router()
const Patient = require('../Models/PatientModel')
const JWT_SECRET = "Harsha$@"
var jwt = require('jsonwebtoken')
const Doctor = require('../Models/DoctorModel')
router.post('/createpatient',async(req,res)=>{
    const {username,email,password,dob} = req.body
    const patient = await Patient.create({
        username:username,
        email:email,
        password:password,
        dob:dob
    })
    const data = {
        user:{
            id:patient.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,patient,authtoken})
})

router.post('/createdoctor',async(req,res)=>{
    const {username,email,password,dob} = req.body
    const doctor = await Doctor.create({
        username:username,
        email:email,
        password:password,
    })
    const data = {
        user:{
            id:doctor.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,doctor,authtoken})
})

router.post('/login',async(req,res)=>{
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

router.post('/doctorlogin',async(req,res)=>{
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


router.post('/getpatient',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const patient = jwt.verify(token,JWT_SECRET)
    const user = await Patient.findById(patient.user.id)
    return res.status(200).json(user)
})

router.post('/getdoctor',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const doctor = jwt.verify(token,JWT_SECRET)
    const user = await Doctor.findById(doctor.user.id)
    return res.status(200).json(user)
})

module.exports = router