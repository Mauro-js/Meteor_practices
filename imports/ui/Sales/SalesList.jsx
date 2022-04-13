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
    const date = moment(sale.createdAt).format("YYYY-MM-DD HH:mm:ss");
    return <tr onClick={(e) => console.log}>
                <td>{date}</td>
                <td>$ {sale.total}</td>
           </tr>
}