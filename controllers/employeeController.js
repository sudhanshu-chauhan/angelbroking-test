const EmployeeModel = require('../models/mongoose/employee');


class EmployeeController {
  static get(request, response) {
    try {
      EmployeeModel.find({}, (error, employees) => {
        if (error) {
          response.status(500).send('server error');
        }
        console.log(employees);
        response.status(200).send(employees);
      });
    } catch (error) {
      response.status(500).send('server error');
    }
  }

  static post(request, response) {
    try {
      const employeeQuery = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
      };
      EmployeeModel.create(employeeQuery, (error, employee) => {
        if (error) {
          response.status(500).send('server error');
        }
        response.status(201).send(employee);
      });
    } catch (error) {
      response.status(500).send('server error');
    }
  }
}

module.exports = EmployeeController;
