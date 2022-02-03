# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Employee Tracker](#employee-tracker)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Video Walthrough](#video-walthrough)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Questions](#questions)

## Description

A project for my bootcamp to create a CLI that accesses an employee database and can modify the information on it. The database this is designed to interact with is MYSQL, with the needed schema and seed included. The program is able to view all 3 tables(Employees, Roles, and Departments), update there information, delete information on them, and has some extra functions to view the total budget of each department, and view employees by there department or managers.

## Installation

To install, download the repo, and then in the terminal, on this directory, run `npm install`. Once this is complete, you need to set up your database schema and seed in MYSQL. Once that is done, the program is ready to be used, and can be run with the command `node index.js`.

## Usage

Once the program is running, you will be prompted by what you want to do: 

- `"view all departments."` - Displays a list of the departments.
- `"view all roles."`, - Displays a list of roles, their salary, and the department they are apart of.
- `"view all employees."` - Displays a list of employees, with their managers, roles, salarys, and departments.
- `"view employees by manager."` - Displays the employees sorted by their managers.
- `"view employees by department."` - Displays the employees sorted by their departments.
- `"view total budget (combined salary) of a department."` - Display the total salary budget of each department.
- `"add a department."` - Let's you add a new department to the database.
- `"add a role."` - Let's you add a new role to the database.
- `"add an employee."` - Let's you add a new employee to the database.
- `"update an employee role."` - Updates a selected employee's role.
- `"update employee manager."` - Updates a selected employee's manager.
- `"delete a department."` - Removes a selected department.
- `"delete a role."` - Removes a selected role.
- `"delete an employee."` - Removes a selected employee.
- `"end this program."` - Ends the program, putting you back on the regular terminal.

## Video Walthrough

[Watch the video walkthrough here.](https://drive.google.com/file/d/1PAk1JhZwR88n1xZdIxRyqP2X-_cN_9iv/view?usp=sharing)

## Contributing

Anyone can fork this project and add features. However, all changes to the main section must be approved by the Admin.

## Tests

There are no testing procedures for this project.

## License

This project is licensed under a [MIT license](https://opensource.org/licenses/MIT).

## Questions

If you have any questions, please send them to [WRuback](https://github.com/WRuback) at wrubackdev@gmail.com with the heading "Employee Tracker Question".
