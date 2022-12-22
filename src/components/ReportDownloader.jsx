import { Alert, Box } from '@mui/material';
import React, { useState } from 'react';
import Calender from './Calender';
import MyButton from './MyButton';
import MyModal from './UI/MyModal/MyModal';

const ReportDownloader = () => {
    const startDate = new Date().toString();
    const [date, setDate] = useState(startDate)
    const [modal, setModal] = useState(false)
    return (
        <Box textAlign='center'>
            <Calender date={date} setDate={setDate}/>
            <MyButton date={date} setModalVisible={setModal}>Download</MyButton>
            <MyModal setVisible={setModal} visible={modal}>
                <Alert severity="error">
                    Date not found, try again
                </Alert>
            </MyModal>
        </Box>
    );
};

export default ReportDownloader;