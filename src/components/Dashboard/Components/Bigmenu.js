import React from 'react';
import Filter from './Filter';
import RssEpisode from './RssEpisode';
import bbckaldi from '../../../apis/bbckaldi';
import rssAdd from '../../../images/addFeedPlus.svg';

class Bigmenu extends React.Component {
  renderRss = () => {
    if (this.props.rssFeedList) {
      const { rssFeedList } = this.props;

      const mappedrss = rssFeedList.map((ele, index) => {
        return (
          <RssEpisode
            index={index}
            key={ele._id}
            title={ele.title}
            author={ele.author}
            category={ele.categories.join(', ')}
            date={ele.createdAt.split('T')[0]} 
            language={ele.language}//pass the category when it comes from backend
            id={ele._id}
            deleteEpisode={this.deleteRss}
          />
        );
      });
      return mappedrss;
    } else {
      return <h1>Loading</h1>;
    }
  };
  deleteRss = async (id, index) => {
    await bbckaldi
      .delete('/rss/' + id)
      .then((response) => {
        if (response.status === 200) {
          console.log('Episode deleted successfully');
        }
      })
      .catch((err) => console.log(err.response.data.msg));
    this.props.rssFeedList.splice(index, 1);
    this.setState({ tab: true });
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
                <img
                  src={rssAdd}
                  alt='add'
                  style={{ marginRight: '10px', height: '22px' }}
                />
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
