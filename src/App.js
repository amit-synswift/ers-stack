import React, { Component } from 'react';
import {Switch, BrowserRouter, HashRouter, Route,Redirect} from 'react-router-dom';
import "react-awesome-lightbox/build/style.css";
import 'video-react/dist/video-react.css'; // import css
import 'bulma/css/bulma.css'; // import css
import 'material-design-icons/iconfont/material-icons.css';
import './App.css';
import Client from './views/main/client/Client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container} from "react-bootstrap";
import Slide from "./views/main/client/Slide";
import Home from './views/main/home/Home';
import SlidesList from './views/main/admin/SlidesList';
import CreateSlide from './views/main/admin/CreateSlide';
import AddPoints from './views/main/admin/AddPoints';
import {CSSTransition} from "react-transition-group";
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once

const routes = [
    { path: '/', name: 'Home', Component: Home,exact:true },
    { path: '/client', name: 'Client', Component: Client,exact: false },
    { path: '/slide/:id', name: 'Slide', Component: Slide },
    { path: '/slidesList', name: 'SlidesList', Component: SlidesList },
    { path: '/createSlide', name: 'CreateSlide', Component: CreateSlide },
    { path: '/createSlide/:id', name: 'CreateSlide', Component: CreateSlide },
    { path: '/addPoints', name: 'addPoints', Component: AddPoints },

]

class App extends Component {

    render() {
        return (
            <>
                <HashRouter>
                        <>

                                {routes.map(({ path, Component }) => (
                                    <Route key={path} exact path={path}>
                                        {({ match }) => (
                                            <CSSTransition
                                                in={match != null}
                                                timeout={300}
                                                classNames="page"
                                                unmountOnExit
                                            >
                                                <div className="page">
                                                    <Component />
                                                </div>
                                            </CSSTransition>
                                        )}
                                    </Route>

                                ))}

                            <Redirect to={'/'} />
                        </>
                </HashRouter>
                <ToastContainer />
            </>
        );
    }
}

export default App;
