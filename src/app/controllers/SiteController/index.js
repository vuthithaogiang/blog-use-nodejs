import MyModel from '../../models/Product.js';

import { multiMongooseToObject } from '../../../until/mongoose.js';

class SiteController {
    index(rep, res, next) {
        MyModel.find({})

            .then(function (documents) {
                // let products = documents.map(product => product.toObject() )

                // res.json(documents);
                res.render('home', {
                    products: multiMongooseToObject(documents),
                });
            })

            .catch((err) => next(err));
    }
    // GET /

    // GET /search
    search(rep, res) {
        res.render('search');
    }
}

const siteController = new SiteController();

export default siteController;
