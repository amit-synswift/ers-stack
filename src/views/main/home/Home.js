import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sendAsync from "../../../message-control/renderer";

const Home = () => {
    const [startSlide,setStartSlide] = useState(null);

    useEffect(() => {
        getSlides();
    },[])
    const getSlides = () => {
        window.database.getRow("SELECT * FROM slides WHERE `status` = 1 AND `default` = 1 ORDER BY id DESC")
            .then((result) => {
                setStartSlide(result);
            })
        // sendAsync.getRow("SELECT * FROM slides WHERE `status` = 1 AND `default` = 1 ORDER BY id DESC").then((result) =>{
        //     console.log(result);
        //     setStartSlide(result);
        // });
    }

    return (
        <div className='welcomeScreen'>
            <div className='welcomeText'>
                <h2>Welcome to Nangal Dam</h2>
            </div>
            <div className='buttonGroup'>
                <Link to="/slidesList" className="btn btn-primary big">Administator</Link>
                <div className="me-2"/>
                {startSlide && <Link to={"/slide/"+startSlide.id} className="btn btn-secondary big">Client</Link>}
            </div>
        </div>
    );
};

export default Home;
