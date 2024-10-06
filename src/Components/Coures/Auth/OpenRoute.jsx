import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({Children}) => {
    const { token } = useSelector((state)=>state.auth)

    if(token === null){
        return Children
    }
    else {
        return <Navigate to = "/dashboard/my-profile"/>
    }
    
};

export default OpenRoute;