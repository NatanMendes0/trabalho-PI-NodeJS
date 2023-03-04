var mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});

con.connect(function (err) {
  if (err) throw err;
  var sql = "INSERT INTO usuarios (nome, email, senha) VALUES ?";
  var values = [
    ["Roger", "rogermachado@ifsul.edu.br", bcrypt.hashSync("1234", saltRounds)],
    [
      "Roger Machado",
      "rdsmachado@inf.ufpel.edu.br",
      bcrypt.hashSync("123456", saltRounds),
    ],
    [
      "Natan Bonitinho",
      "natanBonitinho@gmail.com",
      bcrypt.hashSync("123", saltRounds),
    ],
  ];
  
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Numero de usuarios inseridos: " + result.affectedRows);
  });

  if (err) throw err;
  var sql = "INSERT INTO categorias (nome) VALUES ?";
  var values = [
    ["Ação"],
    ["Aventura"],
    ["Corrida"],
    ["Esportes"],
    ["FPS"],
    ["Luta"],
    ["MMO"],
    ["Plataforma"],
    ["RPG"],
    ["Simulação"],
    ["Terror"],
    ["Outros"],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Numero de categorias inseridas: " + result.affectedRows);
  });

  if (err) throw err;
  var sql =
    "INSERT INTO jogos (titulo, descricao, preco, arquivo, categoria_id) VALUES ?";
  var values = [
    
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Numero de jogos inseridos: " + result.affectedRows);
  });
  con.end();
});