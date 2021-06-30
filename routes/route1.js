const express = require('express')
const router = new express.Router()
const controller = require('../controllers/mymethods')


router.get('/register' , controller.register)
router.post('/register' , controller.registerView)
router.get('/myacount' , controller.login)
router.post('/myacount' , controller.loginView)
router.get('/alldata', controller.showAll)
router.get('/myacount/:id' , controller.singleData)
router.get('/delete/:id' , controller.deleteUser)
router.get('/edit/:id' , controller.editData)
router.post('/edit/:id' , controller.showUpdate)



module.exports = router
