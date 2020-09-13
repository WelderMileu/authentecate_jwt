const { request, response } = require('express');
const jwt = require('jsonwebtoken');

class Auth {
    // Rota de authenticação de usuario
    authenticate(request, response) {
        // informações repassada para gerar nosso token
        const info = {
            PRIVATE_KEY : '123344',
            exp : "30s",
            data : "boofer"
        }

        // Gerando o nosso token do autenthicação
        const sign = jwt.sign({
            data: info.data
        }, info.PRIVATE_KEY , { expiresIn: info.exp });

        console.log(sign)
        response.json({ "token": sign })
    }

}

module.exports = Auth;
