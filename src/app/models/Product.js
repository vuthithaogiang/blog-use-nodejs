import mongoose from 'mongoose';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema({
    id: { type: Number },
    name: { type: String, maxLength: 255, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, require: true },
    level: { type: String },
    slug: { type: String, unique: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

// Add plugin for soft delete

Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const MyModel = mongoose.model('Product', Product);

export default MyModel;
