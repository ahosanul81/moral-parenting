import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MpContext } from '../Context/ContextProvider';

const ProtectedRoute = ({ children }) => {
    const { loading, user } = useContext(MpContext)
    const location = useLocation()
    // console.log(location, user, 'protected');
    if (user) {
        return children
    }
    if (loading) {
        return <>
            <div className='flex justify-center items-center w-full h-screen'>
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-600 "></div>
            </div>
        </>
    }

    return (<Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default ProtectedRoute;