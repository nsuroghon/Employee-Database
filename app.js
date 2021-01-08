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
    switch (response.startPrompt) {
      
      case "View All Employees":
        viewEmployees();
        break;

      case "View All Departments":
        viewDep();
        break;

      case "View All Employee Roles":
        viewRoles();
        break;
      
      case "Add Employee":
        addEmployee();
        break;
      
      case "Add Department":
        addDep();
        break;
      
      case "Add Role":
        addRole();
        break;
    }
  })
};

function viewEmployees() {
  const employeeQuery = `SELECT * FROM employee`
  connection.query(employeeQuery, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  })
};

function viewDep() {
  const depQuery = `SELECT * FROM department`
  connection.query(depQuery, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  })
};

function viewRoles() {
  const roleQuery = `SELECT title, salary FROM role`
  connection.query(roleQuery, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  })
};

function addEmployee() {
  inquirer.prompt([
    {
      type:"input",
      name:"firstName",
      message:"Enter employee's first name..."
    },
    {
      type:"input",
      name:"lastName",
      message:"Enter employee's last name..."
    },
    {
      type:"input",
      name:"roleID",
      message:"Enter role ID number"
    },
    {
      type:"input",
      name:"mangerID",
      message:"Enter manager ID number"
    }])
    .then(answer => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
        function(err) {
          if (err) throw err;
          console.log("new employee added!");
          init();
        })
    })
};

function addDep(){
  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "Enter new department name..."
    }])
  .then(answer => {
    connection.query(
      "INSERT INTO department(name) VALUES (?)",
      [answer.newDepartment],
      function (err) {
        if (err) throw err;
        console.log("new department added!")
        init();
      })
  })
};

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: "Enter title for new employee role/position..."
    },
    {
      type: "input",
      name: "roleSalary",
      message: "Enter position's Salary"
    },
    {
      type: "input",
      name: "roleDept",
      message: "Enter department ID for this position"
    }
  ])
    .then(answer => {
      connection.query(
        "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)",
        [answer.roleTitle, answer.roleSalary, answer.roleDept],
        function (err) {
          if (err) throw err;
          console.log("new role added!");
          init();
        }
      )})
};
