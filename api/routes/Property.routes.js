import express from 'express';
import { addProperty, getProperties, getProperty,deleteProperty } from '../controllers/property.controllers.js';

const router = express.Router();



router.post('/add', addProperty);
router.get('/get/:id',getProperty);
router.get('/get', getProperties);
router.delete('/delete/:id', deleteProperty);






export default router;