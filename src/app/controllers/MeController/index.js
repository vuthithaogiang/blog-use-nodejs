import MyModel from '../../models/Product.js';

import { multiMongooseToObject } from '../../../until/mongoose.js';

class MeController {
    // GET /me/stored/products
    storedProducts(req, res, next) {
        let productQuery = MyModel.find({});

        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([productQuery, MyModel.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('me/stored-products', {
                    deletedCount,
                    products: multiMongooseToObject(products),
                }),
            )

            .catch(next);

        // MyModel.countDocumentsDeleted()
        //    .then((deletedCount) => {
        //       console.log(deletedCount)
        //    })

        //    .catch(() => {});

        // MyModel.find({})
        //     .then((products) =>
        //         res.render('me/stored-products', {
        //             products: multiMongooseToObject(products),
        //         }),
        //     )

        //     .catch(next);
    }

    //GET: /me/trash/products

    trashProducts(req, res, next) {
        let productQuery =  MyModel.findDeleted({});

        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        // res.json(req.query)
        // return ;

        productQuery
          
            .then((products) =>
                res.render('me/trash-products', {
                    products: multiMongooseToObject(products),
                }),
            )

            .catch(next);
    }
}

const meController = new MeController();
export default meController;
