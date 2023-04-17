import MyModel from '../../models/Product.js';

import { multiMongooseToObject } from '../../../until/mongoose.js';

class MeController {
    // GET /me/stored/products
    storedProducts(req, res, next) {
        MyModel.find({})
            .then((products) =>
                res.render('me/stored-products', {
                    products: multiMongooseToObject(products),
                }),
            )

            .catch(next);
    }
}

const meController = new MeController();
export default meController;
