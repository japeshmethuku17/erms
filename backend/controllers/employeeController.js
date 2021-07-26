const Employee = require('../models/employee')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

const cloudinary = require('cloudinary')

// Create new employee => /api/v1/admin/employee/new
exports.newEmployee = catchAsyncErrors(async (req, res, next) => {

    let avatars = []
    if(typeof req.body.avatars === 'string') {
        avatars.push(req.body.avatars)
    } else {
        avatars = req.body.avatars
    }

    let avatarsLinks = []
    for(let i = 0; i < avatars.length; i++) {
        const result = await cloudinary.v2.uploader.upload(avatars[i], {
            folder: 'employees'
        });
        avatarsLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    let sal = []
    sal.push({
        amount: req.body.amount,
        payment: req.body.payment
    })

    req.body.salary = sal

    req.body.avatars = avatarsLinks

    req.body.user = req.user.id;

    const employee = await Employee.create(req.body);

    res.status(201).json({
        success: true,
        employee
    })
})
// Get all employees => /api/v1/employees?keyword=engineering
exports.getEmployees = catchAsyncErrors(async (req, res, next) => {


    const resPerPage = 4;
    const employeeCount = await Employee.countDocuments();


    const apiFeatures = new APIFeatures(Employee.find(), req.query)
                                        .search()
                                        .filter()

    let employees = await apiFeatures.query;
    let filteredEmployeesCount = employees.length;

    apiFeatures.pagination(resPerPage)

    employees = await apiFeatures.query;

    
        res.status(200).json({
            success: true,
            employeeCount,
            resPerPage,
            filteredEmployeesCount,
            employees
        })    
        
})

// Get all employees => /api/v1/admin/employees
exports.getAdminEmployees = catchAsyncErrors(async (req, res, next) => {

    const employees = await Employee.find();

    
        res.status(200).json({
            success: true,
            employees
        })    
      
})

// Get single employee details => /api/v1/employee/:id

exports.getSingleEmployee = catchAsyncErrors(async (req, res, next) => {

    const employee = await Employee.findById(req.params.id);

    if(!employee) {
        return next(new ErrorHandler('Employee not found', 404));
    }

    res.status(200).json({
        success: true,
        employee
    })
})

// Update employee => /api/v1/admin/employee/:id
exports.updateEmployee = catchAsyncErrors(async (req, res, next) => {

    let employee = await Employee.findById(req.params.id);

    if(!employee) {
        return next(new ErrorHandler('Employee not found', 404));
    }

    let avatars = []
    if(typeof req.body.avatars === 'string') {
        avatars.push(req.body.avatars)
    } else {
        avatars = req.body.avatars
    }

    if(avatars !== undefined ) {
        for(let i = 0; i<employee.avatars.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(employee.avatars[i].public_id)
        }

        let avatarsLinks = []
        for(let i = 0; i < avatars.length; i++) {
            const result = await cloudinary.v2.uploader.upload(avatars[i], {
                folder: 'employees'
            });
            avatarsLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.avatars = avatarsLinks
    }

    let sal = []
    sal.push({
        amount: req.body.amount,
        payment: req.body.payment
    })

    req.body.salary = sal

    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        employee
    })
})

// Delete Employee => /api/v1/admin/employee/:id
exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if(!employee) {
        return next(new ErrorHandler('Employee not found', 404));
    }

    // Deleting images associated with the employee
    for(let i = 0; i<employee.avatars.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(employee.avatars[i].public_id)
    }
    await employee.remove();

    res.status(200).json({
        succes: true,
        message: 'Employee record deleted'
    })
})

// Create new comment => /api/v1/comment
exports.createEmployeeComment = catchAsyncErrors( async (req, res, next) => {

    const { comment, employeeId } = req.body;

    const empComment = {
        user: req.user._id,
        name: req.user.name,
        created: Date.now(),
        comment
    }

    const employee = await Employee.findById(employeeId);

    employee.comments.push(empComment);
    //
    // const isCommented = employee.comments.find(
    //     r => r.user.toString() === req.user._id.toString()
    // )

    // if(isCommented) {
    //     employee.comments.forEach(empComment => {
    //         if(empComment.user.toString() === req.user._id.toString()){
    //             empComment.comment = comment;
    //         }
    //     })

    // } else {
    //     employee.comments.push(empComment);
    // }
    //
    await employee.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
})

// Update employee comment => /api/v1/comment/update
exports.updateComment = catchAsyncErrors (async (req, res, next) => {
    

    await Employee.updateOne({'comments._id': req.query.id}, {'$set': {
        'comments.$.comment': req.body.comment}})

    res.status(200).json({
        success: true
    })
})

// Get all employee comments => /api/v1/comments

exports.getEmployeeComments = catchAsyncErrors (async (req, res, next) => {
    const employee = await Employee.findById(req.query.id);

    res.status(200).json({
        success: true,
        comments: employee.comments
    })
})

// Delete comment of an employee => /api/v1/comments
exports.deleteComment = catchAsyncErrors (async (req, res, next) => {
    const employee = await Employee.findById(req.query.employeeId);

    const comments = employee.comments.filter(comment => comment._id.toString() !== req.query.id.toString());

    await Employee.findByIdAndUpdate(req.query.employeeId, {
        comments
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})