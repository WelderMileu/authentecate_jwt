const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const dados = require('../api/data');

const info = [];

const config = {
    SECRET_KEY: "1244566"
}

class Auth {

    authenticate(request, response) {
        const { user_name, user_email } = request.body;

        const data = dados.map(item => {
            if (user_name === item.name && user_email === item.email) {
                
                const { id, name, email } = item;

                info.push({ id, name, email });
                
                response.status(200).json({
                    user: {
                        name: item.name,
                        email: item.email
                    }
                })

                const token = jwt.sign({ id, name, email },
                    config.SECRET_KEY,
                    {
                        subject: id.toString()
                        , expiresIn: "60s"
                    })

                response.status(200).json({
                    users: { id, name, email },
                    auth: true,
                    token,
                    message: "Authenticate"
                })

            } else {
                response.status(401).json({
                    auth: false,
                    token: "",
                    message: "Usuario ou email incorretos"
                })
            }
        });
    }

    verificaAcesso(request, response, next) {
        const authoHeader = request.headers.authorization;

        if (!authoHeader) {
            return response.status(401).json({ error: "token não encontrado" })
        }

        const [, token ] = authoHeader.split(" ");

        try {

            const decoded = jwt.verify(token, config.SECRET_KEY);
            const { sub } = decoded;
            request.user = { id: sub };
            return next();

        } catch (err) {
            response.status(400).json({ erro: err.message, info })
        }
    }
}

module.exports = Auth;
