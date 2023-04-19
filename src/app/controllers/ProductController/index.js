import MyModel from '../../models/Product.js';
import Counter from '../../models/Counter.js';

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
        Counter.findOneAndUpdate(
            {
                id: 'autoval',
            },
            {
                $inc: { seq: 1 },
            },
            {
                new: true,
            },
        )
            .then((counter) => {
                let seqId;
                //    Init one couter
                if (counter == null) {
                    const newValue = new Counter({ id: 'autoval', seq: 1 });
                    newValue.save();
                    seqId = 1;
                } else {
                    seqId = counter.seq;
                }

                const nameInput = rep.body.name;
                rep.body.image = `https://img.youtube.com/vi/${rep.body.videoId}/sddefault.jpg`;
                rep.body.slug = titleToSlug(nameInput);
                rep.body.id = seqId;
                const product = new MyModel(rep.body);

                product
                    .save()
                    .then(() => res.redirect('/me/stored/products'))
                    .catch(next);
            })

            .catch(next);
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

    // POST: products/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                MyModel.delete({ _id: { $in: req.body.productIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            case 'restore':
                MyModel.restore({ _id: { $in: req.body.productIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force-destroy':
                console.log('case force destroy');

                break;
            default:
                res.json({ error: 'Action is invalid!!!' });
                break;
        }
    }
}

const productController = new ProductController();

export default productController;
