const mongoose=require("mongoose")

const AcSchema=mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId},
    amount:{type:Number,require:true},
    total:{type:Number,default:0},
    type:{type:String,default:"credit"},
},
{ timestamps: true }
)

const AcRecordModel=mongoose.model("accountRecord",AcSchema)

module.exports={
    AcRecordModel
}
