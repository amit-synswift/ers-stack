import React, { useState, useEffect } from 'react';

const Login = (props) => {

    const onChange = e => {
        e.preventDefault();
        props.setValue(e.target.value);
    }

    const handleKeypress = e => {
        if (e.key === "Enter") {
            props.onClick();
        }
    };

    return (
        <div className="login-section">
            <div className="welcomeText"><h2>Login</h2></div>
            {props.error && <div className="alert alert-danger" role="alert" >Provided password is wrong</div>}
            <div className="buttonGroup">
                <input type="password" placeholder={"Enter your password"} value={props.value} onChange={onChange} onKeyPress={handleKeypress} className="form-control"/>
                <button className="btn btn-success" type="button" onClick={()=>props.onClick()}>Login</button>
            </div>
        </div>
    );
};

export default Login;
