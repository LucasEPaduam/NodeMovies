const express = require('express');

const app =express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded ({ extended: true}));

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));


module.exports = app;
