import React, {useState} from 'react';
import {Line} from "react-chartjs-2";
import {Box} from "@mui/system";
import Calendar from "../components/Calendar";
import MyButton from "../components/MyButton";
import {Alert, Snackbar} from "@mui/material";
import ReportService from "../API/ReportService";
import {AxiosError} from "axios";
import useDidMountEffect from "../hooks/useDidMountEffect";
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

let chartData = {
    labels: ["Totale HTC", "Govies DM", "Govies EM", "Corp/Fin/ABS", "Totale HTCS"],
    datasets: []
};

const options = {
    responsive: true,
    plugins: {
        legend: true,
        title: {
            display: true,
            text: 'Net Reserves Line Chart',
        },
    },
};

const Graph = () => {
    const startDate = new Date().toString()
    const [firstDate, setFirstDate] = useState(startDate)
    const [secondDate, setSecondDate] = useState(startDate)
    const [showCalendar, setShowCalendar] = useState(true)
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState();
    const [firstDateData, setFirstDateData] = useState();
    const [secondDateData, setSecondDateData] = useState();

    useDidMountEffect(drawChart, [firstDateData, secondDateData])

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const handleClickSuccess = () => {
        setOpen(true);
    }

    async function handleClick() {
        const responseFirstDate = await ReportService.getData(firstDate);
        const responseSecondDate = await ReportService.getData(secondDate);
        if (responseFirstDate instanceof AxiosError ||
            responseSecondDate instanceof AxiosError) {
            setSuccess(false)
            handleClickSuccess()
        } else {
            setFirstDateData(responseFirstDate)
            setSecondDateData(responseSecondDate)
        }
    }

    function drawChart() {
        chartData.datasets = []
        chartData.datasets = [
            {
                label: "First date Net Reserve",
                data: [firstDateData['htcTotaleNet'], firstDateData['goviesdmNet'], firstDateData['goviesemNet'],
                    firstDateData['corpNet'], firstDateData['htcsTotaleNet']],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Second date Net Reserve",
                data: [secondDateData['htcTotaleNet'], secondDateData['goviesdmNet'], secondDateData['goviesemNet'],
                    secondDateData['corpNet'], secondDateData['htcsTotaleNet']],
                fill: true,
                backgroundColor: "rgba(229,204,255,0.2)",
                borderColor: "rgba(229,204,255,1)"
            }
        ]
        setShowCalendar(false)
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
                    <Box display={"flex"} justifyContent={"center"}>
                        <Calendar date={firstDate} setDate={setFirstDate}>First chart date</Calendar>
                        <Calendar date={secondDate} setDate={setSecondDate}>Second chart date</Calendar>
                    </Box>
                    <MyButton handleClick={handleClick}>CHART</MyButton>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={`${success ? 'success' : 'error'}`} sx={{width: '100%'}}>
                            {success ? 'Table generated!' : 'No chart for the date'}
                        </Alert>
                    </Snackbar>
                </Box>
                :
                <div style={
                    {
                        width: '1000px',
                        minHeight: '550px',
                        position: "absolute",
                        left: "15%",
                        top: "15%",
                    }
                }>
                    <Line options={options} data={chartData}/>
                    <Box textAlign='center'>
                        <MyButton handleClick={handleClickBack}>BACK</MyButton>
                    </Box>
                </div>
            }
        </div>
    );
};

export default Graph;