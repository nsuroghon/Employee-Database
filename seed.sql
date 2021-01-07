USE employeeDB

INSERT INTO department(name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 80000, 1), ('Sales Lead', 100000, 1), ('Software Engineer', 150000, 2), ('Lead Software Engineer', 180000, 2), ('Accountant', 125000, 3), ('Finance Manager', 150000, 3), ('Legal', 200000, 4), ('Legal Manager', 250000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Lebron', 'James','1', null), 
('Tom', 'Brady', 2, null), 
('Kevin', 'Durant', 3, null), 
('Stephen', 'Curry', 4, null),
('Serena', 'Williams', 5, null), 
('Tiger', 'Woods', 6, null);