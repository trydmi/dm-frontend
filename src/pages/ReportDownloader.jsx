import { Alert, Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import ReportService from '../API/ReportService';
import Calendar from '../components/Calendar';
import MyButton from '../components/MyButton';
import {AxiosError} from "axios";

const ReportDownloader = () => {
    const startDate = new Date().toString();
    const [date, setDate] = useState(startDate)
    const [open, setOpen] = useState();
    const [success, setSuccess] = useState();
    const handleClickSuccess = () => {
        setOpen(true);
    }
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    const handleClick = async () => {
        const response = await ReportService.getReport(date)
        if (response instanceof AxiosError) {
            setSuccess(false)
            handleClickSuccess()
        } else {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'riserva-htc-htcs_' + date + '.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setSuccess(true)
            handleClickSuccess()
        }
    }
    return (
        <Box textAlign='center'>
            <Calendar date={date} setDate={setDate}>Report date</Calendar>
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