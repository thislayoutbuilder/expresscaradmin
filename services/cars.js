const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function registerUser(user){
  db.execute(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [user.username, user.password],
    (err, result)=> {
      console.log(err);
    }
  );

}

async function loginUser(user) {
  db.execute(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [user.username, user.password],
    (err, result)=> {
      console.log(err);
      if (err) {
          res.send({err: err});
      }

      if (result.length > 0) {
          res.send( result);
          }else({message: "Wrong username/password comination!"});
      }
  );
}



async function create(cars){
    const result = await db.query(
        `INSERT INTO programming_languages 
        (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
        VALUES 
        (${cars.name}, ${cars.released_year}, ${cars.githut_rank}, ${cars.pypl_rank}, ${cars.tiobe_rank})`
    );

    let message = 'Error in creating programming language';

    if (result.affectedRows) {
        message = 'Programming language created successfully';
    }

    return {message};
}

async function update(id, cars){
    const result = await db.query(
        `UPDATE programming_languages 
        SET name="${cars.name}", released_year=${cars.released_year}, githut_rank=${cars.githut_rank}, 
        pypl_rank=${cars.pypl_rank}, tiobe_rank=${cars.tiobe_rank} 
        WHERE id=${id}` 
    );

    let message = 'Error in updating programming language';

    if (result.affectedRows) {
        message = 'Programming language updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM programming_languages WHERE id=${id}`
    );
  
    let message = 'Error in deleting programming language';
  
    if (result.affectedRows) {
      message = 'Programming language deleted successfully';
    }
  
    return {message};
  }

module.exports = {
    getMultiple,
    create,
    update,
}