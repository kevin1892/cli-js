const {connect,connection} = require('mongoose');
const connectDB =async () =>{
    await connect('mongodb://localhost:27017/raw_materials');
    //console.log('Mongodb Connected');
}

connection.on('error', err =>console.log(err))
module.exports={
    connectDB,
    connection
}