const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDb = require('./config/db')
const userRoutes = require('./routes/user')
const mailboxRoutes = require('./routes/mailbox')
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

connectDb();

app.use('/user',userRoutes);
app.use('/mail',mailboxRoutes)


app.listen(3007,()=>{
    console.log('server is running on port 5000')
})