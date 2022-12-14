const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const eventSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    },
    artist:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    typeEvent:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Event',eventSchema)