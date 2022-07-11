const axios = require('axios');
const { Raza, Temperamento, RazaTemperamento } = require('../db');
const { Op } = require('sequelize');


const postDog = function (req, res) {
    const { nombre, altura, peso, vida, temperamento} = req.body;
    var { imagen } = req.body;
    const api = 'https://api.thedogapi.com/v1/breeds';
    //verify if the dog is already in the databasem
    Raza.findAll({
        where: {
            nombre: nombre
        }
    }).then(function (result) {
        if (result.length > 0) {
            res.status(400).json({
                error: 'El perro ya existe'
            });
        } else {
            //get the breed from the api
            axios.get(api).then(function (response) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == nombre) {
                        ret = data[i];
                    }
                }
                //create the dog in the database
                if(imagen == '') imagen = 'https://i.pinimg.com/originals/db/e6/b9/dbe6b90d0fd0d209001cb64eefd038d7.gif';
                Raza.create({
                    nombre: nombre,
                    altura: altura,
                    peso: peso,
                    vida: vida,
                    imagen: imagen
                }).then(function (result) {
                    //create the temperamento in the database
                    Temperamento.create({
                        id: result.id ,
                        nombre: temperamento
                    }).then(function (result) {
                        //create the raza-temperamento in the database
                        RazaTemperamento.create({
                            razaId: result.id ,
                            temperamentoId: result.id
                        }).then(function (result) {
                            res.status(200).json({
                                message: 'Perro creado'
                            });
                        });
                    });
                });
            });
        }}
    ).catch(function (err) {
        res.status(500).json({
            message: 'Error al obtener el perro'
        });
    }

    );
}

module.exports = postDog;

/*
{
    "nombre": "Affenpinscher",
    "altura": "1.05",
    "peso": "75",
    "años_vida": "10",
    "image": "https://images.dog.ceo/breeds/labrador/n02099601_1005.jpg",
}
*/


/*
Raza.findAll({
        where: {
            nombre: nombre
        }
    }).then(function (result) {
        if (result.length == 0) {
            //if the dog is not in the database, we get the data from the api
            axios.get(api).then(function (response) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == nombre) {
                        ret = data[i];
                        break;
                    }
                }
                //if the dog is in the api, we save it in the database
                if (ret.length != 0) {
                    Raza.create({
                        nombre: ret.name,
                        altura: altura,
                        peso: peso,
                        años_vida: años_vida,
                        image: image
                    }).then(function (result) {
                        res.status(200).json({
                            message: 'Raza creada correctamente',
                            data: result
                        });
                    }
                    ).catch(function (error) {
                        res.status(500).json({
                            message: 'Error al crear la raza',
                            data: error
                        });
                    }
                    );
                }
                //if the dog is not in the api, crate it in the database
                else {
                    Raza.create({
                        nombre: nombre,
                        altura: altura,
                        peso: peso,
                        años_vida: años_vida,
                        image: image
                    }).then(function (result) {
                        res.status(200).json({
                            message: 'Raza creada correctamente',
                            data: result
                        });
                    }
                    ).catch(function (error) {
                        res.status(500).json({
                            message: 'Error al crear la raza',
                            data: error
                        });
                    }
                    );
                }
            }
            ).catch(function (error) {
                res.status(500).json({
                    message: 'Error al crear la raza',
                    data: error
                });
            }
            );
        }
        //if the dog is in the database, we send it to the client
        else {
            res.status(200).json({
                message: 'Raza ya existe',
                data: result
            });
        }
    }
    ).catch(function (error) {
        res.status(500).json({
            message: 'Error al crear la raza',
            data: error
        });
    }
    );
    */

    /*
    const postDog = function (req, res) {
    const { nombre, altura, peso, vida, imagen, temperamento} = req.body;
    const api = 'https://api.thedogapi.com/v1/breeds';
    //verify if the dog is already in the databasem
    Raza.findAll({
        where: {
            nombre: nombre
        }
    }).then(function (result) {
        if (result.length > 0) {
            res.status(400).json({
                message: 'El perro ya existe'
            });
        } else {
            //get the breed from the api
            axios.get(api).then(function (response) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == nombre) {
                        ret = data[i];
                    }
                }
                //create the dog in the database
                Raza.create({
                    nombre: nombre,
                    altura: altura,
                    peso: peso,
                    vida: vida,
                    imagen: imagen
                }).then(function (result) {
                    //create the temperamento in the database
                    Temperamento.create({
                        id: result.id ,
                        nombre: temperamento
                    }).then(function (result) {
                        //create the raza-temperamento in the database
                        RazaTemperamento.create({
                            razaId: result.id ,
                            temperamentoId: result.id
                        }).then(function (result) {
                            res.status(200).json({
                                message: 'Perro creado'
                            });
                        });
                    });
                });
            });
        }}
    ).catch(function (err) {
        res.status(500).json({
            message: 'Error al obtener el perro'
        });
    }

    );
} */