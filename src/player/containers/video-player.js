import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from '../components/video';
import Title from '../components/title';
import PlayPause from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls'
import { formatTime } from '../../libs/utilites';
import { fullScreen } from '../../libs/utilites';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume';
import FullScreen from '../components/full-screen';
import { connect } from 'react-redux';

class VideoPlayer extends Component {
  state = {
    pause: true,
    duration: 0,
    currentTime: 0,
    timeFloat: 0,
    durationFloat: 0,
    loading: false,
    volume: 1,
    lastVolumeState: null,
  }
  togglePlay = (event) => {
    this.setState ({
      pause: !this.state.pause
    })
  }
  componentDidMount() {
    this.setState ({
      pause: (!this.props.autoplay)
    })
  }
  handleLoadedMetadata = event => {
    this.video = event.target;
    this.setState ({
      duration: formatTime( this.video.duration ),
      durationFloat: this.video.duration
    });
  }
  handleTimeUpdate = event => {
    this.video = event.target;
    this.setState ({
      currentTime: formatTime( this.video.currentTime ),
      timeFloat: this.video.currentTime
    })
  }
  handleProgressChange = event => {
    this.video.currentTime = event.target.value
  }
  handleSeeking = event => {
    this.setState ({
      loading: true
    })
  }
  handleSeeked = event => {
    this.setState ({
      loading: false
    })
  }
  handleVolumenChange = event => {
    this.video.volume = event.target.value;
  }
  mute = () => {
    const lastState = this.video.volume
    this.setState ({
      lastVolumeState: lastState,
      volume: 0
    })
    this.video.volume = 0
  }
  unmute = () => {
    this.setState ({
      volume: this.state.lastVolumeState
    })
    this.video.volume = this.state.lastVolumeState
  }
  handleVolumeMute = event => {
    this.video.volume !== 0 ? this.mute() : this.unmute()
  }
  handleFullScreenClick = event => {
    !fullScreen.isFullScreen() ?
    fullScreen.requestFullScreen(this.player) :
    fullScreen.exitFullScreen()
  }
  setRef = element => {
    this.player = element
  }
  render(){
    return (
      <VideoPlayerLayout
        setRef={this.setRef}
      >
        <Title
          title={this.props.media.get('title')}
        />
        <Controls>
          <PlayPause
          pause={this.state.pause}
          handleClick={this.togglePlay}
          />
          <Timer
            duration={this.state.duration}
            currentTime={this.state.currentTime}
          />
          <ProgressBar
            duration={this.state.durationFloat}
            value={this.state.timeFloat}
            handleProgressChange={this.handleProgressChange}
          />
          <Volume
            handleVolumenChange={this.handleVolumenChange}
            handleClick={this.handleVolumeMute}
            value={this.state.volume}
          />
          <FullScreen
            handleFullScreenClick={this.handleFullScreenClick}
          />
        </Controls>
        <Spinner
          active={this.state.loading}
        />
        <Video
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
          src={this.props.media.get('src')}
        />
      </VideoPlayerLayout>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    media: state.get('data').get('entities').get('media').get(props.id)
  }
}

export default connect(mapStateToProps)(VideoPlayer);
