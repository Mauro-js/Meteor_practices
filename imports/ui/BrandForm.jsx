import React, { useState } from 'react';

export const BrandForm = () => {
  const [text, setText] = useState("");

  return (
    <form className="brand-form">
      <input
        type="text"
        placeholder="Type to add new brand"
      />

      <button type="submit">Add Brand</button>
    </form>
  );
};