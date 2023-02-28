require('dotenv').config()
const mongoose= require('mongoose');
const uri = `mongodb+srv://Ruhi:${process.env.DB_PASSWORD}@cluster0.fmgaspp.mongodb.net/expenseTraker`
const start = ()=>
{
    mongoose.connect(uri);
    mongoose.connection.on("error",()=>{
        console.log("Error connecting db")
    })

    mongoose.connection.once("db_connected",()=>
    {
        console.log("Database connected")
    })
}
module.exports={start}