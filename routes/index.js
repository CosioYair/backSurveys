var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NOM-35' });
});

router.get('/json', (req, res, next) => {
  res.json('{id:1, nombre: prueba}');
});

router.post('/json', (req, res, next) => {
  res.json('{id:1, nombre: pruebaPost}');
  // api/user
  //nuevo id, e inserta los datos
});

// router.put('/json'){
//   // api/user/1
//   // usuario con id 1 si existe se actualiza su informacion
//   // si no existe se crea
// }

// router.delete('/json'){

// }

module.exports = router;
