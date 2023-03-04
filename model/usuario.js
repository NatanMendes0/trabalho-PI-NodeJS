con = require("../config/db.js").pool;

module.exports = {
  async buscaTodos() {
    var sql = "SELECT * FROM usuarios";
    return new Promise((resolve, reject) => {
      con.query(sql, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async busca(id) {
    var sql = "SELECT * FROM usuarios where id = ?";
    return new Promise((resolve, reject) => {
      con.query(sql, id, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async buscaEmail(email) {
    var sql = "SELECT * FROM usuarios where email = ?";
    return new Promise((resolve, reject) => {
      con.query(sql, email, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  insere(nome, email, hash) {
    var sql = "INSERT INTO usuarios (nome, email, senha) VALUES ?";
    var values = [[nome, email, hash]];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Numero de registros inseridos: " + result.affectedRows);
      return result;
    });
  },
};
