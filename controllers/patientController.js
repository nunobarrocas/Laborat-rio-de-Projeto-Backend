const Patient = require('../models/Patient')

const registerPatient = async (req, res, next) => {
    try {
        const { user_id, name, birthdate, height, weight, gender, avatar,
            tempBool, bpBool, medsBool, oxygBool, injBool } = req.body


        await Patient.create({
            user_id, name, birthdate, height, weight, avatar, gender,
            tempBool, bpBool, medsBool, oxygBool, injBool
        })

        res.status(201).json({
            success: true,
            msg: 'Patient created'
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

const getAllUserPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find({ user_id: req.params.uid })
        // const p = patients.map(item =>{
        //     return [name = item.name]
        // })
        res.status(200).json({
            //success: true,
            //msg: 'Patients Found',
            data: patients
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'Server having some issues'
        })
    }
}

const deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.patId)

        res.status(201).json({
            success: true,
            msg: 'Patient Successfully deleted'
        })
        if (!patient) {
            return res.status(401).json({
                success: false,
                msg: 'Patient does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Server having some issues'
        })
    }
}

const updatetemperature = async (req, res) => {
    try {
        let dat = Date.now();
        let time = new Date(dat)
        let day = time.getDate();
        let month = time.getMonth();
        let year = time.getFullYear();
        let timeofupdate = day + "-" + month + "-" + year
        await Patient.findByIdAndUpdate(req.params.patId, {

            $push: {
                temperature: {
                    $each: [{
                        temp: req.body.temp,
                        date: timeofupdate
                    }],
                    $position: 0
                }
            }
        });

        res.status(201).json({
            success: true,
            msg: 'Patient Successfully updated'
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updatemedicines = async (req, res) => {
    try {
        let dat = Date.now();
        let time = new Date(dat)
        let day = time.getDate();
        let month = time.getMonth();
        let year = time.getFullYear();
        let timeofupdate = day + "-" + month + "-" + year
        await Patient.findByIdAndUpdate(req.params.patId, {
            $push: {
                medicines: {
                    $each: [{
                        meds: req.body.meds,
                        date: timeofupdate
                    }],
                    $position: 0
                }
            }
        });

        res.status(201).json({
            success: true,
            msg: 'Patient Successfully updated'
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updatebloodpressure = async (req, res) => {
    let dat = Date.now();
    let time = new Date(dat)
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    let timeofupdate = day + "-" + month + "-" + year
    try {
        await Patient.findByIdAndUpdate(req.params.patId, {
            $push: {
                bloodPressure: {
                    $each: [{
                        high: req.body.high,
                        low: req.body.low,
                        date: timeofupdate
                    }],
                    $position: 0
                }
            }
        });

        res.status(201).json({
            success: true,
            msg: 'Patient Successfully updated'
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updateoxygen = async (req, res) => {
    let dat = Date.now();
    let time = new Date(dat)
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    let timeofupdate = day + "-" + month + "-" + year
    try {
        await Patient.findByIdAndUpdate(req.params.patId, {
            $push: {
                oxygenSaturation: {
                    $each: [{
                        oxyg: req.body.oxygen,
                        date: timeofupdate
                    }],
                    $position: 0
                }
            }
        });

        res.status(201).json({
            success: true,
            msg: 'Patient Successfully updated'
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updateFavCategories = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patId);

        patient.tempBool = req.body.tempBool || patient.tempBool;
        patient.bpBool = req.body.bpBool || patient.bpBool;
        patient.medsBool = req.body.medsBool || patient.medsBool;
        patient.oxygBool = req.body.oxygBool || patient.oxygBool;
        patient.injBool = req.body.injBool || patient.injBool;

        const updatedpatient = await patient.save();

        res.json({
            tempBool: updatedpatient.tempBool,
            bpBool: updatedpatient.bpBool,
            medsBool: updatedpatient.medsBool,
            oxygBool: updatedpatient.oxygBool,
            injBool: updatedpatient.injBool
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updateFavTemperature = async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.patId);

        patient.tempBool = req.body.tempBool

        const updatedpatient = await patient.save();

        res.json({
            tempBool: updatedpatient.tempBool,
            
        })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updateFavMedicine = async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.patId);

        patient.medsBool = req.body.medsBool;

        const updatedpatient = await patient.save();

        res.json({
            medsBool: updatedpatient.tempBool,
            
        })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updateFavBloodPressure = async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.patId);

        patient.bpBool = req.body.bpBool

        const updatedpatient = await patient.save();

        res.json({
            bpBool: updatedpatient.bpBool,
            
        })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updateFavOxygen = async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.patId);

        patient.oxygBool = req.body.oxygBool

        const updatedpatient = await patient.save();

        res.json({
            oxygBool: updatedpatient.oxygBool,
            
        })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}

const updateFavInjuries = async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.patId);

        patient.injBool = req.body.injBool;

        const updatedpatient = await patient.save();

        res.json({
            injBool: updatedpatient.injBool,
            
        })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}



const updatedImages = async (req, res) => {
    try {
        await Patient.findByIdAndUpdate(req.params.patId, {
            $push: {
                oxygenSaturation: {
                    $each: [{
                        injury: req.body.injury,
                        name: req.body.name
                    }],
                    $position: 0
                }
            }
        });

        res.status(201).json({
            success: true,
            msg: 'Patient Successfully updated'
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: 'Patient not found'
        })
    }
}



module.exports = {
    registerPatient,
    getAllUserPatients,
    deletePatient,
    updatetemperature,
    updatemedicines,
    updatebloodpressure,
    updateoxygen,
    updateFavCategories,
    updateFavInjuries,
    updateFavMedicine,
    updateFavOxygen,
    updateFavTemperature,
    updateFavBloodPressure,
    
}