var express = require('express');
var router = express.Router();


let datausers = [
  {
    "username": 'raissa',
    "password": 'admin' 
  },
  {
    "username": 'vito',
    "password": 'admin'
  }
]


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    'status' : 200,
    'message': 'Berhasil Get Data Users',
    'data' : datausers
  })
});


module.exports = router;
