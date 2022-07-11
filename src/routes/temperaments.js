const axios = require("axios").default;
const { Raza, Temperamento } = require('../db');


const temperament = function(req, res) {
    var ret = [];
    // get temperamentos from the api and database 
    axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
            ret.push({
                id: data[i].id,
                nombre: data[i].name,
            });
        }
        // get temperamentos from the database
        Raza.findAll({ include: Temperamento }).then(resultado => {
            resultado.forEach(f => {
                let temperamento = '';
                f.temperamentos.forEach(i =>{
                    temperamento = temperamento.concat(i.nombre + ', ') 
                }
                )
                temperamento = temperamento.slice(0, temperamento.length-2)
                //console.log(temperamento)
               //console.log(f.id + 264)
                ret.push({
                    id: f.id + 264,
                    nombre: f.nombre,
                    imagen: f.imagen,
                    temperamento: temperamento,
                    peso: f.peso,
                    altura: f.altura,
                    vida: f.vida
                })
            }
            )
            return res.json(ret)
        }
        )
    }
    ).catch(error => send.status(500).json({error: "Error al obtener los perros"}))
}


     


module.exports = temperament;



/*
 axios.get("https://api.thedogapi.com/v1/breeds").then(response => {
        response.data.forEach(element => {
            Temperamento.create({
                nombre: element.temperament
            })
        })
    }).catch(error => {
        console.log(error)
    }
    )
    res.send("Temperamentos creados")
*/


/*
//return all temperaments in the database
    Temperamento.findAll({
        attributes: ['id', 'nombre'],
        order: [
            ['id', 'ASC']
        ]
    }).then(function(temperamentos) {
        res.json(temperamentos);
    }
    ).catch(function(err) {
        res.status(500).json({ error: err });
    }
    );
*/