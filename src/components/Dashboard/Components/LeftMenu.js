import React from 'react';

class LeftMenu extends React.Component {
  render() {
    return (
      <div className='box-left'>
        <div className='item'>
          <i className='fas fa-plus'></i> New Episode
        </div>
        <div className='item'>
          <i className='far fa-edit'> </i>
          <span onClick={this.props.handleClick('isEdited')}>
            Edited Episodes{' '}
          </span>
        </div>
        <div className='item'>
          <i className='fas fa-rss'> </i>
          <span onClick={this.props.handleClick('rss')}>
            {' '}
            RSS feed Episodes
          </span>
        </div>
        <div className='item'>
          <i className='fas fa-upload'> </i>
          <span onClick={this.props.handleClick('manual')}>
            {' '}
            Uploaded Files
          </span>
        </div>
      </div>
    );
  }
}
export default LeftMenu;
