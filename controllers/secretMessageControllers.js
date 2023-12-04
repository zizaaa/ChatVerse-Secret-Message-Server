const SecretMessage = require('../models/secretMessageModel');
const jwt = require('jsonwebtoken');

const deleteMessage = async(req,res)=>{
    console.log(req.body)
    try {
        const secretMessage = await SecretMessage.findById({_id:req.body.id})

            if(!secretMessage){
                return res.status(404).json('Secret Message not found!')
            }

            secretMessage.messages = secretMessage.messages.filter(data => data.messageID !== req.body.toDeleteID);

            await secretMessage.save();

            return res.status(200).json('Message deleted')
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const postSecretMessage = async(req,res)=>{
    try {
        const secretMessage = await SecretMessage.findById({_id:req.body.id})

            if(!secretMessage){
                return res.status(404).json('Secret Message not found!')
            }

            if(req.body.message.length <= 0){
                return res.status(400).json('Please Enter a message!')
            }
        
        secretMessage.messages.push({message:req.body.message,messageID:req.body.messageID})
        await secretMessage.save();

        return res.status(200).json('Message sent success!')

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getMessage = async(req,res)=>{
    try {
        console.log(req.query)
        const id = req.query.id;
        const from = req.query.from
        const to = req.query.to
        
        const secretMessage = await SecretMessage.findById(id);

            if(!secretMessage){
                return res.status(404).json('No secret message found!');
            }

        let limitedMessage = secretMessage.messages.slice(from, to);
        
        return res.status(200).json({data:limitedMessage,dataLength:secretMessage.messages.length})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const createSecretMessage = async (req, res) => {
    try {
        const secretMessage = await SecretMessage.create(req.body);

        // Generate the JWT token for admin users only
        const payload = {
            secretMessage: {
                id: secretMessage._id,
            },
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '9999 years',
        });

        res.status(200).json({ secretMessageId: secretMessage._id, accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { deleteMessage,postSecretMessage,createSecretMessage,getMessage }