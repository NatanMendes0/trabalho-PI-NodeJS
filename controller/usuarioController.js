const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const body = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const usuarioModel = require("../model/usuario");

module.exports = {
  index: function (req, res) {
    res.render("index.ejs", { mensagem: "Bem vindo ao nosso site!" });
  },

  login: function (req, res) {
    res.render("usuario/login.ejs", { mensagem: "Faça o login" });
  },

  logar: function (req, res) {
    var email = req.body.email;
    var senha = req.body.senha;
    usuarioModel.busca(email).then((result) => {
      if (result.length > 0) {
        bcrypt.compare(senha, result[0]["senha"], function (err, result) {
          if (result) {
            req.session.loggedin = true;
            req.session.email = email;
            res.redirect("/");
          } else {
            req.session.erro = true;
            req.session.mensagem = "Senha incorreta";
            res.redirect("/login");
          }
        });
      } else {
        req.session.erro = true;
        req.session.mensagem = "Email não cadastrado";
        res.redirect("/");
      }
    });
  },

  logout: function (req, res) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  },

  cadastro: function (req, res) {
    res.render("usuario/cadastro.ejs");
  },

  cadastrar: function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    if (usuarioModel.buscaEmail(email).length > 0) {
      bcrypt.hash(senha, saltRounds, function (err, hash) {
        usuarioModel.insere(nome, email, hash);
        res.redirect("/login");
      });
    } else {
      req.session.erro = true;
      res.redirect("/cadastro", { mensagem: "Email já cadastrado" });
    }
  },
};
