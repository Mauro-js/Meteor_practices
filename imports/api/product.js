import { Mongo } from 'meteor/mongo';
import { BrandMongo } from './brand';

export const ProductMongo = new Mongo.Collection('product');

const ProductSchema = new SimpleSchema({
    name:{
        type: String,
        label: "Name"
    },
    stock:{
        type: Integer,
        label: "Stock",
    },
    price:{
        type: Integer,
        label: "Price"
    }

});

ProductMongo.SimpleSchema(ProductSchema);