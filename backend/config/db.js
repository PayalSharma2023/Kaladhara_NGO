const mongoose = require('mongoose');

const DbConnect = async()=>{
    try{
        const connect = await mongoose.connect(process.env.Db_URI);
        console.log(
            `Database connected: ${connect.connection.host},${connect.connection.name} `
        )
    } catch (err) {
        console.log(err)
    }
    
}

module.exports = DbConnect;