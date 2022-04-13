import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrandMongo } from '/imports/api/brand';
import { Brand } from './Brand';
import { BrandForm } from './BrandForm';


export const App = () => {
  const brands = useTracker(() => BrandMongo.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <BrandForm/>

      <ul>
        {brands.length && brands.map(brand => <Brand key={ brand._id } brand={ brand }/>) }
      </ul>
    </div>
  );
};