import mongoose from 'mongoose';
//mongodb://localhost:27017
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/data_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('Connect successfuly!');
    } catch (error) {
        console.log('Connect failed!');
    }
}

export default connect;
