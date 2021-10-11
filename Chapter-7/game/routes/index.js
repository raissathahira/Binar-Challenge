var express = require('express');
const {body, validationResult } = require('express-validator');
var router = express.Router();
const {user_game, user_game_biodata,user_game_history } = require('./../models');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', async (req, res) => {
  const user = await user_game.findAll({
    include : [{model: user_game_biodata, as: 'user_biodata'}]
  })
  res.render('listUser', {user});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

module.exports = router;
