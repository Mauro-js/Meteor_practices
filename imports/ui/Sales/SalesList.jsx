import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { SalesMongo } from '/imports/api/sales';
import { SalesForm } from './SalesForm';

import moment from 'moment'

export const SalesList = () => {
    const sales = useTracker(() => SalesMongo.find({}, { sort: { createdAt: -1 } }).fetch());

    return <div className='tables'> 
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => <Sales key={sale._id} sale={sale} />)}
                    </tbody>
                </table>
                <SalesForm />
            </div>
}

const Sales = ({sale}) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleShow = e => {
      setShowModal(!showModal);
    };

    const date = moment(sale.createdAt).format("YYYY-MM-DD HH:mm:ss");
    return <>
                <tr onClick={() => handleShow()}>
                    <td>{date}</td>
                    <td>$ {sale.total}</td>
                </tr>
                {showModal && <Modal sale={sale} date={date} closeModal={handleShow}/>}
           </>
}


const Modal = ({sale,date, closeModal}) => {

    return <div className="modal">
              <div className="modal-content">
                <button className='right-button' onClick={() => closeModal()}>&times;</button>
                    <h2 className="title-product-form">{date}</h2>
                <div className='tables'> 
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Count</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSON.parse(sale.products).map(product => <Product key={product.name} product={product}/>)}
                        </tbody>
                    </table>
                </div>
                <h3>Total : $ {sale.total}</h3>
              </div>
            </div>

  }

  const Product = ({product}) => {
    return <tr>
                <td>{product.name}</td>
                <td>{product.count}</td>
                <td>$ {product.price}</td>
           </tr>
}