var express = require('express');
const {body, validationResult } = require('express-validator');
var router = express.Router();
const {user_game, user_game_biodata,user_game_history } = require('./../models');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

/* GET users listing. */



router.post('/', 
    body('username').notEmpty().withMessage('username tidak boleh kosong'),
    body('email').isEmail().withMessage('tidak sesuai format email'),
    body('password').notEmpty().withMessage('password tidak boleh kosong').isLength({ min: 8 }).withMessage('minimal 8 karakter'),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }  

        const data = await user_game.findOne({ where: { username: req.body.username } });

        if(data) {
          return res.status(400).json({message: 'username sudah ada'})
        }

        let suggestRandom = []
        for(let i = 0; i < 3; i++){
          let randomAngka = Math.floor(Math.random() * 3)
          suggestRandom.push(req.body.username + randomAngka.toString())
        }

        bcrypt.hash(req.body.password, 10, function(err, hash) {
          // Store hash in your password DB.
    
            user_game.create({
              username: req.body.username,
              password: hash,
              email: req.body.email,
              generate_random: suggestRandom[0]
            })
              .then(result => {
                user_game_biodata.create({
                alamat: req.body.alamat,
                notelp: req.body.notelp,
                nama: req.body.nama,
                tanggal_lahir: req.body.tanggal_lahir,
                id_user_game : result.id
                })
                return res.status(201).json({code: 201, message: 'berhasil menambkan data'})
            })
        });
  
  },
);

router.delete("/:id", async (req, res) =>  {
  const deleteUser = await user_game.destroy({where : {id: req.params.id}});
  if(!deleteUser){
    return res.status(400).json({message: 'Data user yang akan dihapus tidak ada'});
  }

  user_game_biodata.destroy({where : {user_game_id: req.params.id}});
  return res.status(201).json({code: 201, message: 'Data telah berhasil dihapus'});
})

module.exports = router;
