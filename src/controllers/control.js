const { request, response } = require('express');
const data = require('../api/data') // Nossa api fake

class Control {
    Index(request, response) {
        response.send('Home')
    }

    ListData(request, response) {
        console.log(data)
        response.json({ data })
    }
}

module.exports = Control;
