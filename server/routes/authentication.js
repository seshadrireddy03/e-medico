const express = require('express')
const router = express.Router()
const Donor = require('../Models/DonorModel')
const JWT_SECRET = "Harsha$@"
var jwt = require('jsonwebtoken')
const Volunter = require('../Models/VolunterModel')
const Recipient = require('../Models/RecipientModel')
router.post('/createdonor',async(req,res)=>{
    const {username,email,password,dob} = req.body
    const donor = await Donor.create({
        username:username,
        email:email,
        password:password,
        dob:dob
    })
    const data = {
        user:{
            id:donor.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,donor,authtoken})
})

router.post('/createvolunter',async(req,res)=>{
    const {username,email,password,phone,dob} = req.body
    const volunter = await Volunter.create({
        username:username,
        email:email,
        password:password,
        phone:phone,
        dob:dob
    })
    const data = {
        user:{
            id:volunter.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,volunter,authtoken})
})

router.post('/createrecipient',async(req,res)=>{
    const {username,email,password,phone,dob} = req.body
    const recipient = await Recipient.create({
        username:username,
        email:email,
        password:password,
        phone:phone,
        dob:dob
    })
    const data = {
        user:{
            id:recipient.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,recipient,authtoken})
})

router.post('/donorlogin',async(req,res)=>{
    const {email,password} = req.body
    const donor = await Donor.findOne({email:email})
    if(!donor){
        return res.status(200).json({success:false,message:"login with correct credentials"})
    }
    if(password!==donor.password){return res.status(200).json({success:false,message:"login with correct credentials"})}
    const data = {
        user:{
            id:donor.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,donor,authtoken})
})

router.post('/volunterlogin',async(req,res)=>{
    const {email,password} = req.body
    const volunter = await Volunter.findOne({email:email})
    if(!volunter){
        return res.status(200).json({success:false,message:"login with correct credentials"})
    }
    if(password!==volunter.password){return res.status(200).json({success:false,message:"login with correct credentials"})}
    const data = {
        user:{
            id:volunter.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,volunter,authtoken})
})

router.post('/recipientlogin',async(req,res)=>{
    const {email,password} = req.body
    const volunter = await Recipient.findOne({email:email})
    if(!volunter){
        return res.status(200).json({success:false,message:"login with correct credentials"})
    }
    if(password!==volunter.password){return res.status(200).json({success:false,message:"login with correct credentials"})}
    const data = {
        user:{
            id:volunter.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,volunter,authtoken})
})

router.post('/getdonor',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const donor = jwt.verify(token,JWT_SECRET)
    const user = await Donor.findById(donor.user.id)
    return res.status(200).json(user)
})

router.post('/getvolunter',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const volunter = jwt.verify(token,JWT_SECRET)
    const user = await Volunter.findById(volunter.user.id)
    return res.status(200).json(user)
})
router.post('/getrecipient',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const volunter = jwt.verify(token,JWT_SECRET)
    const user = await Recipient.findById(volunter.user.id)
    return res.status(200).json(user)
})

module.exports = router