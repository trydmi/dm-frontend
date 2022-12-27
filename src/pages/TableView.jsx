import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReportService from '../API/ReportService';
import {Box} from '@mui/system';
import Calendar from '../components/Calendar';
import {Alert, Snackbar} from '@mui/material';
import MyButton from '../components/MyButton';
import {AxiosError} from "axios";
import useDidMountEffect from "../hooks/useDidMountEffect";

function createData(title, calories, fat, carbs) {
    return {title, calories, fat, carbs};
}

let rows = [];

const TableView = () => {
    const startDate = new Date().toString();
    const [date, setDate] = useState(startDate)
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState();
    const [data, setData] = useState();
    const [showCalendar, setShowCalendar] = useState(true)

    useDidMountEffect(drawTable, data)

    const handleClickSuccess = () => {
        setOpen(true);
    }

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    function drawTable() {
        rows = []
        rows.push(createData("Totale HTC", data['htcTotalePr'], data['htcTotaleNeg'], data['htcTotaleNet']))
        rows.push(createData("Govies DM", data['goviesdmPr'], data['goviesdmNeg'], data['goviesdmNet']))
        rows.push(createData("di cui ORD", data['goviesdmPrOrd'], data['goviesdmNegOrd'], data['goviesdmOrdNet']))
        rows.push(createData("di cui EC", data['goviesdmPrEc'], data['goviesdmNegEc'], data['goviesdmEcNet']))
        rows.push(createData("di cui GRM", data['goviesdmPrGrm'], data['goviesdmNegGrm'], data['goviesdmGrmNet']))
        rows.push(createData("Govies EM", data['goviesemPr'], data['goviesemNeg'], data['goviesemNet']))
        rows.push(createData("di cui ORD", data['goviesemPrOrd'], data['goviesemNegOrd'], data['goviesemOrdNet']))
        rows.push(createData("di cui GRM", data['goviesemPrGrm'], data['goviesemNegGrm'], data['goviesemGrmNet']))
        rows.push(createData("di cui EC", data['goviesemPrEc'], data['goviesemNegEc'], data['goviesemEcNet']))
        rows.push(createData("Corp/Fin/ABS", data['corpPr'], data['corpNeg'], data['corpNet']))
        rows.push(createData("di cui ORD", data['corpPrOrd'], data['corpNegOrd'], data['corpOrdNet']))
        rows.push(createData("di cui EC", data['corpPrEc'], data['corpNegEc'], data['corpEcNet']))
        rows.push(createData('', '', '', ''))
        rows.push(createData("Totale HTCS", data['htcsTotalePr'], data['htcsTotaleNeg'], data['htcsTotaleNet']))
        rows.push(createData("Govies DM", data['htcsGoviesdmPr'], data['htcsGoviesdmNeg'], data['htcsGoviesdmNet']))
        rows.push(createData("Govies EM", data['htcsGoviesemPr'], data['htcsGoviesemNeg'], data['htcsGoviesemNet']))
        rows.push(createData("Corp/Fin/ABS", data['htcsCorpPr'], data['htcsCorpNeg'], data['htcsCorpNet']))
        setShowCalendar(false)
    }

    async function handleClick() {
        const response = await ReportService.getData(date)
        if (response instanceof AxiosError) {
            setSuccess(false)
            handleClickSuccess()
        } else {
            setData(response)
            drawTable()
        }
    }

    function handleClickBack() {
        setOpen(false)
        setShowCalendar(true)
    }

    return (
        <div>
            {showCalendar
                ?
                <Box textAlign='center'>
                    <Calendar date={date} setDate={setDate}>Table date</Calendar>
                    <MyButton handleClick={handleClick}>TABLE</MyButton>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={`${success ? 'success' : 'error'}`} sx={{width: '100%'}}>
                            {success ? 'Table generated!' : 'No table for the date'}
                        </Alert>
                    </Snackbar>
                </Box>
                :
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>{date}</TableCell>
                                <TableCell align="right">Positive Reserve</TableCell>
                                <TableCell align="right">Negative Reserve</TableCell>
                                <TableCell align="right">NetReserve</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={rows[row]}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box textAlign='center'>
                        <MyButton handleClick={handleClickBack}>BACK</MyButton>
                    </Box>
                </TableContainer>
            }

        </div>
    );
}
export default TableView;
