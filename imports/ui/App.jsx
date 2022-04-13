import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { BrandList } from './Brand/BrandList';
import { ProductList } from './Product/ProductList';
import { SalesList } from './Sales/SalesList';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [sectionSelected, setSectionSelected] = useState('products');

  const handleSelect = (option) => {
    setSectionSelected(option);
  }

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      {user ? (<>
              <button className="right-button" onClick={logout}>
                {user.username} 🚪
              </button>
                <header>
                  <div className="app-bar">
                    <div className="app-header">
                      <button className={`header-button ${sectionSelected === 'brands' && 'header-button-selected'}`} onClick={() => handleSelect('brands')}>Brands</button>
                      <button className={`header-button ${sectionSelected === 'products' && 'header-button-selected'}`} onClick={() => handleSelect('products')}>Products</button>
                      <button className={`header-button ${sectionSelected === 'sales' && 'header-button-selected'}`} onClick={() => handleSelect('sales')}>Sales</button>
                    </div>
                  </div>
                </header>
                {sectionSelected === 'brands' && <BrandList />}
                {sectionSelected === 'products' && <ProductList />}
                {sectionSelected === 'sales' && <SalesList />}
               </>) :(
          <LoginForm />
        )}
    </div>
  );
};