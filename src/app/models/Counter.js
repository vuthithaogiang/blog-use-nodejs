import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    id: { type: String },
    seq: { type: Number },
});

const Counter = mongoose.model('Counter', CounterSchema);

export default Counter;
