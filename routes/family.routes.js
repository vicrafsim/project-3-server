const express = require("express");
const router = express.Router();

// requires the model for Family
const Family = require("../models/Family.model");
const User = require("../models/User.model");
router.get("/family/all", (req, res, next) => {
    Family.find()
        .then((allfamilies) => {
            console.log("test", allfamilies)
            res.json(allfamilies)
        })
        .catch(error => console.log(error))
})
router.post("/create", (req, res) => {
    const familyName = req.body.familyName

    const userId = req.body.userId

// creating a random number for FamilyCode
    function generateRandomNumber() {
        // Generate a random number between 0 and 1
        const randomFraction = Math.random();
        // Scale the random fraction to fit the range [100000, 999999]
        const randomNumberInRange = Math.floor(randomFraction * (999999 - 100000 + 1)) + 100000;
        return randomNumberInRange;
    }

    const newFamilyCode = generateRandomNumber()
    Family.create({ familyCode: newFamilyCode, familyName: familyName, familyMembers: [userId]  })
        .then((newFamilyCreated) => {
            // this return is for the access to the NewfamilyCreated to the next then
            return newFamilyCreated

        })
        .then((newFamilyCreated)=>{
         return User.findByIdAndUpdate(userId, {family: newFamilyCreated._id })

        })
        .then(()=>{
            res.send("Your family has been created")
        })

        .catch(error => console.log(error))
})

    

module.exports = router;

/* 
This is a test
 */