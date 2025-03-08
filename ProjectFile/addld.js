const {AccountModel}=require("../Modals/OpenAcountModel")

const addId=async(req,res,next)=>{
    const adhar = req.headers.authorization;
    const user=await AccountModel.findOne({adharNo:adhar})
    if(user){
        const id=user._id;
        req.body.userId=id;
        req.body.total=user.total
        next()
    }
    else{
        res.status(200).send("you don't have an account")
    }

}
module.exports={
    addId
}
