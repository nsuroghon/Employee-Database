const mysql = require('mysql');
const inquirer = require('inquirer')

//Create Connection
const connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'niv',
    // Be sure to update with your own MySQL password!
    password: 'suroghon',
    database: 'EmployeeDB',
  });

//connect
connection.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySQL connected...')
});