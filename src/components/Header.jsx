import TableView from '../pages/TableView';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReportDownloader from '../pages/ReportDownloader';
import Navbar from './Navbar';
import Graph from '../pages/Graph';

const Header = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<ReportDownloader />}/>
                <Route path="/report" element={<ReportDownloader />}/>
                <Route path="/table" element={<TableView />}/>
                <Route path="/graph" element={<Graph />}/>
            </Routes>
        </div>
    );
};

export default Header;