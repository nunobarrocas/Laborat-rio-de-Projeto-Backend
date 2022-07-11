const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth');

const {
    registerUser,    
    authUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/userController')

const { 
    registerPatient, 
    deletePatient, 
    getAllUserPatients, 
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
    updatedImages
} = require('../controllers/patientController');

const {
    registerInjury,
    getAllPatientInjuries
} = require('../controllers/injuryController')


router.route('/').post(registerUser)

router.route('/login').post(authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/registerPatient').post(protect, registerPatient)
router.route('/deletePatient/:patId').delete(protect, deletePatient)
router.route('/getAllPatients/:uid').get(getAllUserPatients)
router.route('/temperature/:patId').put(protect, updatetemperature)
router.route('/medicines/:patId').put(protect, updatemedicines)
router.route('/bloodpressure/:patId').put(protect, updatebloodpressure)
router.route('/oxygen/:patId').put(protect, updateoxygen)
router.route('/updateFavInjuries/:patId').put(protect,updateFavInjuries)
router.route('/updateFavMedicine/:patId').put(protect,updateFavMedicine)
router.route('/updateFavOxygen/:patId').put(protect,updateFavOxygen)
router.route('/updateFavTemperature/:patId').put(protect,updateFavTemperature)
router.route('/updateFavBloodPressure/:patId').put(protect,updateFavBloodPressure)
router.route('/updateFavCategories/:patId').put(protect,updateFavCategories)
router.route('/registerInjury').post(protect, registerInjury)
router.route('/getAllInjuries/:patid').get(getAllPatientInjuries)


module.exports = router;