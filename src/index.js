const express = require('express');
const { PORT } = require('./data/constants');

const app = express();

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server started in port: ${PORT}`);
});