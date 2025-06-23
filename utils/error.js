const error = (err,req,res,next) => {
  console.log("error  middleware")
   res.status(err.code || 500).json({message: err.message || "Something Wrong!!!"})
  
}


export default error;