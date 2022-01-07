import React, { Component } from 'react';
import PDFViewer from 'pdf-viewer-reactjs'
import {FaCross, FaTimes} from "react-icons/all";
export default class PDFFileViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title:props.title,
            isOpen: props.isOpen,
            file:props.url,
            poster:props.poster,
            numPages:0,
            pageNum:1
        };
    }

    onDocumentLoadSuccess({ numPages }) {
        this.setState({numPages});
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
                      <PDFViewer
                          css={"pdfcontainer"}
                          navigation={{
                            css:{
                                navbarWrapper:'pdf-bottom-bar'
                            }
                          }
                          }
                          document={{
                              base64: window.getFileSteam(this.state.file),
                          }}
                      />
                      {/*<ReactPlayer autoplay controls={true} url={this.state.video} />*/}
                  </div>
                )}
            </div>
        );
    }
}
