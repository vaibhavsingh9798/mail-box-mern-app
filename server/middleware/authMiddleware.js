
const jwt = require('jsonwebtoken')
const secretKey = 'Vai@123'

exports.authenticateUser = async (req,res,next) =>{
try{
   let  token = req.headers.authorization.split(" ")[1];
   if(!token)
   return res.status(401).json({message:'No token provided'})
  let decode = jwt.verify(token,secretKey)
  if(!decode)
  return res.status(401).json({message:'Unauthorized'})
  req.user = decode.email;
  next();
}catch(err){
   return res.status(500).json({message:'Server Error'})
}
}

