const express = require('express');
const bodyParser = require('body-parser');
const employeePunchController = require('../controllers/employeePunchController');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(bodyParser.json());


// employee punch entity routes
router.get('/employeePunch/list', (request, response) => employeePunchController.get(request, response));
router.post('/employeePunch/create', (request, response) => employeePunchController.post(request, response));
router.get('/employeePunch/list/inOut', (request, response) => employeePunchController.getTimeInOut(request, response));

// employee entity routes
router.get('/employee/list', (request, response) => employeeController.get(request, response));
router.post('/employee/create', (request, response) => employeeController.post(request, response));


module.exports = router;
