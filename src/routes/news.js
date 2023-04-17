import express from 'express';
import newsController from '../app/controllers/NewsController/index.js';

const routerNews = express.Router();

routerNews.get('/:slug', newsController.show);
routerNews.get('/', newsController.index);

export default routerNews;
