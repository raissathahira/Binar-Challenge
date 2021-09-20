var express = require('express');
const {user_game, user_game_biodata, user_game_history} = require('./../models');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('./../models');

router.post(
    '/',
    body('username').notEmpty().withMessage('username tidak boleh kosong'),
    body('email').isEmail().withMessage('tidak sesuai format email'),
    body('password').notEmpty().withMessage('password tidak boleh kosong').isLength({ min: 8 }).withMessage('minimal 8 karakter'),
    async (req, res) => {
        console.log(req)
        const errors = validationResult(req);
        console.log(errors.array())
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

   
    bcrypt.hash(req.body.password, 10, function(err, hash) {

      user_game.create({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          generate_random: suggestRandom[0]
        })
          .then(result => {
            return res.status(201).json({code: 201, message: 'berhasil menambkan data'})
        })
    });
  },
);

router.post(
    '/users-bio',
    body('alamat').notEmpty().withMessage('alamat tidak boleh kosong'),
    body('nama').notEmpty().withMessage('nama tidak boleh kosong'),
    body('notelp').notEmpty().withMessage('nomor telepon tidak boleh kosong'),
    body('tanggal_lahir').notEmpty().withMessage('tanggal lahir tidak boleh kosong'),
    async (req, res) => {
        console.log(req)
        const errors = validationResult(req);
        console.log(errors.array())
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

      user_game_biodata.create({
          alamat: req.body.alamat,
          nama:req.body.nama,
          notelp:req.body.notelp,
          tanggal_lahir: req.body.tanggal_lahir,
        })
          .then(result => {
            return res.status(201).json({code: 201, message: 'berhasil menambkan data'})
        })
  },
);

///
//router.get("/", async (req, res) => {
//    const getUser = await db.querydb.query('SELECT * FROM user_games ORDER BY id ASC');
//    if(getUser){
//        res.status(200).json({
//            status: 200,
///            msg: "berhasil get data user",
//         data: getUser,
 //       });
//    }
//})
///~
module.exports = router;
