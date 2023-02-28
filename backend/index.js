
const exprees = require('express');
const bodyParser = require('body-parser');
const expenseModel = require('./expenseTraker');
const mongoDb = require('./services/databaseService');
const async = require('async')
const app = exprees();
const cors = require('cors');
const mongoose= require('mongoose');
const port = 4000;

const corsOptions ={
   origin: true,
   credentials:true,
   optionSuccessStatus:200
 }
 app.use(cors(corsOptions));
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(exprees.json())

mongoDb.start()

app.get('/getExpense',(req,res) =>
{
   async.auto({
   totExp: function (cb) {
    
      expenseModel.find({isDeleted:false}).exec(function (err, totExp) {
        if (err) {
          return cb("Unable to fetch notes.");
        }
        console.log(totExp);
        return cb(null, totExp);
      });
    }}, 

   function(err, results){
      console.log("results: ",results);
      if(err){
         console.log("unable to get the data");
         return res.status(403).json({ error: err });        
      }
       return res.json({ results: results.totExp });

   }, );
   
});

app.post('/addExpense', async(req, res) =>{
   // const data =  new expenseModel(req.body);
   const data =  new expenseModel({
      name: req.body.name,
      amount:  req.body.amount,
      isDeleted: false
   });
   const result = await data.save();
   res.send('Expense Added');
});

app.post('/removeExpense', async(req,res)=>{

   var id = {_id:req.body.id}
   var setval ={$set:{isDeleted:true}}
   expenseModel.updateOne(id,setval, function(err, results)
   {
      if(err)
      res.send({"data":err,"success":false})
    
      console.log("Successfully Removed Expense")
      console.log(results);
      res.send({"data":results,"success":true})

   })
})

app.listen(port,() => {
   console.log(`Your app is running at: ${port}`);
});