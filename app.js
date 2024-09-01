const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userModel=require("./models/users")

let app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://shaniba:7907586363@cluster0.xsue8.mongodb.net/blogappDb?retryWrites=true&w=majority&appName=Cluster0")
app.post("/signup",async(req,res)=>{
    let input=req.body
    let hashedpassword=bcrypt.hashSync(req.body.password,10)
    console.log(hashedpassword)
    req.body.password=hashedpassword
    
    userModel.find({email:req.body.email}).then(
    (items)=>{
        if(items.length>0){
            res.json({"status":"email id already exist"})
            }
            else{
            let result=new userModel(input)
            result.save()
           res.json({"status":" success"})
        }
    }
   ).catch(
    (error)=>{}
   )
  

})

app.listen(8080,()=>{
    console.log("server started")
})