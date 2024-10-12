require('dotenv').config();
const mongoose = require('mongoose');

const DbURI = process.env.DB_URI

const Connection = mongoose.connect(DbURI)
    .then(()=>{
        console.log(`connected to database`)
    })
    .catch((err) => {
        console.log(err)
    })


module.exports = Connection;