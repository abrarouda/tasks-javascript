const express = require('express')
const path = require('path')
const hbs = require('hbs')
//const validator = require('validator')
//const fs = require('fs')
const session = require('express-session')
const router = require('../routes/route1')

 app = express()
app.set('view engine' , 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname , '../myhbs/views'))
hbs.registerPartials(path.join(__dirname , '../myhbs/layouts'))
app.use(express.urlencoded())
app.use(session({secret:'hello'}))

app.use(router)

 

module.exports = app