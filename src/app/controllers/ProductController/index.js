import MyModel from '../../models/Product.js';

import { mongooseToObject } from '../../../until/mongoose.js';
// kindacode.com
const titleToSlug = (title) => {
    let slug;

    // convert to lower case
    slug = title.toLowerCase();

    // remove special characters
    slug = slug.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        '',
    );
    // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

    // replace spaces with dash symbols
    slug = slug.replace(/ /gi, '-');

    // remove consecutive dash symbols
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');

    // remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
};

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
        const nameInput = rep.body.name;
        formData.image = `https://img.youtube.com/vi/${rep.body.videoId}/sddefault.jpg`;
        formData.slug = titleToSlug(nameInput);
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

    // DELETE: products/:id
    destroy(rep, res, next) {
        MyModel.delete({ _id: rep.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //DELETE: products/:id/force
    forceDestroy(req, res, next) {
        MyModel.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // PATCH: products/:id/restore
    restore(req, res, next) {
        MyModel.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

const productController = new ProductController();

export default productController;
