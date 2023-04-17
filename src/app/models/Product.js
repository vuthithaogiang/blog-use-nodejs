import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

const MyModel = mongoose.model('Product', Product);

export default MyModel;
