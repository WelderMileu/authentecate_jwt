const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route)

app.listen(PORT, () => console.log(`ruanning and port ${PORT}`))
