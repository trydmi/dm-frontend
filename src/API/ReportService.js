import axios from "axios";
import { dataUrl, reportUrl } from "./dm-info";

export default class ReportService {
    static getReport(date, handleClickSuccess, setSuccess) {
        const url = reportUrl + date
        const method = 'GET'
        axios({
            url,
            method: method,
            responseType: 'blob',
        }).then(response => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'riserva-htc-htcs_' + date + '.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            handleClickSuccess()
            setSuccess(true)
        }).catch(err => {
            if (err.response === undefined) {
                alert("Internal error")
            } else if(err.response.status === 400) {
                handleClickSuccess()
                setSuccess(false)
            }
        })
    }
    static async getData(date, handleClickSuccess, setSuccess, drawTable) {
        const url = dataUrl + date
        const method = 'GET'
        axios({
            url,
            method: method,
            responseType: 'application/json'
        }).then(response => {
            const result = JSON.parse(response.data)
            console.log(result)
            drawTable(result)
            handleClickSuccess()
            setSuccess(true)
        }).catch(err => {
            if (err.response === undefined) {
                alert("Internal error")
            } else if(err.response.status === 400) {
                handleClickSuccess()
                setSuccess(false)
            }
        })
    }
}