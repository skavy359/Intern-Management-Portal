const pool = require("../db/connection");

async function findAll({limit,offset}){
    const [rows]= await pool.query(
        "SELECT id,name,email,role,is_enabled FROM interns where is_enabled = TRUE order by id asc LIMIT ? OFFSET ?",
        [limit,offset]
    );

    return rows;
}

async function findById(id){
    const [rows] = await pool.execute(
        "select id,name,email,role,is_enabled from interns where is_enabled = TRUE and id = ? ",[id]
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

async function disableIntern(id){
    const[result]= await pool.execute(
        'update interns set is_enabled = FALSE where id=? and is_enabled = TRUE',
        [id]   
    );

    return result;
}

async function searchIntern(keyword){
    const sanitizedKeyword = `%${keyword}%`;
    const [rows] = await pool.execute(
        "select id,name,email,role,is_enabled from interns where is_enabled = TRUE and (name like ? or email like ? or role like ?) order by id asc",
        [sanitizedKeyword,sanitizedKeyword,sanitizedKeyword]
    )
    return rows;
}

module.exports={
    findAll,findById,createIntern,updateIntern,disableIntern,searchIntern
}