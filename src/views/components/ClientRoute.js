import React, { useEffect, useState } from 'react';
import { Route,HashRouter as Router } from 'react-router-dom';
import Client from '../main/client/Client';
import Slide from '../main/client/Slide';
import {CSSTransition} from "react-transition-group";
import {Container} from "react-bootstrap";
import Home from "../main/home/Home";
import SlidesList from "../main/admin/SlidesList";
import CreateSlide from "../main/admin/CreateSlide";
import AddPoints from "../main/admin/AddPoints";
const routes = [
    { path: '/client', name: 'Client', Component: Client },
    { path: '/slide', name: 'Slide', Component: Slide },

]
const ClientRoute = ({ component: Component }) => {

    return (
        <Route
            render={props => (
                <>
                    <Route exact path='/' component={Client} />
                </>
            )}
        />
    )
}

export default ClientRoute;
