import React from 'react';
import Filter from './Filter';
import RssEpisode from './RssEpisode';
import bbckaldi from '../../../apis/bbckaldi';
import rssAdd from '../../../images/addFeedPlus.svg';

class Bigmenu extends React.Component {
  renderRss = () => {
    if (this.props.rss) {
      const { rss } = this.props;

      const mappedrss = rss.map((ele, index) => {
        return (
          <RssEpisode
            index={index}
            key={ele.id}
            title={ele.title}
            category='Podcast Category' //pass the category when it comes from backend
            id={ele.id}
            published={ele.published}
            duration={ele.duration}
            deleteEpisode={this.deleteEpisode}
          />
        );
      });
      return mappedrss;
    } else {
      return <h1>Loading</h1>;
    }
  };
  deleteEpisode = async (id, index) => {
    await bbckaldi
      .delete('/episode/' + id)
      .then((response) => {
        if (response.status === 200) {
          console.log('Episode deleted successfully');
        }
      })
      .catch((err) => console.log(err.response.data.msg));
    this.props.rss.splice(index, 1);
    this.setState({tab:true})
  };

  render() {
    return (
      <div className='box-big'>
        <div className='box-middle-content'>
          <div className='row align-items-center' style={{ width: '100%' }}>
            <div className='col-9'>
              <Filter />
            </div>
            <div className='col-3'>
              <button
                className='add-button'
                onClick={(e) => {
                  this.props.getRSSModal();
                }}
              >
                <img src={rssAdd} alt='add' style={{ marginRight: '10px', height: '22px' }} />
                Add Feed
              </button>
            </div>
          </div>
          {this.renderRss()}
          <br />
        </div>
      </div>
    );
  }
}

export default Bigmenu;
