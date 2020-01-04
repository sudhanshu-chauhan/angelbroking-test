const EmployeePunchModel = require('../models/mongoose/employee_punch');
const EmployeeModel = require('../models/mongoose/employee');


class EmployeePunchController {
  static get(request, response) {
    try {
      let fromDate;
      let toDate;
      if (request.query.punchTime) {
        fromDate = new Date(request.query.punchTime);
        toDate = new Date(request.query.punchTime);
        toDate.setDate(fromDate.getDate() + 1);
      }
      if (request.query.punchTime) {
        EmployeePunchModel.find({ punchTime: { $gte: fromDate, $lt: toDate } }, (error, employeePunches) => {
          if (error) {
            response.status(500).send('server error');
          }
          response.status(200).send(employeePunches);
        });
      }
      else {
        EmployeePunchModel.find(request.query, (error, employeePunches) => {
          if (error) {
            response.status(500).send('server error');
          }
          response.status(200).send(employeePunches);
        });
      }
    } catch (error) {
      response.status(500).send('server error');
    }
  }

  static post(request, response) {
    try {
      const hardcodedDate = new Date();
      hardcodedDate.setDate(5);
      const employeePunchQuery = {
        employeeId: request.body.employeeId,
        punchTime: hardcodedDate,
      };
      EmployeePunchModel.create(employeePunchQuery, (error, employeePunch) => {
        if (error) {
          response.status(500).send('server error');
        }
        response.status(201).send(employeePunch);
      });
    } catch (error) {
      response.status(500).send('server error');
    }
  }

  static getTimeInOut(request, response) {
    try {
      const InOutResponse = [];
      EmployeeModel.find({}, (error, users) => {
        if (error) {
          console.log(error);
          response.status(500).send('server error');
        }
        users.forEach((user) => {
          const employeeInoutObject = {};
          console.log(user._id);

          EmployeePunchModel.findOne({ employeeId: user._id }, { sort: { punchTime: -1 } }, (errorIn, employeePunch) => {
            if (errorIn) {
              console.log(error);
            }
            console.log(employeePunch.punchTime);
            employeeInoutObject['inTime'] = employeePunch.punchTime;
          });
          // EmployeePunchModel.findOne({ employeeId: user._id }, {}, { sort: { punchTime: 1 } }, (errorIn, employeePunch) => {
          //   if (errorIn) {
          //     response.status(500).send('server error');
          //   }
          //   employeeInoutObject['outTime'] = employeePunch.punchTime;
          // });
          InOutResponse.push(employeeInoutObject);
        });
      });
      response.status(200).send(InOutResponse);
    } catch (error) {
      response.status(500).send('server error');
    }
  }
}

module.exports = EmployeePunchController;
