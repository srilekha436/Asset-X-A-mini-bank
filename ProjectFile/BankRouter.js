const express=require("express")
const {AccountModel}=require("../Modals/OpenAcountModel")
const {AcRecordModel}=require("../Modals/AccountReacord")
const {addId}=require("../Middlewares/addId")

const BankRouter=express.Router()

// openAccount

BankRouter.post('/openAccount',async(req,res)=>{
    const {name,email,gender,address,adharNo,dob,mobile,panNo, initialBalance}=req.body;
    const us={...req.body,total:req.body. initialBalance}
    
    try{
        const isAccountExist=await AccountModel.findOne({panNo})||await AccountModel.findOne({adharNo})
        
        if(isAccountExist){
            res.status(200).send('You have already an account')
        }
       else{
        const user= new AccountModel(us)
        await user.save()
        res.status(200).send({msg:'open account successfull'})
       }
    }
    catch(err){
        res.status(400).send(err)
    }
})

//  updateKYC

BankRouter.post('/updateKYC',async(req,res)=>{
    const {name,email,adharNo,dob,mobile,panNo}=req.body;
    
    try{
        const isAccountExist=await AccountModel.findOne({panNo})||await AccountModel.findOne({adharNo})
        if(isAccountExist){
            AccountModel.findByIdAndUpdate(isAccountExist._id,req.body)
            res.status(200).send('KYC updated successfully')
        }

       else{
        res.status(200).send({msg:"You don't have an account"})
       }
    }
    catch(err){
        res.status(400).send(err)
    }
})


//  depositMoney

BankRouter.post('/depositMoney',addId,async(req,res)=>{
    const {userId,amount,total}=req.body
    
    try{
        const t=Number(total)+amount
        const user=await AccountModel.findByIdAndUpdate({_id:userId},{total:t})
        const rec=new AcRecordModel({userId,amount,total:t})
        await rec.save()
        res.status(200).send('deposit money successfull')
    }
    catch(err){
        res.status(400).send(err)
    }
})

//  withdrawMoney

BankRouter.post('/withdrawMoney',addId,async(req,res)=>{
    const {userId,amount,total}=req.body
    
    try{
        const t=Number(total)-amount
        const user=await AccountModel.findByIdAndUpdate({_id:userId},{total:t})
        const rec=new AcRecordModel({userId,amount,total:t,type:"debit"})
        await rec.save()
        res.status(200).send('withdrow money successfull')
    }
    catch(err){
        res.status(400).send(err)
    }
})

// transferMoney

BankRouter.post('/transferMoney',addId,async(req,res)=>{
    const {name,email,panNo,amount,userId,total}=req.body
    try{
        const t=total-amount
        const touser=await AccountModel.findOne({panNo})
        if(touser){
             await AccountModel.findByIdAndUpdate({_id:userId},{total:t})
             await AccountModel.findByIdAndUpdate({_id:touser._id},{total:touser.total+amount})
             res.status(200).send('transfer Money successfull')
        } 
        else{
            res.status(200).send('user account not found')
        }
        
    }
    catch(err){
        res.status(400).send(err)
    }
})

// printStatement

BankRouter.get('/printStatement',addId,async(req,res)=>{
    try{
        const state=await AcRecordModel.aggregate([
            {
              $match:{
                userId:req.body.userId       }
            },
      
            {
              $lookup:{
                from:"accounts",
                localField:"userId",
                foreignField:"_id",
                as:"user"
              }
            }
          ])

          const active=state[0].user[0].isActive
         if(active){
            res.status(200).send({state})
         }
        else{
            res.status(200).send("user statement not found or user don't have an account")
        }
       
    }
    catch(err){
        res.status(400).send(err)
    }
})

// closeAccount

BankRouter.delete('/closeAccount',addId,async(req,res)=>{
    try{
        await AccountModel.findByIdAndUpdate({_id:req.body.userId},{isActive:false})
        res.status(200).send('close account successfully done')
    }
    catch(err){
        res.status(400).send(err)
    }
})

module.exports={
    BankRouter
}



// "name":"Chandra",
// "gender":"mark",
// "email":"mark@gmail.com",
// "address":"streetNo:4 darkhouse",
// "adharNo":"100123569822",
// "panNo":"FDSA3654GT",
// "mobile":9874563210,
// "dob":"17/05/1996",
// "initialBalance":10000
