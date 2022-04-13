import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrandMongo } from '/imports/api/brand';
import { Brand } from './Brand';
import { BrandForm } from './BrandForm';

const toggleChecked = ({ _id, isChecked }) => {
  BrandMongo.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteBrand = ({ _id }) => BrandMongo.remove(_id);

export const App = () => {
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const [hideCompleted, setHideCompleted] = useState(false);
  const brands = useTracker(() => BrandMongo.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ Brands List</h1>
          </div>
        </div>
      </header>
      <div className="filter">
         <button onClick={() => setHideCompleted(!hideCompleted)}>
           {hideCompleted ? 'Show All' : 'Hide Completed'}
         </button>
       </div>

      <div className="main">
        <ul className="brand">
          {brands.map(brand => (
            <Brand
              key={brand._id}
              brand={brand}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteBrand}
            />
          ))}
        </ul>
        <BrandForm />
      </div>
    </div>
  );
};