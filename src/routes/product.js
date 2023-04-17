import express from 'express';
import productController from '../app/controllers/ProductController/index.js';

const routerDetails = express.Router();

routerDetails.get('/:slug', productController.show);

export default routerDetails;
