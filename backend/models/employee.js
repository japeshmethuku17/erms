const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the employee name'],
        trim: true,
        maxLength: [100, 'Employee name cannot exceed 100 characters']
    },
    joining: {
        type: Date,
        default: Date.now
    },                                                                                                              
    title: {
        type: String,
        required: [true, 'Please enter the employee job title'],
        maxLength: [100, 'Employee job title cannot exceed 100 characters']
    },
    salary: [
        {
        amount:{
            type: Number,
            required: [true, 'Please enter the salary of the employee'],
            maxLength: [10, 'Employee salary cannot exceed 10 characters'],
            default: 0.0
        },
        payment:{
            type: String,
            enum: {
                values: [
                    'Annual',
                    'Monthly'
                ],
                message: 'Please select correct payment for the employee'
            }
        }
    }
],
    department: {
        type: String,
        required: [true, 'Please enter the department for this employee'],
        enum: {
            values: [
                'Management',
                'Human Resources',
                'Engineering',
                'Sales',
                'Product',
                'Operations',
                'Marketing',
                'Design',
                'Customer Success'
            ],
            message: 'Please select correct department for the employee'
        }
    },
    manager: {
        type: String,
        trim: true,
        maxLength: [100, 'Line manager name cannot exceed 100 characters']
    },
    address: {
        type: String,
        required: [true, 'Please enter the employee address'],
        trim: true,
        maxLength: [200, 'Employee address cannot exceed 200 characters']
    },
    avatars: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema);