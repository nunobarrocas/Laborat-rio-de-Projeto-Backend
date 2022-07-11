const Injury = require('../models/Injuries')

const registerInjury = async (req, res, next) => {
    try {
        const { patient_id, injury  } = req.body


        await Injury.create({ patient_id, injury })

        res.status(201).json({
            success: true,
            msg: 'Injury registered'
            //data: patient
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            msg: 'Server having some issues'
        })
    }

}

const getAllPatientInjuries = async (req, res, next) => {
    try {
        const injuries = await Injury.find({ patient_id: req.params.uid })
       
        res.status(200).json({
            success: true,
            msg: 'Patients Found',
            data: injuries
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'Server having some issues'
        })
    }
}

module.exports = {
    registerInjury,
    getAllPatientInjuries
}