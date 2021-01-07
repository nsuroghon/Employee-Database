const mysql = require('mysql');
const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');
const consoleTable = require('console.table');

//Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'niv',
    // Be sure to update with your own MySQL password!
    password: 'suroghon',
    database: 'employeeDB',
  });

//connect
connection.connect((err) => {
  if(err){
    throw err;
  }
  console.log("Connected as id " + connection.threadId);
  init();
});

function init(){
  inquirer.prompt({
    type: 'list',
    name: 'startPrompt',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Departments', 'View All Employee Roles', 'Add Employee', 'Add Department', 'Add role', 'Update Employee Role']
  })
  .then(function (response){
    switch (response.start) {
      
      case "View All Employees":
        viewEmployees();
        break;
      
    }
  })
};

