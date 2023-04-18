import express from 'express';
import productController from '../app/controllers/ProductController/index.js';

const routerDetails = express.Router();

routerDetails.get('/create', productController.create);
routerDetails.post('/store', productController.store);
routerDetails.get('/:id/edit', productController.edit);
routerDetails.put('/:id', productController.update);
routerDetails.patch('/:id/restore', productController.restore);
routerDetails.delete('/:id', productController.destroy);
routerDetails.delete('/:id/force', productController.forceDestroy);
routerDetails.get('/:slug', productController.show);

export default routerDetails;
