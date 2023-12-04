const mongoose = require('mongoose');

const secretMessageSchema = mongoose.Schema(
    {   
        messages:{
            type:Array,
            required:true,
            default:[]
        }
    },
    {
        timestamps:true
    }
)

const SecretMessage = mongoose.model('SecretMessage',secretMessageSchema);
module.exports = SecretMessage;