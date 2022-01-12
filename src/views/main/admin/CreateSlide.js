import React, {useState, useReducer, useEffect} from 'react';
import { Col, Container, Form, Row,Button, Alert } from 'react-bootstrap';
import Header from '../../components/Header';
import {Link, useHistory, useParams} from 'react-router-dom';
import sendAsync from '../../../message-control/renderer';
import ImageMarker from "react-image-marker";
import ImageHotspots from "react-image-hotspots";
import { FaImage,FaUndo,FaQuestion, FaFilePdf, FaVideo, FaLink } from 'react-icons/fa';
import {Menu, Item, Separator, Submenu, useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import SettingsModal from "./components/SettingsModal";
import {toast} from "react-toastify";

const MENU_ID = 'slidecontextmenu';
const SETTINGS = {
    title:'',
    type:'image',
    slideId:null,
    file:'',
    fileType:'',
    filePath:''
};

const decodeIcon = (props) => {
    console.log(props);
    if(props.settings.title){
        if(props.settings.type === 'image'){
            return <FaImage/>;
        }
        if(props.settings.type === 'pdf'){
            return <FaFilePdf/>
        }

        if(props.settings.type === 'video'){
            return <FaVideo/>
        }

        if(props.settings.type === 'link'){
            return <FaLink/>
        }

    }
    return <FaQuestion/>
}

const CreateSlide = () => {
    const history = useHistory();
    const {id} = useParams();
    const [data,setData] = useState({
        id:'',
        title:'',
        status:false,
        default:false,
    });
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [markers,setMarkers] = useState([]);
    const [hotspots,setHotspots] = useState([]);
    const [selectedImage,setSelectedImage] = useState(null);
    const [error,setError] = useState('');
    const [pointsScreen,setPointsScreen] = useState(false);
    const [currentContext,setCurrentContext] = useState(null);
    const [showSettings,setShowSettings] = useState(false);
    const [selectedMarker,setSelectedMarker] = useState(null);
    const [defaultSlide,setDefaultSlide] = useState(null);
    const { show } = useContextMenu({
        id: MENU_ID,
    });

    useEffect(() => {
        if(id){
            getSlideData();
        }

        getDefaultSlide();
    },[])

    const getSlideData = () => {
        sendAsync.getRow("SELECT * FROM slides WHERE id = "+id).then((result) =>{
            console.log(result);
            setData({
                id:result.id,
                title:result.title,
                default:!!result.default,
                status:!!result.status
            })
            setMarkers(JSON.parse(result.markers));
            setSelectedImage({
                file:result.image,
                path:window.globalDir+'media/images/'+result.image
            })
        })
            .catch((err) => {
                // history.push('/');
            });
        ;
    }

    const getDefaultSlide = () => {
        window.database.getRow("SELECT * FROM slides WHERE `status` = 1 AND `default` = 1 ORDER BY id DESC")
            .then((res) =>{
                setDefaultSlide(res);
                console.log(res);
            })
            .catch((err) => alert(err));

    }

    const handleContextMenu = (event,itemNumber,allProps) => {
        event.preventDefault();
        setCurrentContext(itemNumber);
        show(event)
    }
    const handleItemClick = ({ event,props,data}) => {
        switch(data.type){
            case 1:
                let marker = markers.find((val,index) => data.id === index);
                marker.itemNumber = data.id;
                setSelectedMarker(marker);
                setShowSettings(true);
            break;
            case 2:
                setMarkers(markers.filter((val,index) => data.id !== index));
            break;
        }
    }



    const saveSlide = async () => {
        const timestamp = +new Date();
        const status = data.status ? 1:0;
        const is_default = data.default ? 1:0;

        // if(id){
        //     if(is_default && defaultSlide.id !== id){
        //         setError('Default slide can only be 1, change other slide to be non default!');
        //         return;
        //     }
        // }

        if(!data.title) {
            setError('Title for slide is required');
            return;
        }

        if(!selectedImage){
            setError('Please select slide image before continuing');
            return;
        }

        const markers_ok = markers.filter((item) => item.settings.title !== '');
        if(markers_ok.length < markers.length){
            toast.error('One or more pointers not having valid data!');
            return;
        }

        const fileName = await sendAsync.processImage(selectedImage.path);

        const marker_processed = await sendAsync.processMarkerFiles(markers);
        if(id){
            sendAsync.insert("UPDATE slides SET `title` = '"+data.title+"',`status` = '"+status+"',`default` = '"+is_default+"',`image` = '"+fileName+"',`markers` = '"+marker_processed+"' WHERE id = "+id).then((result) =>{
                toast.success('Slide was updated!');
                history.push('/slidesList');
            })
                .catch((err) => console.log(err));
        } else {
            sendAsync.insert("INSERT INTO slides (`title`,`status`,`default`,`timestamp`,`image`,`markers`) VALUES ('"+data.title+"','"+status+"','"+is_default+"','"+timestamp+"','"+fileName+"','"+marker_processed+"')").then((result) =>{
                toast.success('Slide was created!');
                history.push('/slidesList');
            })
                .catch((err) => console.log(err));
        }

    }


    const selectImage = () => {
        sendAsync.selectImage({})
            .then((res) => setSelectedImage(res));
    }

    const addMarkers = (marker) => {
        marker.settings = SETTINGS;
        setMarkers([...markers, marker]);
    }

    const savePointerData = (data) => {
        const marks = markers.map((marker,index) => {
            if(index === selectedMarker.itemNumber){
                return {
                    ...marker,
                    settings:data
                }
            }
            return marker;
        });
        setMarkers(marks);
        setShowSettings(false);
        setSelectedMarker(false);
        forceUpdate();
    }

    const clearAll = () => {
        setMarkers([]);
    }

    const checkAndContinue = () => {
        const status = data.status ? 1:0;
        const is_default = data.default ? 1:0;
        if(!data.title){
            setError('Slide title is required');
            return;
        }

        if(!selectedImage){
            setError('Please select slide image!');
            return;
        }
        // if(id && defaultSlide){
        //     if(is_default && defaultSlide.id !== id){
        //         setError('Default slide can only be 1, change other slide to be non default!');
        //         return;
        //     }
        // }
        setPointsScreen(true);
    }

    if(pointsScreen){
        return (
            <div>

                <div className="imageMarker">
                    <ImageMarker
                        src={'file://'+selectedImage.path}
                        markers={markers}
                        markerComponent={(props) => <div className={'marker-def damn'} data={{itemId:props.itemNumber}} onClick
                            ={(event) => handleContextMenu(event,props.itemNumber,props)}>
                            {decodeIcon(props)}
                        </div>}
                        onAddMarker={(marker) => addMarkers(marker)}
                    />
                </div>

                <Menu id={MENU_ID}>
                    <Item onClick={handleItemClick} data={{type:1,id:currentContext}}>Settings</Item>
                    <Separator />
                    <Item className={'text-danger'} onClick={handleItemClick}  data={{type:2,id:currentContext}}>Delete</Item>
                </Menu>

                {selectedMarker && <SettingsModal saveData={savePointerData} show={showSettings} markerData={selectedMarker.settings}
                                closeSettings={() => {
                                    setShowSettings(false)
                                    console.log('cosing');
                                    setSelectedMarker(null);
                                }}/>}
                <div className={'bottom-bar'}>
                    <Button variant={'warning'} onClick={() => setPointsScreen(false)}>Back</Button>
                    <div className={'center-buttons'}>
                        <ul>
                            <li>
                                <Button variant={'outline-dark'} onClick={clearAll} disabled={markers.length <= 0}><FaUndo/> Clear All</Button>
                            </li>
                        </ul>
                    </div>
                    <Button variant={'success'} onClick={saveSlide}>Save Slide</Button>
                </div>
            </div>
        );
    }

    return (
        <div className='adminScreen'>
            <Header back="/slidesList"/>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="card p-5">
                            {error && <Alert key={'err1'} variant={'danger'}>
                                {error}
                            </Alert>}
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Slide Title</Form.Label>
                                    <Form.Control type="text" value={data.title} onChange={(e) => setData({...data,title:e.target.value})} placeholder="Enter slide title" />

                                    {/*<Form.Text className="text-muted">*/}
                                    {/*    We'll never share your email with anyone else.*/}
                                    {/*</Form.Text>*/}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Settings</Form.Label>
                                    <Form.Check id="active-status" className={'mt-2'} onChange={(e) => setData({...data,status:e.target.checked})} checked={data.status} label={'Activate'}/>
                                    <Form.Check id="default-status" className={'mt-2'} onChange={(e) => setData({...data,default:e.target.checked})}  checked={data.default} value={0} label={'Launch Slide'}/>
                                </Form.Group>
                                {/*<Form.Group controlId="formFile" className="mb-3">*/}
                                {/*    <Form.Label>Default file input example</Form.Label>*/}
                                {/*    <Form.Control type="file" />*/}
                                {/*</Form.Group>*/}

                                {selectedImage && <div className='selectedImage'>
                                    <button className="remove-image" onClick={() => setSelectedImage(null)}>Remove</button>
                                    <img src={'file://'+selectedImage.path} alt='' className='image-path' />
                                </div>}

                                {!selectedImage && <div variant='primary' className={'m-2 select-image-box'} onClick={selectImage}>
                                    <div className="imagetext">
                                        <FaImage/>
                                        <span>Select Image</span>
                                    </div>

                                </div>}

                                <Button variant="success"  className={'m-2'} onClick={checkAndContinue}>Continue</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};




export default CreateSlide;
