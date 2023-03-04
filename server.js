// const express = require("express");
// const bodyParser = require("body-parser");
// const mysql = require("mysql");
// const bcrypt = require("bcrypt");
// const form = require("formidable");
// const fs = require("fs");
// const path = require("path");
// const crypto = require("crypto");
// const formidable = require("formidable");
// var session = require("express-session");
// const saltRounds = 10;

const express = require("express");
var session = require("express-session");
const app = express();

//cria seção para o usuário
app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 
app.use(express.static("public"));

const jogoController = require("./controller/jogoController");
const usuarioController = require("./controller/usuarioController");


app.get("/", usuarioController.index); 

app.get("/login", usuarioController.login);
app.post("/login", usuarioController.logar);
app.get("/logout", usuarioController.logout);

app.get("/cadastro", usuarioController.cadastro);
app.post("/cadastro", usuarioController.cadastrar);

app.get("/create", jogoController.create);
app.post("/create", jogoController.store);
app.get("/show", jogoController.show);

app.get("/edit/:id", jogoController.edit);
app.post("/edit/:id", jogoController.update);

app.get("/delete/:id", jogoController.destroy);

app.listen(80, function () {
  console.log("Servidor rodando na porta 80");
});