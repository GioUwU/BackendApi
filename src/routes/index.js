const { Router } = require('express');
// Importar todos los routers:
const router = Router();
const dogs = require('./dogs');
const dogId = require('./dogId');
const temperament = require('./temperaments');
const postDog = require('./postDog');



// Configurar los routers:


router.get("/dogs", dogs)
router.get("/dogs/:id", dogId)
router.get("/temperaments", temperament)
router.post("/dogs", postDog)


module.exports = router;
