import routerNews from './news.js';
import routerSite from './site.js';
import routerDetails from './product.js';

function route(app) {
    app.use('/news', routerNews);
    app.use('/products', routerDetails);
    app.use('/', routerSite);
}

export default route;
