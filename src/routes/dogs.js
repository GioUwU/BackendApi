const axios = require('axios');
const { Raza, Temperamento } = require('../db');
const { Op } = require('sequelize');

const getDogs = function (req, res) {
  if(req.query.name){
  let name = req.query.name.replace(/\"/g, '')
  //replace "" with ""
  //name = name.replace(/\"/g, '');
  const api = `https://api.thedogapi.com/v1/breeds`;
  var ret = [];
  axios.get(api).then(response => {
    response.data.forEach(e => {
        if(e.name.toLowerCase().includes(name.toLowerCase())){
            ret.push({
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
    Raza.findAll({ include: Temperamento, where: { nombre:{ [Op.iLike]: `%${name}%`  } } }).then(resultado => {
    resultado.forEach(f => {
        let temperamento = '';
        f.temperamentos.forEach(i =>{
            temperamento = temperamento.concat(i.nombre + ', ')
        })
        temperamento = temperamento.slice(0, temperamento.length-2)
        ret.push({
            id: f.id + 264,
            nombre: f.nombre,
            imagen: f.imagen,
            temperamento: temperamento,
            peso: f.peso,
            altura: f.altura,
            vida: f.vida
        })
    })
    return res.json(ret)
    })
    }).catch(error => send.status(500).json({error: "Error al obtener los perros"}))
    }
    else
    axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
        const ret = [];
        response.data.forEach(e => {
            ret.push({
            id: e.id,
            imagen: e.image.url,
            nombre: e.name,
            temperamento: e.temperament,
            peso: e.weight.imperial,
            altura: e.height.imperial,
            vida: e.life_span
            })
        })
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







module.exports = getDogs
  