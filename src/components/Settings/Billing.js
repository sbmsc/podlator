import React from 'react';
import { Table } from 'react-bootstrap';
import bbckaldi from '../../apis/bbckaldi';
import Modal from 'react-modal';
import moment from 'moment';

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: '',
      selectedOption: false,
      cardDetails: {
        name: '',
        number: '',
        expiry: '',
        last4: '',
      },
      addressDetails: {
        city: '',
        country: '',
        line1: '',
        line2: '',
        postalCode: '',
        state: '',
      },
      invoices: [],
    };
  }

  componentDidMount = () => {
    this._bootstrap();
    this.getInvoices();
  };

  _bootstrap = async () => {
    await bbckaldi
      .get('/user')
      .then((response) => {
        const card = response.data.card;
        const address = response.data.address;
        if (card) {
          this.setState({
            cardDetails: {
              name: card.name,
              last4: card.last4.substr(card.last4.length - 4),
              expiry: card.expiry,
              number: card.last4,
            },
          });
        }

        if (address) {
          this.setState({
            addressDetails: {
              city: address.city,
              country: address.country,
              line1: address.line1,
              line2: address.line2,
              postalCode: address.postalCode,
              state: address.state,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getInvoices = async () => {
    await bbckaldi
      .get('/invoices')
      .then((response) => {
        this.setState({ invoices: response.data });
      })
      .catch((err) => {
        console.log('Error getting invoices');
      });
  };
  listInvoices = () => {
    if (this.state.invoices.length < 1) {
      return <h2 style={{ margin: '20px' }}>You dont have any invoice yet!</h2>;
    }
    const mappedInvoices = this.state.invoices.map((e) => {
      return (
        <tr key={e.number}>
          <td>{moment(e.created).format('L')}</td>
          <td>{e.number}</td>
          <td>
            <a href={e.pdfUrl} style={{ color: 'black' }}>
              <i className='fa fa-download'></i>
              <i className='far fa-file-pdf'></i>
            </a>
          </td>
          <td>
            {e.currency === 'eur' ? <span>&euro;</span> : e.currency}
            {e.amount}
          </td>
        </tr>
      );
    });
    return mappedInvoices;
  };
  openModal = (type) => {
    this.setState({
      selectedOption: true,
      activeModal: type,
    });
  };

  closeModal = () => {
    this.setState(() => {
      return {
        selectedOption: false,
      };
    });
  };

  handleCardDetails = (e) => {
    const { cardDetails } = this.state;
    if (e.target.name === 'number') {
      this.setState({
        cardDetails: {
          ...cardDetails,
          [e.target.name]: e.target.value,
          last4: e.target.value.substr(e.target.value.length - 4),
        },
      });
    } else {
      this.setState({
        cardDetails: { ...cardDetails, [e.target.name]: e.target.value },
      });
    }
  };
  handleAddressDetails = (e) => {
    const { addressDetails } = this.state;
    this.setState({
      addressDetails: { ...addressDetails, [e.target.name]: e.target.value },
    });
  };
  updateAddressDetails = async (e) => {
    const { addressDetails } = this.state;
    await bbckaldi
      .put('/user', {
        address: addressDetails,
      })
      .then((resp) => alert('address updated successfully'))
      .catch((err) => alert('couldnt update address'));

    this.closeModal();
  };
  updateCardDetails = async (e) => {
    const { cardDetails } = this.state;
    await bbckaldi
      .put('/user', { card: cardDetails })
      .then((resp) => alert('card updated successfully'))
      .catch((err) => alert('couldnt update card'));

    this.closeModal();
  };
  render() {
    const cardDetails = this.state.cardDetails;
    const addressDetails = this.state.addressDetails;
    return (
      <div className='billing-container'>
        <Modal
          isOpen={this.state.selectedOption}
          onRequestClose={this.closeModal}
          contentLabel='sometext'
          closeTimeoutMS={200}
          ariaHideApp={false}
          className='uploadModal'
          style={{
            overlay: {
              backgroundColor: 'rgb(33,142,232,0.9)',
            },
          }}
        >
          {this.state.activeModal === 'payment' ? (
            <div className='settingsmodal'>
              <h1>Update Billing Details</h1>
              <input
                placeholder='Name on card'
                name='name'
                onChange={this.handleCardDetails}
                value={cardDetails.name}
              ></input>
              <input
                placeholder='Card Number'
                type='number'
                name='number'
                onChange={this.handleCardDetails}
                value={cardDetails.number}
              ></input>
              <input
                placeholder='Expiry Date'
                name='expiry'
                onChange={this.handleCardDetails}
                value={cardDetails.expiry}
              ></input>
              <button className='bluebutton' onClick={this.updateCardDetails}>
                Update Details
              </button>
            </div>
          ) : (
            <div className='settingsmodal'>
              <input
                placeholder='Address line 1'
                name='line1'
                onChange={this.handleAddressDetails}
                value={addressDetails.line1}
              ></input>
              <input
                placeholder='Address line 2'
                name='line2'
                onChange={this.handleAddressDetails}
                value={addressDetails.line2}
              ></input>
              <input
                placeholder='city'
                name='city'
                onChange={this.handleAddressDetails}
                value={addressDetails.city}
              ></input>
              <input
                placeholder='state'
                name='state'
                onChange={this.handleAddressDetails}
                value={addressDetails.state}
              ></input>
              <input
                placeholder='country'
                name='country'
                onChange={this.handleAddressDetails}
                value={addressDetails.country}
              ></input>
              <input
                placeholder='postal code'
                name='postalCode'
                onChange={this.handleAddressDetails}
                value={addressDetails.postalCode}
              ></input>
              <button
                className='bluebutton'
                onClick={this.updateAddressDetails}
              >
                Update Details
              </button>
            </div>
          )}
        </Modal>

        <div className='row'>
          <div className='col'>
            <div className='billing-box-title'>
              <h2>Payment Method</h2>
            </div>
            {this.state.cardDetails.name ? (
              <div className='billing-box-details'>
                <h2>{cardDetails.name}</h2>
                <br />
                <h4>XXXX XXXX XXXX {cardDetails.last4}</h4>
                <br />
                <h4>Expiry {cardDetails.expiry}</h4>
              </div>
            ) : (
              <div className='billing-box-details'>
                <h2>Please Update Payment Details</h2>
              </div>
            )}
            <div className='billing-box-bottom-text'>
              <span onClick={() => this.openModal('payment')}>
                Update Payment Method
              </span>
            </div>
          </div>

          <div className='col'>
            <div className='billing-box-title'>
              <h2>Billing Address</h2>
            </div>
            {this.state.addressDetails.city ? (
              <div className='billing-box-details'>
                <h2>{addressDetails.line1}</h2>
                <h3>{addressDetails.line2}</h3>
                <h3>
                  {addressDetails.city}, {addressDetails.state},{' '}
                  {addressDetails.country}
                </h3>
                <h3>{addressDetails.postalCode}</h3>
              </div>
            ) : (
              <div className='billing-box-details'>
                <h2>Please Update Billing Details</h2>
              </div>
            )}

            <div className='billing-box-bottom-text'>
              <span onClick={() => this.openModal('address')}>
                Update Billing Address
              </span>
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
              <tbody>{this.listInvoices()}</tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
