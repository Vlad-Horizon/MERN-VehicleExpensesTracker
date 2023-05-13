import {Router} from 'express';
const router = Router();

import {Login, Registration, Refresh, Logout, MyAccount} from '../controllers/auth.js';
import {CreateCar, GetAllCar, GetCarById, DeleteCar, EditCar} from '../controllers/car.js';
import {AddCost, GetAllCarCosts, EditCarCost, DeleteCarCost} from '../controllers/costsCar.js';

import authMiddleware from '../middleware/auth.js';

// ----------------------------------------------------------------------

// Auth
router.post('/registration', Registration);
router.post('/login', Login);
router.post('/refresh', Refresh);
router.post('/logout', authMiddleware, Logout);
router.get('/myAccount', authMiddleware, MyAccount);

// Car
router.post('/createCar', authMiddleware, CreateCar);
router.get('/GetAllCar', authMiddleware, GetAllCar);
router.get('/GetCarById/:carId', authMiddleware, GetCarById);
router.delete('/DeleteCar/:carId', authMiddleware, DeleteCar);
router.put('/EditCar', authMiddleware, EditCar);

// Car costs
router.post('/addCost', authMiddleware, AddCost);
router.get('/getAllCarCosts/:carId', authMiddleware, GetAllCarCosts);
router.put('/editCarCost', authMiddleware, EditCarCost);
router.delete('/deleteCarCost', authMiddleware, DeleteCarCost);

// ----------------------------------------------------------------------

export default router;