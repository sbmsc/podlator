import React from 'react';
import { Table } from 'react-bootstrap';

const Billing = () => {
  return (
    <div className='billing-container'>
      <div className='row'>
        <div className='col'>
          <div className='billing-box-title'>
            <h2>Payment Method</h2>
          </div>
          <div className='billing-box-bottom-text'>
            <span>Update Payment Method</span>
          </div>
        </div>
        <div className='col'>
          <div className='billing-box-title'>
            <h2>Billing Address</h2>
          </div>
          <div className='billing-box-bottom-text'>
            <span>Update Billing Address</span>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='billing-box-title'>
            <h2>Invoices</h2>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Download Invoice</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12/07/2020</td>
                <td>IN-785</td>
                <td>
                  <i className='fa fa-download'></i>
                  <i className='far fa-file-pdf'></i>
                </td>
                <td>$15.99</td>
              </tr>
              <tr>
                <td>12/07/2020</td>
                <td>IN-785</td>
                <td>
                  <i className='fa fa-download'></i>
                  <i className='far fa-file-pdf'></i>
                </td>
                <td>$15.99</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
