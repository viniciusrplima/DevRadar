const express = require("express");
const mongoose = require("mongoose");
const http = require('http');
const cors = require("cors");

const routes = require("./routes");
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect("mongodb+srv://<username>:<password>@cluster0-295c9.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos http: get, post, put, delete

// Tipos de parâmetros

// Query params: request.query (Filtros, ordenação, paginação, ...)
// Route params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)

server.listen(5501);

