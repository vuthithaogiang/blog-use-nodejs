class NewsController {
    // GET: /news
    index(rep, res) {
        res.render('news');
    }
    // GET /news/slug
    show(rep, res) {
        res.send('news details');
    }
}

const newsController = new NewsController();

export default newsController;
