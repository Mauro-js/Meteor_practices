import React, { useState, useEffect } from 'react';
import { ProductMongo } from '/imports/api/product';
import { SalesMongo } from '/imports/api/sales';
import { useTracker } from 'meteor/react-meteor-data';

export const SalesForm = () => {
    const [showModal, setShowModal] = useState(false);
  
    const handleShow = e => {
      setShowModal(!showModal);
    };
   
    return (<>
    <button className='right-button' onClick={() => handleShow()}>
      Add Sale
    </button>
    {showModal && <Modal closeModal={handleShow}/>}
    </>);
  };

  
const Modal = ({closeModal}) => {
    const [productInput, setProductInput] = useState("");
    const [countProduct, setCountProduct] = useState(0);
    const [total, setTotal] = useState(0);
    const [productsSelected,setProductsSelected] = useState([]);

    const products = useTracker(() => ProductMongo.find({}, { sort: { name: 1 } }).fetch());

    const handleAddProduct = (e) => {
        e.preventDefault();
        if(countProduct != 0 && productInput != "")
        {
            const addProduct = products.filter(element => element.name === productInput)[0];
            setProductsSelected([{  
                                    name:addProduct.name,
                                    count: countProduct,
                                    price:addProduct.price*countProduct
                                }, ...productsSelected]);


            setTotal(addProduct.price*countProduct);

            setProductInput("");
            setCountProduct(0);
        }
    }

    const handleSubmit = e => {
      e.preventDefault();

      SalesMongo.insert({
        products: JSON.stringify(productsSelected),
        total: total,
        createdAt: new Date()
      });

      productsSelected.map(product => {
        const updateProduct = products.filter(element => element.name === product.name)[0];
        ProductMongo.update(updateProduct['_id'], {
          $set: {
            stock: (updateProduct.stock - product.count) 
          }
        })
      })

      closeModal();
    };

    return <div className="modal">
              <div className="modal-content">
                <button className='right-button' onClick={() => closeModal()}>&times;</button>
                <h2 className="title-product-form" >Add sale</h2>
                <form onSubmit={handleSubmit}>
                    <div className='product-form' >
                        <div>
                            <h4>Products :</h4>
                            <input
                                type="text"
                                placeholder="Name"
                                value={productInput}
                                list="product"
                                onChange={(e) => setProductInput(e.target.value)}
                            />
                        </div>
                        <datalist id="product">
                            {products.map(product => <option key={product._id}>{product.name}</option>)}
                        </datalist>
                        <div>
                            <h4>Count :</h4>
                            <input
                                type="number"
                                placeholder="Count"
                                value={countProduct}
                                onChange={(e) => setCountProduct(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={(e)=>handleAddProduct(e)} className='right-button' >Add product</button>
                    <TableSale productsSelected={productsSelected} />
                    <h3>Total : $ {total}</h3>
                    <button  type="submit" className='right-button'>Accept</button>
                </form>
                
              </div>
            </div>

  }

  const TableSale = ({productsSelected}) => {
    if(productsSelected.length === 0) return <></>;
    
    return <div className='tables'> 
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsSelected.map(product => <Product key={product.name} product={product}/>)}
                    </tbody>
                </table>
            </div>
  }

  const Product = ({product}) => {
    return <tr>
                <td>{product.name}</td>
                <td>{product.count}</td>
                <td>$ {product.price}</td>
           </tr>
}