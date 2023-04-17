import express from "express";
import newsController from "../app/controllers/NewsController/index.js";


const routerNews = express.Router();

routerNews.use('/:slug', newsController.show);
routerNews.use('/', newsController.index);

export default routerNews;