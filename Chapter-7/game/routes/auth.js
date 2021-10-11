var express = require('express')
var router = express.Router()
var authController = require('../controllers/authController')
const authValidator = require('../middleware/authValidator')

router.get('/login', authController.renderLoginPage)

router.get('/login', authController.renderRegisterPage)

router.post('/register', authValidator.loginValidator, authController.createUser)

router('/login', authValidator.loginValidator, authController.postLogin)

router.post('/register-admin', authController.createAdmin)

router.get('/login1', authController.renderLoginPage)

router.post('/login1', authValidator.loginValidator, authController.postLogin)

modeule.exports = router