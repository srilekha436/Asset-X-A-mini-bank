const express=require("express")
const {connection} =require("./Configs/db")
require("dotenv").config()
const cors=require("cors")
const {BankRouter}=require("./Routers/bankRouter")


const app=express()

app.use(cors())

app.use(express.json())

app.use(BankRouter)
app.get('/',(req,res)=>{
    try{
        res.status(200).send("Masai Bank Home Page")
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")

    }
    catch(err){
        console.log(err.message)
    }
    console.log(`server is listening on port http://localhost:${process.env.port}`)
})
