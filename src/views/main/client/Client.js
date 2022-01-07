import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Client = () => {
    return (
        <div className='welcomeScreen'>
            <div className='welcomeText'>
                <h2>Welcome to Nangal Dam</h2>
            </div>
            <div className='buttonGroup'>
                <Link to="/slidesList" className="btn btn-primary big">Administator</Link>
                <div className="me-2"/>
                <Link to="/slide" className="btn btn-secondary big">Client</Link>
            </div>
        </div>
    );
};

export default Client;
