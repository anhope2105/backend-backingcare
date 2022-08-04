const express = require('express');
const router = express.Router();

const homeController = require('../controllers/HomeController')
const userController = require('../controllers/UserController')
const doctorController = require('../controllers/DoctorController')


router.get('/', homeController.home);
router.get('/crud', homeController.getCRUD);
router.post('/post-crud', homeController.postCRUD);
router.get('/get-crud', homeController.readGetCRUD);
router.get('/edit-user', homeController.editCRUD);
router.post('/put-crud/:id', homeController.putCRUD);
router.get('/delete-user', homeController.deleteCRUD);

//API
router.post('/api/login', userController.handleLogin);
router.get('/api/get-all-users', userController.handleGetAllUsers);
router.post('/api/create-new-user', userController.handleCreateNewUser);
router.delete('/api/delete-user', userController.handleDeleteUser);
router.put('/api/edit-user', userController.handleEditUser);
router.get('/api/allcodes', userController.getAllCodes);

router.get('/api/get-top-dotor-home', doctorController.getTopDoctorHome)
router.get('/api/get-all-doctors', doctorController.getAllDoctors)





 






module.exports = router