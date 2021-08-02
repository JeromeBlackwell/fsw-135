const express = require ("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

//middleware (every request)//
app.use(express.json())
app.use (morgan('dev'))

//connect to MongoDB//
mongoose.connect('mongodb://localhost:27017/rockthevotedb',
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
    console.log(res.statusCode);
    if (res.statusCode !== 404) {
        res.status(500);
    }
    return res.send({errMsg:err.message});
});
app.use('/', require('./router/inventoryrouter.js'));

//server listen//
app.listen(5000, () => {
    console.log ("The App is listening on port 5000.cd")
});