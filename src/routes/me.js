import express from 'express';
import meController from '../app/controllers/MeController/index.js';
const routerMe = express.Router();
routerMe.get('/stored/products', meController.storedProducts);
routerMe.get('/trash/products', meController.trashProducts);

export default routerMe;
