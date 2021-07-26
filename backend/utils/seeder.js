const Employee = require('../models/employee');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const employee = require('../data/employee');

dotenv.config({ path: './backend/config/config.env'});

connectDatabase();

const seedEmployees = async () => {
    try {
        await Employee.deleteMany();
        console.log('Employees are deleted');

        await Employee.insertMany(employee);
        console.log('All employees are added');

        process.exit();

    } catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedEmployees();