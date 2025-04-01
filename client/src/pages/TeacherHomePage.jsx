// StudentHomePage
// .js
import React from 'react';
import { useUser } from "../context/UserContext"; 

import SideBar from '../components/SideBar';

const StudentHomePage
 = () => {
    const { username } = useUser ();

    return (
        <div>
            {username ? <h1>Hello, {username}!</h1> : <h1>Hello, Guest!</h1>}
            <SideBar />
        </div>
    );
};

export default StudentHomePage
;