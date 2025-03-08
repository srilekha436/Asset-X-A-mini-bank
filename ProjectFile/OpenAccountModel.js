const mongoose=require("mongoose")

const OpSchema=mongoose.Schema({
    name:{type:String,require:true},
    gender:{type:String,require:true},
    email:{type:String,require:true},
    address:{type:String,require:true},
    adharNo:{type:Number,require:true},
    panNo:{type:String,require:true},
    mobile:{type:Number,require:true},
    dob:{type:String,require:true},
    initialBalance:{type:Number,require:true},
    total:{type:Number,require:true},
    isActive:{
        type:Boolean,
        default:true
    }, 
},
{ timestamps: true }
)

const AccountModel=mongoose.model("account",OpSchema)

module.exports={
    AccountModel
}
