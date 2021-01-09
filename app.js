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
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: '',
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

      case "Update Employee Role":
        updateRole();
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


function updateRole() {
  let query = ("SELECT * FROM employee");

  connection.query(query, (err, response) => {

    const employees = response.map(function (element) {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id
      }
    });

    inquirer.prompt([{
      type: "list",
      name: "employeeId",
      message: "Which employees role do you want to update",
      choices: employees
    }])
      .then(input1 => {
        connection.query("SELECT * FROM role", (err, data) => {

          const roles = data.map(function (role) {
            return {
              name: role.title,
              value: role.id
            }
          });

          inquirer.prompt([{
            type: "list",
            name: "roleId",
            message: "What's the new role",
            choices: roles
          }])
            .then(input2 => {
              const query1 = `UPDATE employee
        SET employee.role_id = ? 
        WHERE employee.id = ?`
              connection.query(query1, [input2.roleId, input1.employeeId], function (err, res) {
                var tempPosition;
                // will return the updated position
                for (var k = 0; k < roles.length; k++) {
                  if (roles[k].value == input2.roleId) {
                    tempPosition = roles[k].name;
                  }
                }
                // will return the employee
                var tempName;
                for (var g = 0; g < employees.length; g++) {
                  if (employees[g].value == input1.employeeId) {
                    tempName = employees[g].name;
                  }
                }

                if (res.changedRows === 1) {
                  console.log(`Successfully updated ${tempName} to position of ${tempPosition}`);
                } else {
                  console.log(`Error: ${tempName}'s current position is ${tempPosition}`)
                }
                // console.log(res.changedRows);
                init();
              })
            })
        })
      })
  })
};