import React from 'react';
import Navbar from '../Navbar/Navbar';
import Transcript from './Transcripter';

export default class Transcriber extends React.Component {
  state = {
    title: this.props.location.title ? this.props.location.title : '',
    image: this.props.location.image ? this.props.location.image : '',
  };

  getTitle = (data) => {
    this.setState({ title: data.title, image: data.img });
  };
  render() {
    return (
      <div style={{ height: '100vh', padding: '20px 20px 20px 20px' }}>
        <Navbar title={this.state.title} img={this.state.image} />
        <Transcript
          id={this.props.location.id}
          rss={this.props.location.rss}
          getTitle={this.getTitle}
        />
      </div>
    );
  }
}
