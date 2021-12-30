const Employee = require('../Models/EmployeModel')

const index = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                massage: 'An error Occured!'
            })
        })
}

const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
                .catch(error => {
                    res.json({
                        message: 'An error Occured !'
                    })
                })
        })
};

// store Employee to the database

const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        date: req.body.date
    })
    employee.save()
        .then(response => {
            res.json({
                message: 'Employee Added Successfully'
            })
                .catch(error => {
                    res.json({
                        message: 'An Error Occured !'
                    })
                })
        })
};

// Update an employee

const update = (req, res, next) => {
    let employeeID = req.body.employeeID
    let updatedData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        date: req.body.date
    }
    Employee.findByIdAndUpdate(employeeID, { $set: updateDate })
        .then(() => {
            res.json({
                message: 'Employee update successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured !'
            })
        })
}
// Delete an Employee

const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            req.json({
                message: 'Employee Delete Successfully'
            })
                .catch(error => {
                    req.json({
                        message: 'An Error Occured !'
                    })
                })
        })
}

module.exports = {
    index, show, store, update, destroy
}