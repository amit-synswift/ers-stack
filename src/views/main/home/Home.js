import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sendAsync from "../../../message-control/renderer";
import Login from "../../components/Login/Login";

const Home = () => {
    const [startSlide,setStartSlide] = useState(null);
    const [login,setLogin] = useState(false);
    const [value,setValue] = useState('');
    const [error,setError] = useState(false);

    useEffect(()=> {
       const loginPersistence = localStorage.getItem("login");
       if(loginPersistence === "true") {
           setLogin(true);
       }
    });

    const onLoginClick = () => {
        console.log("pss",value);
        if(value === 'Njhps@1500MW' || value === 'Governor@250MW') {
            setValue('');
            setLogin(true);
            setError(false);
            localStorage.setItem("login","true");
        } else {
            setError(true);
        }
    }

    const logout = () => {
        console.log("logout");
        setLogin(false);
        localStorage.setItem("login","false");
    }

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
                <img className="logo-gorv" src={"./icon.png"} />
            </div>
            {!login ?
                (<Login onClick={()=>onLoginClick()} value={value} setValue={setValue} error={error} />) :
                (<>
                    <div className='welcomeText'>
                        <h2>Welcome to NATHPA JHAKRI HYDRO-POWER STATION</h2>
                    </div>
                    <div className='buttonGroup'>
                        <Link to="/slidesList" className="btn btn-primary big">Administator</Link>
                        <div className="me-2"/>
                        {startSlide && <Link to={"/slide/"+startSlide.id} className="btn btn-secondary big">Start Slide</Link>}
                    </div>
                    <div className="buttonGroup">
                        <button className="btn btn-warning" onClick={()=>logout()}>Logout</button>
                    </div>
                </>)
            }

        </div>
    );
};

export default Home;
