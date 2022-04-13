import React, { useState } from 'react';
import { ProductMongo } from '/imports/api/product';
import { useTracker } from 'meteor/react-meteor-data';
import { ProductForm } from './ProductForm';

const deleteProduct = ({ _id }) => ProductMongo.remove(_id);

export const ProductList = () => {
    const products = useTracker(() => ProductMongo.find({}, { sort: { createdAt: -1 } }).fetch());

    return <div className='tables'> 
                <table>
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => <Product key={product._id} product={product} />)}
                    </tbody>
                </table>
                <ProductForm />
            </div>
}

const Product = ({product}) => {
    return <tr>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>$ {product.price}</td>
                <td><button className='right-button' onClick={ () => deleteProduct(product) }>&times;</button></td>
           </tr>
}