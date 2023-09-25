import './AppHeader.css';
import { useEffect, useState } from 'react';
import SiteLogo from '../../img/SiteLogo.png'

function AppHeader() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={SiteLogo} alt="Image 1" />
            </div>
        </header>
    );
}

export default AppHeader;
