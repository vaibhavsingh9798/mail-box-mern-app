const MailBox = require("../models/mail")
 
const send = async (req,res)=>{
    let {recipient,subject,text} = req.body
    let sender = req.user
    console.log('send con',recipient,subject,text,sender)
    try{
     let response = await MailBox.create({recipient,sender,subject,text})
     return res.status(201).json({message:'successfully send'})
    }catch(err){
     return res.status(500).json({message:'Server Error'})
    }
}

const getInbox = async (req,res) =>{
   console.log('getInb..',req.user)
    try{
       let response = await MailBox.find({recipient:req.user})
        res.status(200).json({data:response,message:'successfully fetch inbox'})
    }catch(err){
        return res.status(500).json({message:'Server Error'})
    }
}

module.exports = {send,getInbox}