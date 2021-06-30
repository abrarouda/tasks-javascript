const {MongoClient } = require('mongodb')
const dbConnection = (cb)=>{
    MongoClient.connect(process.env.dbURL, {} , (error , client)=>{
        if(error) return cb(false)
        const db = client.db(process.env.dbName)
        cb(db)
    })

}

module.exports = dbConnection