import MyModel from '../../models/Product.js';

class SiteController {
    index(rep, res) {
        MyModel.find({})
            .then(function (documents) {
                console.log(documents);
                res.json(documents);
            })

            .catch(function (err) {
                console.log('Failed!!!!1');
            });
    }
    //    MyModel.find({}, function (err, prods) {
    //        if(!err) { res.json(prods)}
    //        else {res.status(400).json({err: 'Failed!!!'})};
    //    });
    // GET /
    // res.render('home');

    // GET /search
    search(rep, res) {
        res.render('search');
    }
}

const siteController = new SiteController();

export default siteController;
