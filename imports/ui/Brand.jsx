import React from 'react';

export const Brand = ({ brand, onCheckboxClick, onDeleteClick }) => {
    return (
      <li>
        <input
          type="checkbox"
          checked={!!brand.isChecked}
          onClick={() => onCheckboxClick(brand)}
          readOnly
        />
        <span>{brand.name}</span>
        <button onClick={ () => onDeleteClick(brand) }>&times;</button>
      </li>
    );
  };