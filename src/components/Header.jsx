import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ExcelRenderer from '../pages/ExcelRenderer/ExcelRenderer';
import ReportDownloader from '../pages/ReportDownloader';
import Navbar from './Navbar';

const Header = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<ReportDownloader />}/>
                <Route path="/report" element={<ReportDownloader />}/>
                <Route path="/view" element={<ExcelRenderer />}/>
            </Routes>
        </div>
    );
};

export default Header;