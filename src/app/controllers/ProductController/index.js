import MyModel from '../../models/Product.js';

import { mongooseToObject } from '../../../until/mongoose.js';

class ProductController {
    // GET products/:slug
    show(rep, res, next) {
        MyModel.findOne({ slug: rep.params.slug })
            .then((product) => {
                res.render('products/show', {
                    product: mongooseToObject(product),
                });
            })

            .catch(next);
    }

    //GET: products/create
    create(rep, res, next) {
        res.render('products/create');
    }

    //POST: products/store
    store(rep, res, next) {
        const formData = rep.body;
        formData.image = `https://img.youtube.com/vi/${rep.body.videoId}/sddefault.jpg`;
        const product = new MyModel(formData);
        product
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

const productController = new ProductController();

export default productController;
