import axios from "axios";

export default class ReportService {
    static async getReport(date, setModalVisible) {
        const url = "http://localhost:8085/api/v1/riserva-netta/" + date
        const method = 'GET'
        await axios({
            url,
            method: method,
            responseType: 'blob',
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
            }
        }).then(response => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'riserva-htc-htcs_' + date + '.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch(err => {
            if (err.response.status === 400) {
                setModalVisible(true)
            }
        })
    }
}