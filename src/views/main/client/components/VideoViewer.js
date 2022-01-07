import React, { Component } from 'react';
import { Player, BigPlayButton } from 'video-react';
import {FaCross, FaTimes} from "react-icons/all";

export default class VideoViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title:props.title,
            isOpen: props.isOpen,
            video:props.url,
            poster:props.poster
        };
    }

    render() {
        return (
            <div>
                {this.state.isOpen && (
                  <div className="videoContainer">
                      <div className={'top-bar'}>
                          <span className={'title'}>{this.state.title}</span>
                          <div className={'close-popup'} onClick={this.props.close}><FaTimes/></div>
                      </div>
                      <Player autoPlay={true} className={'player-container'} src={this.state.video}>
                          <BigPlayButton position="center" />
                      </Player>
                      {/*<ReactPlayer autoplay controls={true} url={this.state.video} />*/}
                  </div>
                )}
            </div>
        );
    }
}
