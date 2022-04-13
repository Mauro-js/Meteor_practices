import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrandMongo } from '/imports/api/brand';
import { Brand } from './Brand';
import { BrandForm } from './BrandForm';
import { LoginForm } from './LoginForm';

const toggleChecked = ({ _id, isChecked }) => {
  BrandMongo.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteBrand = ({ _id }) => BrandMongo.remove(_id);

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const [hideCompleted, setHideCompleted] = useState(false);
  const brands = useTracker(() => BrandMongo.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());


  const pendingBrandsCount = useTracker(() =>
    BrandMongo.find(hideCompletedFilter).count()
  );

  const pendingBrandsTitle = `${
    BrandMongo ? ` (${pendingBrandsCount})` : ''
  }`;

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      {user ? (<>
              <button className="user" onClick={logout}>
                {user.username} 🚪
              </button>
                <header>
                  <div className="app-bar">
                    <div className="app-header">
                      <h1>📝️ Brands List{pendingBrandsTitle}</h1>
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
               </>) :(
          <LoginForm />
        )}
    </div>
  );
};