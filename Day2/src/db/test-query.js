const pool = require('./connection');

async function testDatabase(){
    try{
        const [rows] = await pool.query(
            'SELECT * FROM interns'
        );

        console.log(rows);
    }
    catch(error){
        console.error("Database query failed");
        console.error(error.message);
    }
    finally{
        await pool.end();
    }
}

testDatabase()