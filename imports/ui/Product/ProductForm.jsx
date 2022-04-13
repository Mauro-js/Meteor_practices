import React, { useState } from 'react';
import { ProductMongo } from '/imports/api/product';
import { BrandMongo } from '/imports/api/brand';
import { useTracker } from 'meteor/react-meteor-data';


export const ProductForm = () => {
    const [showModal, setShowModal] = useState(false);
    const brands = useTracker(() => BrandMongo.find({}, { sort: { name: 1 } }).fetch());
  
    const handleShow = e => {
      setShowModal(!showModal);
    };
   
    return (<>
    <button className='right-button' onClick={() => handleShow()}>
      Add Product
    </button>
    {showModal && <Modal brands={brands} closeModal={handleShow}/>}
    </>);
  };

  
const Modal = ({brands, closeModal}) => {
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);


    const handleSubmit = e => {
      e.preventDefault();
    
      ProductMongo.insert({
        brand: brand,
        name: name,
        stock: stock,
        price: price,
        createdAt: new Date()
      });
  
      setBrand("");
      setName("");
      setStock("");
      setPrice("");

      closeModal();
    };

    if(!brands) return <div className="modal">
                        <div className="modal-content">
                          <button className='right-button' onClick={() => closeModal()}>&times;</button>
                              <h2 className="title-product-form" >No brands entered, please enter one</h2>
                            <button className='right-button' onClick={() => closeModal()}>Accept</button>
                        </div>
                      </div>


    return <div className="modal">
              <div className="modal-content">
                <button className='right-button' onClick={() => closeModal()}>&times;</button>
                <h2 className="title-product-form" >Add new product</h2>
                <form className="generic-form product-form" onSubmit={handleSubmit}>
                  <h4>Brand :</h4>
                  <input
                    type="text"
                    placeholder="Name"
                    value={brand}
                    list="brands"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  <datalist id="brands">
                    {brands.map(brand => <option key={brand._id}>{brand.name}</option>)}
                  </datalist>
                  <h4>Name :</h4>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <h4>Stock :</h4>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <h4>Price :</h4>
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button  type="submit" className='right-button'>Accept</button>
                </form>
              </div>
            </div>

  }