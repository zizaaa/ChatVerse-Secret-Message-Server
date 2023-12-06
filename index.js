const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const secretMessageRoute = require('./routes/secretMessageRoutes')

const app = express();

//middleware
app.use(express.json());
app.use(cors())

//routes
app.use(secretMessageRoute)

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_CONNECT_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Node API App is running on port ${PORT}`);
    })
}).catch((err)=>{
    console.log(err) 
})