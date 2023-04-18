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

    //GET: products/:id/edit
    edit(rep, res, next) {
        MyModel.findById(rep.params.id)

            .then((product) =>
                res.render('products/edit', {
                    product: mongooseToObject(product),
                }),
            )

            .catch(next);
    }
    //PUT: products/:id
    update(rep, res, next) {
        MyModel.updateOne({ _id: rep.params.id }, rep.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    //DELETE: products/:id
    destroy(rep, res, next) {
        MyModel.deleteOne({ _id: rep.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

const productController = new ProductController();

export default productController;
