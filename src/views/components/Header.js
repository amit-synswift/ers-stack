import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Header = (props) => {
    return (
        <header className='header py-3'>
            <Container>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to={props.back} className='back'>
                        <img src='./assets/icons/left-arrow.png' alt='icon' />
                        Back
                    </Link>
                    {props.next && <Link to={props.next} className='add'>
                        {props.nextText}
                        <img src='./assets/icons/add.png' alt='icon'/>
                    </Link>}
                </div>
            </Container>
        </header>
    );
};

export default Header;
