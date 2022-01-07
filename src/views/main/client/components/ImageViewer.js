import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


export default class ImageViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: props.photoIndex,
            isOpen: props.isOpen,
            images:props.images
        };
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        return (
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={this.state.images[photoIndex]}
                        // nextSrc={this.state.images[(photoIndex + 1) % this.state.images.length]}
                        // prevSrc={this.state.images[(photoIndex + this.state.images.length - 1) % this.state.images.length]}
                        onCloseRequest={() => this.props.close()}
                        // onMovePrevRequest={() =>
                        //     this.setState({
                        //         photoIndex: (photoIndex + this.state.images.length - 1) % this.state.images.length,
                        //     })
                        // }
                        // onMoveNextRequest={() =>
                        //     this.setState({
                        //         photoIndex: (photoIndex + 1) % this.state.images.length,
                        //     })
                        // }
                    />
                )}
            </div>
        );
    }
}
