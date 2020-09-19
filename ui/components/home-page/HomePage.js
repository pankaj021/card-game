import React from 'react';
import MainContent from './MainContent';
import SideMenu from './SideMenu';

export default function HomePage() {
    return(
        <div className='homepage'>
            <MainContent/>
            <SideMenu />
        </div>
    )
}