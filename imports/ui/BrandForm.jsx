import React, { useState } from 'react';
import { BrandMongo } from '/imports/api/brand';

export const BrandForm = () => {
    const [text, setText] = useState("");
  
    const handleSubmit = e => {
      e.preventDefault();
  
      if (!text) return;
  
      BrandMongo.insert({
        name: text.trim(),
        createdAt: new Date()
      });
  
      setText("");
    };
   
    return (
      <form className="generic-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type to add new brand"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
  
        <button type="submit">Add Brand</button>
      </form>
    );
  };