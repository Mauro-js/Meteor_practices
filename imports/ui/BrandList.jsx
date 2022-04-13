import React, { useState } from 'react';
import { BrandMongo } from '/imports/api/brand';
import { useTracker } from 'meteor/react-meteor-data';
import { Brand } from './Brand';
import { BrandForm } from './BrandForm';

const deleteBrand = ({ _id }) => BrandMongo.remove(_id);

export const BrandList = () => {
    const brands = useTracker(() => BrandMongo.find({}, { sort: { createdAt: -1 } }).fetch());

    return <div className="main">
            <ul className="brand">
            {brands.length && brands.map(brand => (
                <Brand
                key={brand._id}
                brand={brand}
                onDeleteClick={deleteBrand}
                />
            ))}
            </ul>
            <BrandForm />
        </div>
}