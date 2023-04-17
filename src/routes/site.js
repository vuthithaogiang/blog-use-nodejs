import express from 'express';
import siteController from '../app/controllers/SiteController/index.js';

const routerSite = express.Router();

routerSite.use('/search', siteController.search);
routerSite.use('/', siteController.index);

export default routerSite;
