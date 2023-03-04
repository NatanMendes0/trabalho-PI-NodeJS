const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
var formidable = require("formidable");
const jogoModel = require("../model/jogo");

module.exports = {
  create: function (req, res) {
    jogoModel
      .buscaCategoria()
      .then((result) => {
        res.render("jogo/create.ejs", { categorias: result });
      })
      .catch((err) => console.error(err));
  },

  store: function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      var oldpath = files.imagem.filepath;
      var hash = crypto
        .createHash("md5")
        .update(Date.now().toString())
        .digest("hex");
      var nomeimg = hash + "." + files.imagem.mimetype.split("/")[1];
      var newpath = path.join(__dirname, "../public/upload/", nomeimg);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        console.log("Arquivo movido com sucesso");
      });
      var sql =
        "INSERT INTO jogos (titulo, descricao, preco, arquivo, categoria_id) VALUES ?";
      var values = [
        [fields["titulo"],
        fields["descricao"],
        fields["preco"],
        nomeimg,
        fields["categoria_id"]],
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Numero de registros inseridos: " + result.affectedRows);
      });
      res.redirect("/");
    });
  },

  edit: function (req, res) {
    if (req.session.loggedin) {
      var id = req.params.id;
      var sql = "SELECT * FROM jogos WHERE id = ?";
      con.query(sql, [id], function (err, result) {
        if (err) throw err;
        res.render("jogo/edit.ejs", { jogo: result[0] });
      });
    } else {
      req.session.erro = true;
      req.session.mensagem = "Você precisa estar logado para editar um jogo";
      res.redirect("/login");
    }
  },

  destroy: function (req, res) {
    var id = req.params.id;
    jogo
      .busca(id)
      .then((result) => {
        var img = path.join(
          __dirname,
          "../public/upload/",
          result[0]["imagem"]
        );
        fs.unlink(img, (err) => {});
      })
      .catch((err) => console.error(err));
    jogoModel.deleta(id);
    res.redirect("/");
  },

  edit: async function (req, res) {
    var id = req.params.id;
    jogoModel
      .busca(id)
      .then((result) => res.render("jogo/edit.ejs", { dadosjogo: result }))
      .catch((err) => console.error(err));
  },

  update: function (req, res) {
    var formidable = require("formidable");
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      var id = req.params.id;
      var nome = fields["nome"];
      var descricao = fields["descricao"];
      jogoModel.atualizaSemImg(nome, descricao, id);
    });
    res.redirect("/");
  },

  show: async function (req, res) {
    if (req.session.loggedin) {
      var id = req.params.id;
      jogoModel
        .busca(id)
        .then((result) => res.render("jogo/show.ejs", { dadosjogo: result }))
        .catch((err) => console.error(err));
    } else {
      req.session.erro = true;
      req.session.mensagem =
        "Você precisa estar logado para ver os detalhes do jogo";
      res.redirect("/login");
    }
  },
};
