const express = require ("express");
const app = express();
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt =require('express-jwt')

//middleware (every request)//
app.use(express.json())
app.use (morgan('dev'))

//connect to MongoDB//
mongoose.connect(
    'mongodb://localhost:27017/rockthevotedb',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
()  => console.log('Connected to the DB')
)

//error handler//
app.use((err,req,res, next) => {
    console.log(err);
        if (err.name === "Unauthorized Error"){
        res.status(err.status);
    }
    return res.send({errMsg:err.message});
});
app.use('/auth', require('../RTV/router/authRouter'));
app.use('/api', expressJwt ({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/issue', require('../RTV/router/issueRouter'));

//server listen//
app.listen(5000, () => {
    console.log ("The App is listening on port 5000.cd")
});