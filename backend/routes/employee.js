const express = require('express');
const router = express.Router();


const { getEmployees,
     getAdminEmployees,
     newEmployee,
     getSingleEmployee, 
     updateEmployee, 
     deleteEmployee, 
     createEmployeeComment,
     getEmployeeComments,
     updateComment,
     deleteComment } = require('../controllers/employeeController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/employees').get(getEmployees);
router.route('/admin/employees').get(getAdminEmployees);
router.route('/employee/:id').get(getSingleEmployee);

router.route('/admin/employee/new').post(isAuthenticatedUser, authorizeRoles('admin'), newEmployee);

router.route('/admin/employee/:id')
                .put(isAuthenticatedUser, authorizeRoles('admin'), updateEmployee)
                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteEmployee);

router.route('/comment').put(isAuthenticatedUser, createEmployeeComment);
router.route('/comments').get(isAuthenticatedUser, getEmployeeComments);
router.route('/comments').delete(isAuthenticatedUser, deleteComment);
router.route('/comment/update').put(isAuthenticatedUser, updateComment);

module.exports = router;