import express from 'express';
import productController from '../app/controllers/ProductController/index.js';

const routerDetails = express.Router();

routerDetails.get('/create', productController.create);
routerDetails.post('/store', productController.store);
routerDetails.get('/:slug', productController.show);

export default routerDetails;
