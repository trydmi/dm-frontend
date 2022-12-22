import { Alert, Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import Calender from './Calender';
import DownloadButton from './DownloadButton';

const ReportDownloader = () => {
    const startDate = new Date().toString();
    const [date, setDate] = useState(startDate)
    const [open, setOpen] = React.useState();
    const [success, setSuccess] = React.useState();
    const handleClickSuccess = () => {
        setOpen(true);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    return (
        <Box textAlign='center'>
            <Calender date={date} setDate={setDate}/>
            <DownloadButton date={date} handleClickSuccess={handleClickSuccess} setSuccess={setSuccess}>Download</DownloadButton>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={`${success ? 'success' : 'error'}`} sx={{ width: '100%' }}>
                    {success ? 'Downloaded successfuly!' : 'No report for the date'}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ReportDownloader;