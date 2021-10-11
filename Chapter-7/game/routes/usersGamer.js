var express = require('express');
const {body, validationResult } = require('express-validator');
var router = express.Router();
const {user_game, user_game_biodata,user_game_history } = require('./../models');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
/* GET users listing. */




router.get("/", async (req, res) =>  {
  const getUser = await user_game.findAll({
      include:[{model:user_game_biodata, as: 'user_biodata'},
      {model:user_game_history, as: 'user_history'}]
  });

  if(getUser) {
    res.status(200).json({
      status: 200,
      msg: "berhasil",
      data: getUser
    });
  } else{
    res.status(400).json ({
      status: 400,
      msg : "data tidak ditemukan"
    })
  }

})

router.get("/game-history", async (req, res) =>  {
  const getHistory = await user_game_history.findAll({
    include: [{model:user_game, as: "user_history"}]
  });

  if(getHistory) {
    res.status(200).json({
      status: 200,
      msg: "berhasil",
      data: getHistory
    });
  } else{
    res.status(400).json ({
      status: 400,
      msg : "data tidak ditemukan"
    })
  }

})

router.get("/:id/game-history/", async (req, res) =>  {
  const id = req.params.id;
  const getHistory = await user_game_history.findAll({
    include: [{model:user_game, as: "user_history"}],
    where:{
      id_user_game: id,
    },
  });

  if(getHistory) {
    res.status(200).json({
      status: 200,
      msg: "berhasil",
      data: getHistory
    });
  } else{
    res.status(400).json ({
      status: 400,
      msg : "data tidak ditemukan"
    })
  }

})

router.delete("/:id/game-history", async (req, res) =>  {
  const id = req.params.id;
  const deleteUser= await user_game_history.destroy({
    where: {
      id_user_game: id,
    }
  });

  const getUser = await user_game.findAll();

  if(deleteUser) {
    res.status(200).json({
      status: 200,
      msg: "berhasil",
      data: getUser
    });
  } else{
    res.status(400).json ({
      status: 400,
      msg : "data tidak ditemukan"
    })
  }

})

router.post('/:id/game-history', 
    body('poin').notEmpty().withMessage('poin tidak boleh kosong'),
    body('total_play').notEmpty().withMessage('total bermain tidak boleh kosong'),
    async (req, res) => {
        const id = req.params.id;

        user_game_history.create({
          poin: req.body.poin,
          total_play: req.body.total_play,
          id_user_game : id
        })
        .then(result => {
          return res.status(201).json({code: 201, message: 'berhasil menambkan data'})
      })
        }

);



router.get("/users-biodata", async (req, res) =>  {
  const getBiodata = await user_game_biodata.findAll({
    include: [{model:user_game, as: "user_biodata"}]
  });

  if(getBiodata) {
    res.status(200).json({
      status: 200,
      msg: "berhasil",
      data: getBiodata
    });
  } else{
    res.status(400).json ({
      status: 400,
      msg : "data tidak ditemukan"
    })
  }

})

router.get("/:id/users-biodata/", async (req, res) =>  {
  const id = req.params.id;
  const getBio = await user_game_history.findAll({
    include: [{model:user_game, as: "user_biodata"}],
    where:{
      id_user_game: id,
    },
  });

  if(getBio) {
    res.status(200).json({
      status: 200,
      msg: "berhasil",
      data: getHistory
    });
  } else{
    res.status(400).json ({
      status: 400,
      msg : "data tidak ditemukan"
    })
  }

})

router.delete("/:id/user-biodata", async (req, res) =>  {
  const id = req.params.id;
  const deleteUser= await user_game_biodata.destroy({
    where: {
      id_user_game: id,
    }
  });

  const getUser = await user_game.findAll();

  if(deleteUser) {
    res.status(200).json({
      status: 200,
      msg: "berhasil",
    });
  } else{
    res.status(400).json ({
      status: 400,
      msg : "data tidak ditemukan"
    })
  }

})

router.post('/:id/user-biodata', 
    body('alamat').notEmpty().withMessage('alamat tidak boleh kosong'),
    body('notelp').notEmpty().withMessage('nomor telpon tidak boleh kosong'),
    body('nama').notEmpty().withMessage('nama tidak boleh kosong'),
    body('tanggal_lahir').isDate().withMessage('tanggal lahirtidak boleh kosong'),
    async (req, res) => {
        const id = req.params.id;

        user_game_history.create({
          alamat: req.body.alamat,
          notelp: req.body.notelp,
          nama: req.body.nama,
          tanggal_lahir: req.body.tanggal_lahir,
          id_user_game : id
        })
        .then(result => {
          return res.status(201).json({code: 201, message: 'berhasil menambkan data'})
      })
        }

);
module.exports = router;

