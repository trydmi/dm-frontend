import axios from "axios";

export default class ReportService {
    static getReport(date, handleClickSuccess, setSuccess) {
        const url = "http://ec2-52-71-113-72.compute-1.amazonaws.com:8080/api/v1/riserva-netta/" + date
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
            if (err.response.status === 400) {
                handleClickSuccess()
                setSuccess(false)
            }
        })
    }
}