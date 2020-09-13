const route = require('express').Router()
const Control = require('../controllers/control')
const Auth = require('../controllers/auth')

const Data = new Control(); // Controller de rotas normal
const Sign = new Auth(); // Controller de authenticação

route.get('/', Data.Index) // Rota Inicial
route.get('/list', Data.ListData) // Rota de listagem de usuarios
route.get('/auth', Sign.authenticate) // Rota de autenticação

// Exportando nossa route.
module.exports = route;
