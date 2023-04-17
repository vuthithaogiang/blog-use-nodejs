class SiteController {

    // GET /

    index(rep, res) {
        res.render('home')
    }
    // GET /search
    search(rep, res) {
        res.render('search')
    }
}

const siteController = new SiteController;

export default siteController;