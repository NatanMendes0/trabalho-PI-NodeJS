// Descrição: Arquivo responsável por alterar a tabela 'usuario' do banco de dados 'node'

var mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conectado!");

  var sql = 
    "drop table categorias";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("alterado com sucesso");
  });
  con.end();
});
