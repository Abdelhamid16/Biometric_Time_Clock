const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const Check = require("../models/check")
const { CHECK_OUT, CHECK_IN } = require('../helpers/constants')
const {parse} = require("date-fns")


// date-fns

// Get All the employess end point 
router.get('/', async (req, res) => {

   // all the commented lines for the dateCreated filter  
  /*   let {dateCreated} = req.query
    
    if(dateCreated !== undefined) {
        // dateCreated = parse(dateCreated, "yyyy-MM-dd", new Date())
        dateCreated = new Date(dateCreated)
    } */
    
    try {

        const employees = await Employee.find()
        /* console.log("this is 1")
        const employees = await Employee.find().$where(function() {
            // console.log("this is", this)
            // return dateCreated ? (this.dateCreated.toDateString() === dateCreated.toDateString()) : true
        }).exec(); */
     
        res.json(employees)

    } catch (err) {
        res.status(500).json({ message: err.message})
    }
    

})

// Getting One emloyer with his Id 
router.get('/:id', (req, res) => {
    res.send(req.employee)

})

//Creating an Employerr end point 
router.post('/', async (req, res) => {

    const employee = new Employee({
        lastName: req.body.lastName,
        firstName: req.body.firstName, 
        department: req.body.department
    })

    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)

    } catch (err) {
        res.status(400).json({ message: err.message })

    }

})

//Updating Employer end point 
router.patch('/:id',getEmployee, async (req, res) => {

    if (req.body.id != null ) {
        res.employee.name = req.body.id
      }
      if (req.body.lastName != null) {
        res.employee.lastName = req.body.lastName
      }
      if (req.body.firstName != null) {
        res.employee.firstName = req.body.firstName
      }
    
      if (req.body.department != null) {
        res.employee.department = req.body.department
      }
      try {
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }

    

})

//Deleting Delete Employer point 
router.delete('/:id', getEmployee, async(req, res) => {

    try {
        await res.employee.deleteOne()
        res.json({ message: 'Deleted Employer'})


    } catch (err) {
        res.status({ message: err.message})

    }

})

// check-in endpoint 

router.post('/check-in', async (req, res) => {

    const checkin = new Check({
        employeeId: req.body.employeeId,
        comment: req.body.comment, 
        type: CHECK_IN
    })

    try {
        const newcheckin = await checkin.save()
        res.status(201).json(newcheckin)
        return newcheckin
            
        
    } catch (err) {
        res.status(400).json({ message: err.message })

    }


} )

// check-in endpoint 


router.post('/check-out', async (req, res) => {

    const checkout = new Check({
        employeeId: req.body.employeeId,
        comment: req.body.comment, 
        
        type : CHECK_OUT
    })

    try {

        const checkInTime = checkout.newcheckin
        const checkOutTime = new Date();
        const timeDifferenceseconds = checkOutTime - checkInTime;
        const realtimeDifferenceminuts = timeDifferenceseconds / (1000 * 60);

        
        
        checkout.realtimeDifferenceminuts = realtimeDifferenceminuts;
        checkout.checkOutTime = checkOutTime; 

        const newcheckout = await checkout.save()



        res.status(201).json(newcheckout)

    } catch (err) {
        res.status(400).json({ message: err.message })

    }
} )

// for the update and the delete 
async function getEmployee(req, res, next) {

    let employee

    try {
        employee = await Employee.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employer'})
        }

    }
    catch (err) {
        return res.status(500).json({message: err.message})

    }

    res.employee = employee
    next()
}

module.exports = router