const axios = require('axios');
const { Raza, Temperamento } = require('../db');
const { Op } = require('sequelize');

const dogId = function (req, res) {
    const id = req.params.id;
    const api = `https://api.thedogapi.com/v1/breeds`;
    if( id <265 )
    axios.get(api).then(response => {
        response.data.forEach(e => {
            if(e.id == id){
                res.json({
                    id: e.id,
                    imagen: e.image.url,
                    nombre: e.name,
                    temperamento: e.temperament,
                    peso: e.weight.imperial,
                    altura: e.height.imperial,
                    vida: e.life_span
                })
            }
        })
    }).catch(error => console.log(error))
    else {
        Raza.findAll({ include: Temperamento, where: { id: id - 264 } }).then(resultado => {
            resultado.forEach(f => {
                let temperamento = '';
                f.temperamentos.forEach(i =>{
                    temperamento = temperamento.concat(i.nombre + ', ')
                })
                temperamento = temperamento.slice(0, temperamento.length-2)
                res.json({
                    id: f.id + 264,
                    nombre: f.nombre,
                    imagen: f.imagen,
                    temperamento: temperamento,
                    peso: f.peso,
                    altura: f.altura,
                    vida: f.vida,
                })
            })
        }).catch(error => console.log(error))
    }
}




module.exports = dogId;



/*
    const id = req.params.id;
    const api = `https://api.thedogapi.com/v1/breeds`;
    if( id <265 )
    axios.get(api).then(response => {
        response.data.forEach(e => {
            if(e.id == id){
                res.json({
                    id: e.id,
                    imagen: e.image.url,
                    nombre: e.name,
                    temperamento: e.temperament,
                    peso: e.weight.imperial,
                    altura: e.height.imperial,
                    vida: e.life_span
                })
            }
        })
    }).catch(error => console.log(error))
    else {
        Raza.findAll({ include: Temperamento, where: { id: id - 264 } }).then(resultado => {
            resultado.forEach(f => {
                let temperamento = '';
                f.temperamentos.forEach(i =>{
                    temperamento = temperamento.concat(i.nombre + ', ')
                })
                temperamento = temperamento.slice(0, temperamento.length-2)
                res.json({
                    id: f.id + 264,
                    nombre: f.nombre,
                    imagen: f.imagen,
                    temperamento: temperamento,
                    peso: f.peso,
                    altura: f.altura,
                    vida: f.vida
                })
            })
        }).catch(error => console.log(error))
    }
}
*/