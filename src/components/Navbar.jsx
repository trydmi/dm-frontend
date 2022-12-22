import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ReportDownloader from './ReportDownloader';
import ResponsiveAppBar from './ResponsiveAppBar';

const Navbar = () => {
    return (
        <div>
            <ResponsiveAppBar/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/report" element={<ReportDownloader />}/>
            </Routes>
        </div>
    );
};

export default Navbar;