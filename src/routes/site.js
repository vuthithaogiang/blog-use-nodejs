import express from 'express';
import siteController from '../app/controllers/SiteController/index.js';

const routerSite = express.Router();

routerSite.get('/search', siteController.search);
routerSite.get('/', siteController.index);

export default routerSite;
