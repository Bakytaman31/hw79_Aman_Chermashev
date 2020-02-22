const express = require('express');
const cors = require('cors');
const fileDb = require('./app/fileDb');

const app = express();
const port = 8010;

app.use(express.json());
app.use(cors());

app.use('/', fileDb);

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});