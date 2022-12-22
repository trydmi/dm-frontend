import { Button } from '@mui/material';
import React from 'react';
import ReportService from '../API/ReportService';

const MyButton = ({children, ...props}) => {
    async function getPosts() {
        ReportService.getReport(props.date, props.setModalVisible)
    }
    return (
        <div>
            <Button sx={{ mt: 2 }} variant="contained" onClick={getPosts}>{children}</Button>
        </div>
    );
};

export default MyButton;