import React, { useState } from 'react';
import { ProductMongo } from '/imports/api/product';
import { useTracker } from 'meteor/react-meteor-data';
import { ProductForm } from './ProductForm';
import { BrandMongo } from '/imports/api/brand';


const deleteProduct = ({ _id }) => ProductMongo.remove(_id);

export const ProductList = () => {
    const products = useTracker(() => ProductMongo.find({}, { sort: { createdAt: -1 } }).fetch());

    return <div className='tables'> 
                <table>
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => <Product key={product._id} product={product} />)}
                    </tbody>
                </table>
                <ProductForm />
            </div>
}

const Product = ({product}) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleShow = e => {
      setShowModal(!showModal);
    };

    return <>
            <tr onClick={() => handleShow()}>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>$ {product.price}</td>
                <td><button className='right-button' onClick={ () => deleteProduct(product) }>&times;</button></td>
           </tr>
           {showModal && <Modal product={product} closeModal={handleShow}/>}
           </>
}

const Modal = ({product, closeModal}) => {
    const [brand, setBrand] = useState(product.brand);
    const [name, setName] = useState(product.name);
    const [stock, setStock] = useState(product.stock);
    const [price, setPrice] = useState(product.price);

    const brands = useTracker(() => BrandMongo.find({}, { sort: { name: 1 } }).fetch());


    const handleSubmit = e => {
      e.preventDefault();

      ProductMongo.update(product['_id'], {
        $set: {
            brand: brand,
            name: name,
            stock: stock,
            price: price,
          }
      })
  
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
                <h2 className="title-product-form" >Edit product</h2>
                <form className="generic-form" onSubmit={handleSubmit}>
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