const dbConnection = require('../db/database')
const {ObjectID} = require('mongodb')
const register = (req,res)=>{
    res.render('welcome')
}
const registerView = (req,res)=>{
    data = req.body
    dbConnection(db=>{
        if(!db) return console.log('error in insert')
        db.collection('user').insertOne(data , (er,result)=>{
            if(er) console.log(er)
            else console.log(result)
        })
    })
    
}

const showAll = (req,res)=>{
    dbConnection(db=>{
        if(!db) return console.log('data base error')
        db.collection('user').find().toArray((er , result)=>{
            if(er) console.log(er)
            else res.render('alldata' , {result})
        })
    })
}

const login = (req,res)=>{
    res.render('login')
}

const loginView = (req,res)=>{
    let data = req.body
    //console.log(data)
    dbConnection(db=>{
        
        if(!db) return console.log('database error')
        db.collection('user').findOne({ firstName:data.firstName , password:data.password } , (er , result)=>{
            if(result == null) res.send('empty data')
            else console.log(result) 
            res.render('myacount', {result})
        })
        //res.redirect('/')
    })
}

const singleData = (req,res)=>{
    let id = req.params.id
    dbConnection(db=>{
        //if(!db) return console.log('data base error')
        db.collection('user').findOne({_id:new ObjectID(id)} , (er ,privateData)=>{
            if(privateData == null) res.send('empty data')
            else res.render( 'myacount', {privateData}) 
            
        })
    })
    
}

const deleteUser = (req,res)=>{
    let id = req.params.id
    dbConnection(db=>{
        //if(!db) return console.log('data base error')
        db.collection('user').deleteOne({_id:new ObjectID(id)} , (er ,privateData)=>{
            if(privateData == null) res.send('empty data')
            else res.render( 'myacount') //tr.render('myacount' , {privateData})
            //res.send('helllo')
             //res.render('myacount' , {privateData})
        })
        res.redirect('/register')
    })

}

const editData = (req,res)=>{//findAndModify
    let id = req.params.id
    dbConnection(db=>{
        if(!db) return console.log('data base error')
        db.collection('user').findOne({_id:new ObjectID(id)} , (er , newData)=>{
            console.log(newData)
            res.render('edit' , {newData})
        })

    })
    //res.render(`showSingleData ${req.params.id}`)
}

const showUpdate =(req,res)=>{
    let id = req.params.id
    dataUpdate = req.body
    //console.log(dataUpdate)
        dbConnection(db=>{
            db.collection('user').updateOne(
                {_id:new ObjectID(id)},
                {$set:{firstName:dataUpdate.firstName , lastName:dataUpdate.lastName , address:dataUpdate.address , password:dataUpdate.password  }})
                .then(user=>{res.redirect('/alldata')})
                .catch(e=>{console.log(e)})
        })
    }






module.exports = {   register, singleData, editData , registerView , showAll , deleteUser,showUpdate,login,loginView
}