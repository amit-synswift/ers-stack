import React, { useState, useEffect } from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Header from '../../components/Header';
import sendAsync from '../../../message-control/renderer';
import {useHistory, useParams} from "react-router-dom";
const SlidesList = () => {
    const [slides,setSlides] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getSlides()
    },[]);

    const getSlides = () => {
        window.database.getRows("SELECT * FROM slides ORDER BY id DESC")
            .then((result) => {
                setSlides(result);
            })
    }

    const getImage = async () => {
        return await sendAsync.getImage({type:'image'});
    }

    const removeSlide = (id) => {
        window.database.deleteRow('DELETE FROM slides WHERE id = '+id)
            .then((res) => getSlides());
    }

    return (
        <div className='adminScreen'>
            <Header back="/" next="/createSlide" nextText="Create Slide"/>
            <Container className="mt-5">
                <Row>
                    {slides.length > 0 && slides.map((item) => {
                        return <Col md={4}>
                            <div className='card slideCard'>
                                <div className='thumb'>
                                    <div className='slideOverlay'>
                                        <h4>Edit</h4>
                                    </div>
                                    <img src={'file://'+window.globalDir+'media/images/'+item.image} alt='image' />
                                </div>
                                <div className='cardDetail'>
                                <div class={'d-flex w-100 justify-content-between'}>
                                    <span>{item.title}</span>
                                    <div>
                                        <Button onClick={() => history.push('/createSlide/'+item.id)} variant={'warning'} className={'mr-2'} size={'sm'}>Edit</Button>
                                        <Button variant={'danger'} size={'sm'} onClick={() => removeSlide(item.id)}>Delete</Button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </Col>
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default SlidesList;
