const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const { error } = require('console')
const cloudinary = require('cloudinary').v2
const Image = require('../Models/FormModel')
const Comments = require('../Models/CommentModel')
const upload = multer({
    storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    console.log(ext);
    if (ext !== ".jpg" && ext!==".jpeg" && ext!==".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
})

cloudinary.config({
    cloud_name: "dtrrxvumj",
    api_key: "453121125234534",
    api_secret: "36u5txt5yOwRmcmBZcVdTDi718I",
  });

router.post('/upload',upload.single("photo"),async(req,res)=>{
    const {name,age,description,doctor} = await req.body;
    const photo = req.file;
    cloudinary.uploader.upload(
        photo.path,
        {resource_type:"image"},
        async(err,result)=>{
            if(err){
                console.log(err);
            }
            const newImage = new Image({
                name: name,
                description: description,
                doctor: doctor,
                url: result.url,
                cloudinaryId: result.public_id,
                age:age
              });
              const savedImage = await newImage.save();
              return res.status(200).send({ savedImage, sucssess: true });
        }

    )
})

router.get('/getpatients/:name',async(req,res)=>{
  try {
    const {name} = req.params
    const patients = await Image.find({doctor:name});
    if(!patients){
      return res.status(200).json({message:"no patients to see"})
    }
    return res.status(200).json(patients)
  } catch (error) {
    return res.status(200).json({error,message:"some error occured"})
  }

})

router.post('/uploadcomment',async(req,res)=>{
  const {comment,patient,doctor,url} = req.body
  const uplcomm = await Comments.create({
    comment:comment,
    doctor:doctor,
    patient:patient,
    url:url
  })
  const output = await uplcomm.save()
  return res.status(200).json({message:"comment sent successfully",output})
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

router.get('/getcomment/:name',async(req,res)=>{
  
  try {
    const {name} = req.params
    console.log(name);
    const comments = await Comments.find({patient:name})
    console.log(comments);
    return res.status(200).json(comments)
  } catch (error) {
    return res.status(400).send(error)
  }
})

module.exports = router