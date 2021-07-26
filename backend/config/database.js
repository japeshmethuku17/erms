const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase


// const mongoose = require('mongoose');

// //var uri = process.env.DB_LOCAL_URI || 'mongodb://localhost:27017/erms';

// const connectDatabase = () => {
//     mongoose.connect(process.env.DB_LOCAL_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     }).then(con => {
//         console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
//     })
// }

// module.exports = connectDatabase