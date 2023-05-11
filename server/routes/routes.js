import {Router} from 'express';
const router = Router();

import {Login, Registration, Refresh, Logout} from '../controllers/auth.js';
import {CreateCar, GetAllCar, GetCarById, DeleteCar, EditCar} from '../controllers/car.js';
import {AddCost, GetAllCarCosts, EditCarCost, DeleteCarCost} from '../controllers/costsCar.js';

import authMiddleware from '../middleware/auth.js';

// ----------------------------------------------------------------------

// Auth
router.post('/registration', Registration);
router.post('/login', Login);
router.post('/refresh', Refresh);
router.post('/logout', authMiddleware, Logout);

router.get('/my-account', authMiddleware, (req, res) => {
  return res.status(200).json({ role: ['test'] });
});

// Car
router.post('/createCar', authMiddleware, CreateCar);
router.get('/GetAllCar', authMiddleware, GetAllCar);
router.post('/GetCarById', authMiddleware, GetCarById);
router.delete('/DeleteCar', authMiddleware, DeleteCar);
router.put('/EditCar', authMiddleware, EditCar);

// Car costs
router.post('/AddCost', authMiddleware, AddCost);
router.get('/GetAllCarCosts', authMiddleware, GetAllCarCosts);
router.put('/EditCarCost', authMiddleware, EditCarCost);
router.delete('/DeleteCarCost', authMiddleware, DeleteCarCost);

// ----------------------------------------------------------------------

export default router;