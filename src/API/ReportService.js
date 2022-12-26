import axios from "axios";
import {dataUrl, reportUrl} from "./dm-info";

export default class ReportService {
    static async getReport(date) {
        const url = reportUrl + date
        const method = 'GET'
        try {
            return await axios({
                url,
                method: method,
                responseType: 'blob'
            })
        } catch (error) {
            return error
        }
    }

    static async getData(date) {
        const url = dataUrl + date
        const method = 'GET'
        try {
            const response = await axios({
                url,
                method: method,
                responseType: 'application/json'
            })
            return JSON.parse(response.data)
        } catch (error) {
            return error
        }
    }
}