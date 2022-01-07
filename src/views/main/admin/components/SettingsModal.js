import React, {useEffect, useState} from 'react';
import {Button,Modal,Form,FloatingLabel} from "react-bootstrap";
import sendAsync from "../../../../message-control/renderer";


const SettingsModal = (props) => {
    const [settings,setSettings] = useState(props.markerData);
    const [slides,setSlides] = useState([]);
    useEffect(() => {
        getSlides()
    },[]);

    const getSlides = () => {
        sendAsync.getRows("SELECT * FROM slides ORDER BY id DESC").then((result) =>{
            console.log(result);
            setSlides(result);
        });
    }

    const handleClose = () => {
        props.closeSettings();
    }

    const saveSettings = () => {
        props.saveData(settings);
    }

    const selectFile = () => {
        sendAsync.selectFile({})
            .then((res) => setSettings({
                ...settings,
                file:res.name,
                filePath:res.path
            }));
    }

    return (
        <>
            <Modal size="lg" show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pointer Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <FloatingLabel controlId="floatingInputGrid" label="Pointer Title">

                            <Form.Control type="text" value={settings.title} onChange={(e) => setSettings({...settings,title:e.target.value})} placeholder="Enter title..." />
                        </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <FloatingLabel controlId="floatingSelect" label="Select Pointer Data Type">
                            <Form.Select onChange={(e) => setSettings({...settings,type:e.target.value})} aria-label="Floating label select example">
                                <option value="image" selected={settings.type === 'image'}>Image</option>
                                <option value="pdf" selected={settings.type === 'pdf'}>PDF</option>
                                <option value="video" selected={settings.type === 'video'}>Video</option>
                                <option value="link" selected={settings.type === 'link'}>Link Slide</option>
                            </Form.Select>
                        </FloatingLabel>
                        </Form.Group>
                        {settings.type === 'link' && <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <FloatingLabel controlId="floatingSelect" label="Select Slide">
                                <Form.Select onChange={(e) => setSettings({...settings, slideId: e.target.value})}
                                             aria-label="Floating label select example">
                                    {slides.length > 0 && slides.map((slide) => {
                                        return <option value={slide.id}  selected={settings.slideId === slide.id}>{slide.title}</option>
                                    })}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>}

                        {
                            settings.type !== 'link' && <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                {!settings.file && <div className={'selectFile'} onClick={selectFile}>
                                    <span className={'filetext'}>Select File</span>
                                </div>}
                                {settings.file && <div className={'selectedFile'}>
                                    <span className={'filetext'}>{settings.file}</span>
                                    <Button variant={'danger'} onClick={() => setSettings({
                                        ...settings,
                                        file:null,
                                        filePath:null
                                    })}>Remove</Button>
                                </div>}
                            </Form.Group>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm"  onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={saveSettings}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SettingsModal;
