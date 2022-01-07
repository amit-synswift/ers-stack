import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Home from '../main/home/Home';
import SlidesList from '../main/admin/SlidesList';
import CreateSlide from '../main/admin/CreateSlide';
import AddPoints from '../main/admin/AddPoints';

const MainRoute = ({ component: Component }) => {

    return (
        <Route
            render={props => (
                <>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/slidesList' component={SlidesList} />
                    <Route exact path='/createSlide' component={CreateSlide} />
                    <Route exact path='/addPoints' component={AddPoints} />
                </>
            )}
        />
    );
};

export default MainRoute;
