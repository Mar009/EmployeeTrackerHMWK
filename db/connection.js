const mysql = require ("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3007
    //can't give away vital info so need dummy
    user: "node",
    password: "159753",
    database: "employees_db"
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
});

module.exports = connection;