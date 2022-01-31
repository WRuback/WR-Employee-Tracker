INSERT INTO department (name)
VALUES ("Accounting"),
    ("Production"),
    ("Maintenance");

INSERT INTO role (title, salary, department_id)
VALUES ("Finance Manager", 90000, 1),
    ("IT Manager", 80000, 2),
    ("Maintenance Manager", 70000, 3),
    ("Accountant", 50000, 1),
    ("Office Assistant", 30000, 1),
    ("Back-end Engineer", 65000, 2),
    ("Front-end Designer ", 55000, 2),
    ("Back-end Data Engineer", 55000, 3),
    ("Front-end Tester", 40000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Miller", "Houghton", 1, null),
    ("Sam", "Jackson", 2, null),
    ("Sadie", "Owen", 3, null),
    ("Frank", "Kelly", 4, 1),
    ("Jack", "Dawson", 5, 1),
    ("Troy", "Jackson", 6, 2),
    ("Laila", "King", 6, 2),
    ("Logan", "James", 7, 2),
    ("Bethany", "Mason", 8, 3),
    ("Casper", "King", 9, 3),
    ("Sami", "Thomas", 9, 3);