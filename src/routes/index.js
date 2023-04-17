import routerNews from "./news.js";
import routerSite from "./site.js";

function route(app) {
     
  app.use('/news', routerNews) ;
  app.use('/', routerSite);

  
}
 

export default route;