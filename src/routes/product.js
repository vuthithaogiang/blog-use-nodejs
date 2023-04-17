import express from 'express';
import productController from '../app/controllers/ProductController/index.js';

const routerDetails = express.Router();

routerDetails.get('/create', productController.create);
routerDetails.post('/store', productController.store);
routerDetails.get('/:id/edit', productController.edit);
routerDetails.put('/:id', productController.update);
routerDetails.get('/:slug', productController.show);

export default routerDetails;
