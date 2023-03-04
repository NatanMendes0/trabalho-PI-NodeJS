con = require("../config/db.js").pool;

module.exports = {
  async buscaTodos() {
    var sql = "SELECT * FROM jogos";
    return new Promise((resolve, reject) => {
      con.query(sql, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async buscaJogo(id) {
    var sql = "SELECT * FROM jogos where id = ?";
    return new Promise((resolve, reject) => {
      con.query(sql, id, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async buscaCategoria() {
    var sql = "SELECT * FROM categorias";
    return new Promise((resolve, reject) => {
      con.query(sql, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async deleta(id) {
    var sql = "DELETE FROM jogos WHERE id = ?";
    return new Promise((resolve, reject) => {
      con.query(sql, id, function (err, row) {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  insere(titulo, descricao, preco, categoria) {
    var sql = "INSERT INTO jogos (titulo, descricao, preco, categoria) VALUES ?";
    var values = [[titulo, descricao, preco, categoria]];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Numero de registros inseridos: " + result.affectedRows);
    });
  },


};
