import React, { useState, useEffect } from 'react';
import {Button, Row,OverlayTrigger,Tooltip} from 'react-bootstrap';
import { Link, useParams,useHistory} from 'react-router-dom';
import sendAsync from "../../../message-control/renderer";
import ImageHotspots from 'react-image-hotspots'
import {FaImage, FaUndo, FaQuestion, FaFilePdf, FaVideo, FaLink, FaBackward, FaArrowLeft, FaHome} from 'react-icons/fa';

import ReactTooltip from "react-tooltip";
import ImageViewer from "./components/ImageViewer";
import VideoViewer from "./components/VideoViewer";
import PDFFileViewer from "./components/PDFFileViewer";

const DecodeIcon = (props) => {
    if(props.settings.title){
        if(props.settings.type === 'image'){
            return <div className={'marker-def'} data-tip data-for={'popover-'+props.index} onClick={props.onClick}><FaImage/></div>;
        }
        if(props.settings.type === 'pdf'){
            return <div className={'marker-def'} data-tip data-for={'popover-'+props.index} onClick={props.onClick}><FaFilePdf/></div>
        }

        if(props.settings.type === 'video'){
            return <div className={'marker-def'} data-tip data-for={'popover-'+props.index} onClick={props.onClick}><FaVideo/></div>
        }

        if(props.settings.type === 'link'){
            return <div className={'marker-def'} data-tip data-for={'popover-'+props.index} onClick={props.onClick}><FaLink/></div>
        }

    }
    return <FaQuestion/>
}

const Slide = (props) => {
    const history = useHistory();
    const {id} = useParams();
    const [slideData,setSlideData] = useState(null);
    const [markers,setMarkers] = useState([]);
    const [openImageViewer,setOpenImageViewer] = useState(false);
    const [images,setImages] = useState([]);
    const [openVideoViewer,setOpenVideoViewer] = useState(false);
    const [openPdfViewer,setOpenPdfViewer] = useState(false);
    const [popupTitle,setPopupTitle] = useState('');
    const [videoFile,setVideoFile] = useState(null);
    const [pdfFile,setPdfFile] = useState(null);
    useEffect(() => {
        if(id){
            getSlides();
        }
        console.log(id);
    },[])
    useEffect(() => {
        if(id){
            getSlides();
        }
        console.log(id);
    },[id])
    const getSlides = () => {
        window.database.getRow("SELECT * FROM slides WHERE id = "+id)
            .then((result) => {
                setSlideData(result);
               // console.log(markersDecode(JSON.parse(result.markers)));
                setMarkers(markersDecode(JSON.parse(result.markers)));
            })
        // sendAsync.getRow("SELECT * FROM slides WHERE id = "+id).then((result) =>{
        //     setSlideData(result);
        //   console.log(JSON.parse(result.markers));
        //
        //         console.log(markersDecode(JSON.parse(result.markers)));
        //         setMarkers(markersDecode(JSON.parse(result.markers)));
        //
        // })
        //     .catch((err) => {
        //        // history.push('/');
        //     });
    }

    const markersDecode = (markersd) => {
        return markersd.map((marker,index) => {
            const random = Math.floor(Math.random()*10);
            return {
                y:marker.top,
                x:marker.left,
                content: <>
                    <ReactTooltip id={'popover-'+index+''+random} type='light' effect='solid'>
                        <span>{marker.settings.title}</span>
                    </ReactTooltip>
                    <DecodeIcon index={index+''+random} onClick={() => navigateMarker(marker)} settings={marker.settings}/>
                    </>
            }
        });
    }

    const navigateMarker = (marker) => {
        switch (marker.settings.type){
            case 'link':
                goToSlide(marker.settings.slideId);
            break;
            case 'image':
                const imagePath = window.globalDir+'media/files/'+marker.settings.file;
                setImages([imagePath]);
                setOpenImageViewer(true);
            break;
            case 'video':
                const filePath = window.globalDir+'media/files/'+marker.settings.file;
                setVideoFile(filePath);
                setPopupTitle(marker.settings.title);
                setOpenVideoViewer(true);
            break;
            case 'pdf':
                const pdfPath = window.globalDir+'media/files/'+marker.settings.file;
                setPdfFile(pdfPath);
                setPopupTitle(marker.settings.title);
                setOpenPdfViewer(true);
                break;
        }
    }

    const goToSlide = (id) => {
        const random = Math.floor(Math.random()*10);
        history.push('/slide/'+id+'?rand='+random);
    }

    return (
        <>
         <div className={'float-actions'}>
             <Button variant={'outline-dark'} onClick={() => history.push('/')}><FaHome/></Button>
             <Button variant={'outline-dark'} onClick={() => history.goBack()}><FaArrowLeft/></Button>
         </div>
        {slideData &&
            <div className='slidesScreen'>
                <ImageHotspots
                    src={'file://'+window.globalDir+'media/images/'+slideData.image}
                    alt='Sample image'
                    hotspots={
                        markers
                    }
                />
            </div>
        }
        {openImageViewer && images.length > 0 && <ImageViewer close={() => {
            setOpenImageViewer(false); setImages([])
        }} isOpen={openImageViewer} photoIndex={0} images={images}/>}

        {openVideoViewer && videoFile && <VideoViewer close={() => {
            setOpenVideoViewer(false); setVideoFile(null)
        } } isOpen={openVideoViewer} title={popupTitle} poster={'file://'+window.globalDir+'media/images/'+slideData.image} url={videoFile}/>}

        {openPdfViewer && pdfFile && <PDFFileViewer close={() => {
            setOpenPdfViewer(false); setPdfFile(null)
        } } isOpen={openPdfViewer} title={popupTitle} poster={'file://'+window.globalDir+'media/images/'+slideData.image} url={pdfFile}/>}
        </>
    );
};

export default Slide;
