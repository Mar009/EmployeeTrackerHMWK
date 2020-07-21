//Consts
const connection = require("./db/connection.js");
// const db = require("./db");
const inquirer = require("inquirer");
require("console.table");

//Display logo

//Beginning prompt
function start(){
    const beginChoices=[{
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          "View all Deptartments",
         "View all Employees",
         "View all Roles",
          "Add a Dept",
          "Add an Employee",
          "Add a Role",
          "Update Emloyee Role",
          "Exit"]
    }]
    inquirer.prompt(beginChoices)
        .then((answers)=>{
            if(answers.choice === "View all Deptartments"){
                deptInfo();
            }
            if(answers.choice === "View all Employees"){
                employeesInfo();
            }
            if(answers.choice === "View all Roles" ){
                rolesInfo();
            }
            if(answers.choice === "Add a Dept"){
                addDept();
            }
            if(answers.choice === "Add an Employee"){
                addEmployee();
            }
            if(answers.choice === "Add a Role"){
                addRole();
            }
            if(answers.choice === "Update Emloyee Role"){
                updateEmployee();
            }
            if(answers.choice === "Exit"){
                console.log("Peace!")
                connection.end();

            }

        })
}




//Display dept 
function deptInfo(){
   connection.query(`SELECT * FROM  department`,function (err,res) {
        if (err) throw err;
        console.table(res)
        start();
  })
}


//Display roles 
function rolesInfo(){
    var query = "SELECT * FROM role";
     connection.query(query, function (err,res) {
        if (err) throw err;
        console.table(res);
        start();
    })

}

//display employees 
function employeesInfo() {
    var query = "SELECT * FROM employees";
     connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        start();
    })
}

//add dept 
function addDept(){
    inquirer.prompt([
        {type: "input",
        name: "deptName",
        message: "What is the name of the Dept you are adding?"
        }
    ]).then(function(res){
        connection.query('INSERT INTO department SET ?', { name: res.deptName}, function(err, res){
            if (err) throw err;
            console.table(res)
            start();
        })

    })
}


//add roles 
function addRole(){
    inquirer.prompt([
        {
            type:"input",
            name: "role",
            message:"What is the role you are adding?"
        },
        {
            type:"input",
            name: "salary",
            message: "What is the salary for this role?"
        }
    ]).then(function(res){
        const query = connection.query("INSERT INTO role SET ?", {title: res.role, salary: res.salary},(err,res)=>{
            const id= res.insertId;
            updateRole(id);
         } )
    })
}

//updateRole
function updateRole(id){
    let department = [];
    connection.query("SELECT name FROM department", (err,res)=>{
        for (let i=0; i< res.lenght; i++){
            department.push(res[i].name);
        }
    })
    inquirer.prompt([
        {
            type: "list",
            name: "deptName",
            message: "What dept is this role in?",
            choices: department
        }
    ]).then(function(res){
        const query = `SELECT id FROM department WHERE name = '${res.deptName}'`;
        connection.query(query, function (err,res){
            const query = `UPDATE role SET department_id = '${res[0].id}' WHERE role.id = '${id}'`;
            connection.query(query, function(err,res){
                if (err) throw err;
                connection.query(`SELECT * FROM role`, (err,res)=>{
                    console.table(res);
                    start();
                })
            })
        })
    })
}

//add employee 
function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What is the first name of the employee?"
        },
        {
            type: "input",
            name: "last",
            message: "what is the last name of the employee?"
        }
    ]).then(function(res){
        const query = connection.query("INSERT INTO employees SET ?",{first_name: res.first, last_name: res.last},(err,res)=>{
            const id = res.insertId;
            updateEmployee();
        })
    })
}


//update employee updateEmployee
function updateEmployee(){
    let role=[];
    connection.query("SELECT title FROM role", (err, res) => {
        for (let i = 0; i < res.length; i++) {
          roles.push(res[i].title);
        }
        inquirer.prompt([
            {
                type: 'input',
                name: "roleId",
                message:"What is the role of the employee?",
                choices: role
            }
         ]).then(function(res) {
            const query = `SELECT id FROM role WHERE title = '${res.roleId}'`;
    
            connection.query(query, function(err, res) {
              console.log(res[0].id);
              const query = `UPDATE employees SET role_id = '${res[0].id}' WHERE employees.id = '${id}'`;
              connection.query(query, function(err, res) {
                if (err) throw err;
              });
            });
            updateManagerId(id);
          });
    });
}


function updateManagerId(id) {
    let managerList = ["null"];
    connection.query(
      "SELECT employees.first_name, employees.last_name FROM employees",
      (err, res) => {
        for (let i = 0; i < res.length; i++) {
          let fullName = res[i].first_name + " " + res[i].last_name;
          managerList.push(fullName);
        }
        inquirer
          .prompt([
            {
              type: "list",
              name: "managerId",
              message: "Who is the manager of this employee?",
              choices: managerList
            }
          ])
          .then(function(res) {
            console.log("managerid", res.managerId);
            if (res.managerId !== "null") {
              const query = `SELECT id FROM employees WHERE concat(employees.first_name, ' ' , last_name) = '${res.managerId}'`;
              connection.query(query, function(err, res) {
                const query = `UPDATE employees SET manager_id = '${res[0].id}' WHERE employees.id = '${id}'`;
                connection.query(query, function(err, res) {
                  start();
                });
              });
            } else {
              start();
            }
          });
      }
    );
  }







