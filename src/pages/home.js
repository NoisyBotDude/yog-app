import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';

function HomePage (props) {

    return (
        <div>
            {
                !props.loading && 
                <Dashboard user={props.user} />
            }
        </div>
    )
}

export default HomePage;