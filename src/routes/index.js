import routerNews from './news.js';
import routerSite from './site.js';
import routerDetails from './product.js';
import routerMe from './me.js';

function route(app) {
    app.use('/me', routerMe);
    app.use('/news', routerNews);
    app.use('/products', routerDetails);
    app.use('/', routerSite);
}

export default route;
