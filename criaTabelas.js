var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conectado!");
  var usuario =
    "CREATE TABLE usuarios (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255), email VARCHAR(255), senha VARCHAR(255))";
  var jogos =
    "CREATE TABLE jogos (id INT AUTO_INCREMENT PRIMARY KEY, titulo VARCHAR(255), descricao VARCHAR(255), preco INT, arquivo VARCHAR(255), categoria_id INT, FOREIGN KEY (categoria_id) REFERENCES categorias(id))";
  var categorias =
    "CREATE TABLE categorias (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255))";

  var favoritos =
    "CREATE TABLE favoritos (id INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT, jogo_id INT, FOREIGN KEY (usuario_id) REFERENCES usuarios(id), FOREIGN KEY (jogo_id) REFERENCES jogos(id))";

  con.query(usuario, function (err, result) {
    if (err) throw err;
    console.log("Tabela criada");
  });
  con.query(jogos, function (err, result) {
    if (err) throw err;
    console.log("Tabela criada");
  });
  con.query(categorias, function (err, result) {
    if (err) throw err;
    console.log("Tabela criada");
  });
  con.query(favoritos, function (err, result) {
    if (err) throw err;
    console.log("Tabela criada");
  });

  con.end();
});
