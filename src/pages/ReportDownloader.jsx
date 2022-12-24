import { Alert, Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import ReportService from '../API/ReportService';
import Calender from '../components/Calender';
import MyButton from '../components/MyButton';

const ReportDownloader = () => {
    const startDate = new Date().toString();
    const [date, setDate] = useState(startDate)
    const [open, setOpen] = React.useState();
    const [success, setSuccess] = React.useState();
    const handleClickSuccess = () => {
        setOpen(true);
    }
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    const handleClick = () => {
        ReportService.getReport(date, handleClickSuccess, setSuccess)
    }
    return (
        <Box textAlign='center'>
            <Calender date={date} setDate={setDate}>Report date</Calender>
            <MyButton handleClick={handleClick}>Download</MyButton>
            <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={`${success ? 'success' : 'error'}`} sx={{ width: '100%' }}>
                    {success ? 'Downloaded successfuly!' : 'No report for the date'}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ReportDownloader;