import React from 'react';
import PropTypes from 'prop-types';
// import Media from './media';
import MediaContainer from '../containers/media';
import './playlist.css';

function Playlist (props) {
  return (
    <div className="Playlist">
      {
        props.playlist.map((mediaId) => {
          return <MediaContainer openModal={props.handleOpenModal} id={mediaId} key={mediaId} />
        })
      }
    </div>
  )
}


Playlist.propTypes = {
  data: PropTypes.object,
}

export default Playlist;
