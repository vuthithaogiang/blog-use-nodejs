import MyModel from '../../models/Product.js';

import { mongooseToObject } from '../../../until/mongoose.js';

class ProductController {
    // GET products/:slug
    show(rep, res, next) {
        MyModel.findOne({ slug: rep.params.slug })
            .then((product) => {
                res.render('courses/show', {
                    product: mongooseToObject(product),
                });
            })

            .catch(next);
    }
}

const productController = new ProductController();

export default productController;
