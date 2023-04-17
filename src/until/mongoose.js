export const multiMongooseToObject = (mongooseArray) => {
    return mongooseArray.map((mongoose) => mongoose.toObject());
};

export const mongooseToObject = (mongose) => {
    return mongose ? mongose.toObject() : mongose;
};
