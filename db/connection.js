const mysql = require ("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    //can't give away vital info so need dummy
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
});

module.exports = connection;