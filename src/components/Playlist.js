import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

// const calculatePlayTime = (tracks) => {
//   let minutes = 0;
//   let seconds = 0;
//   tracks.forEach((track) => {
//     const times = track.playtime.split(':');
//     minutes += parseInt(times[0]);
//     seconds += parseInt(times[1]);
//   });

//   minutes += Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);

//   seconds %= 60;
//   minutes %= 60;

//   seconds = ("" + seconds).padStart(2, "0");
//   minutes = ("" + minutes).padStart(2, "0");

//   return `${hours}:${minutes}:${seconds}`;
// }

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: props.side,
      tracks: props.tracks,
      trackCount: props.tracks.length,
      playtime: this.calculatePlayTime(props.tracks),
      trackElements: props.tracks.map((track, i) => {
        // We use "spread syntax" here to pass in all the properties of 
        // the variable 'track' as props. Go look it up!
        return (
          <Track
            key={track.id}
            {...track}
          /> 
        );
      })
    };
  }

  calculatePlayTime = (allTracks) => {
    let minutes = 0;
    let seconds = 0;
    allTracks.forEach((track) => {
      const times = track.playtime.split(':');
      minutes += parseInt(times[0]);
      seconds += parseInt(times[1]);
    });
  
    minutes += Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds %= 60;
    minutes %= 60;
  
    seconds = ("" + seconds).padStart(2, "0");
    minutes = ("" + minutes).padStart(2, "0");
  
    return `${hours}:${minutes}:${seconds}`;
  }
  // const tracks = props.tracks;
  // const trackCount = tracks.length;
  // const playtime = calculatePlayTime(tracks);
  // const trackElements = tracks.map((track, i) => {
  //   // We use "spread syntax" here to pass in all the properties of 
  //   // the variable 'track' as props. Go look it up!
  //   return (
  //     <Track
  //       key={track.id}
  //       {...track}
  //     /> 
  //   );
  // });

  render () {
    return (
      <div className="playlist">
        <h2>{this.state.side} Playlist</h2>
        <p>
          {this.state.trackCount} tracks - {this.state.playtime}
        </p>
        <ul className="playlist--track-list">
          {this.state.trackElements}
        </ul>
      </div>
    );
  }
}

Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string,
}

export default Playlist;
