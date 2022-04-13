import React from 'react';

export const Brand = ({ brand, onDeleteClick }) => {
    return (
      <li>
        <span>{brand.name}</span>
        <button onClick={ () => onDeleteClick(brand) }>&times;</button>
      </li>
    );
  };