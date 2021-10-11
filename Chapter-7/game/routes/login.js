var express = require('express');
const { get } = require('.');
const {user_game} = require('../models');
const { body, validationResult } = require('express-validator');
var router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', function(req, res){
    res.render('login');
})

router.post(
    '/',
    body('username').notEmpty().withMessage('Username tidak boleh kosong'),
    body('password').notEmpty().withMessage('Password tidak boleh kosong'),
    async (req, res) => {
      const errors = validationResult(req);
      const cek = localStorage.getItem('loginDatabase');
      if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
      }
      const checkPassword = await user_game.findOne({where: {
          username: req.body.username
      }})

      bcrypt.compare(req.body.password, checkPassword.password).then(result => {
        if(result && cek == null){
            localStorage.setItem('loginDatabase', 'Access')
            return res.status(200).json({message: 'berhasil'})
        }
        else if(result && cek == 'Access'){
            return res.status(200).json({message: 'berhasil'})
        }
        else{
            return res.status(401).json({message: 'Username atau password yang anda masukkan salah'})
        }
      }).catch(err => console.error(err.message));
});

module.exports = router;
