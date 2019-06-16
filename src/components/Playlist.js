import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: props.tracks,
      side: props.side
    };
  }
  
  onTrackTopList = (trackIndex) => {
    
    let allTracks = this.state.tracks;
    const remove = allTracks[trackIndex]
    allTracks.splice(trackIndex, 1);
    allTracks.unshift(remove);
    this.setState({
      tracks: allTracks,
    });
  }

  render() {
    const { tracks, side } = this.state;

    const calculatePlayTime = (allTracks) => {
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
    const trackCount = tracks.length;
    const playtime = calculatePlayTime(tracks);
    const trackElements = tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (
        <Track
          key={track.id}
          onTopClick={this.onTrackTopList}
          index={i}
          {...track}
        />
      );
    });

    return (
      <div className="playlist">
        <h2>{side} Playlist</h2>
        <p>
          {trackCount} tracks - {playtime}
        </p>
        <ul className="playlist--track-list">
          {trackElements}
        </ul>
      </div>
    );

  };
}

Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string,

}

export default Playlist;