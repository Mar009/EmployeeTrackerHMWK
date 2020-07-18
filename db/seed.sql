use employees;

INSERT INTO department (name) 
VALUES ('Sales'), ('Engineering'), ('Accounting'), ('Legal');

INSERT INTO role (title, salary, department_id) 
VALUES  ('Accountant', 150000,1), ('Sales Lead', 125000, 2), ('Lead Engineer', 155000, 3), ('Salesperson', 120000, 2), ('Software Engineer', 150000, 3), ('Lawyer', 165000, 4), ('Legal Team Lead', 155000, 4);






INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Fyodor","Mikhailovich",1,7),  ("Earl","Aubec",1, Null), ("Amina","Hourani",2,7), ("Duncan","Idaho",2, Null), ("Thei","Svengaard",3,7), ("Orasmyn","Leon",3,Null), ("Kailea","Vernius",4,7), ("Alia","Atreides",4, Null);



