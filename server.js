const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db')
const userRoute = require('./routes/user')
//const formData = require('express-form-data')
//const cors = require('cors')

require('dotenv').config();
require('colors');

connectDB();

const app = express();
//app.use(cors())

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true}));
//app.use(formData.parse());


app.use('/api/users', userRoute);

app.get('*', function(req,res){    
    console.log('Endpoint does not exist');
    res.status(404).send('Endpoint does not exist');    
});

const PORT = process.env.PORT || 8888;

app.listen(
    PORT,
    console.log(`Server is connected in ${process.env.NODE_ENV} mode on port ${PORT}`.red)
)