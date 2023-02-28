const mongoose = require('mongoose');
const expensetraker = new mongoose.Schema ({
        name:{type:String},
        amount:{type:Number},
        isDeleted:{type:Boolean}
    },
);
module.exports  = mongoose.model('totalExpense',expensetraker);