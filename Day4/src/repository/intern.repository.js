const pool = require("../db/connection");

async function findAll(){
    const [rows]= await pool.query(
        "SELECT * FROM interns order by id asc"
    );

    return rows;
}

async function findById(id){
    const [rows] = await pool.execute(
        "select name,email,role from interns where id = ? ",[id]
    );

    return rows[0]||null;
}

async function createIntern(intern){
    const {name,email,role} = intern;
    const [result] = await pool.execute(
        "insert into interns(name,email,role) values(?,?,?)",
        [name,email,role]
    );

    return result.insertId;
}

async function updateIntern(id, intern){
    const {name,email,role} = intern;
    const[result]= await pool.execute(
        "update interns set name=?,email=?,role=? where id=?",
        [name,email,role,id]
    );

    return result;
}

module.exports={
    findAll,findById,createIntern,updateIntern
}