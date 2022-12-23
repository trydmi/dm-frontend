import * as React from 'react';
import '@grapecity/spread-sheets-charts';
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import { IO } from "@grapecity/spread-excelio";
import { Button, Input } from '@mui/material';
import styles from './ExcelRenderer.module.css'

const ExcelRenderer = () => {    
    let spread
    let importExcelFile
    const hostStyle = {
        width: '100%',
        height: '600px',
        marginTop: '10px'
    };
    function initSpread(sp) {
        spread = sp;
    }
    function changeFileDemo(e) {
        importExcelFile = e.target.files[0];
    }
    function loadExcel(e) {
        let s = spread;
        let excelIo = new IO();
        let excelFile = importExcelFile;
        excelIo.open(excelFile, function (json) {
            let workbookObj = json;
            s.fromJSON(workbookObj);
        }, function (e) {
            alert(e.errorMessage);
        });
    }
    return (
        <div className={styles.renderBody}>
            <div className={styles.spreadsheets}>
                <SpreadSheets hostStyle={hostStyle} workbookInitialized={spread => initSpread(spread)}>
                    <Worksheet>
                    </Worksheet>
                </SpreadSheets>
            </div>
            <div className={styles.optionsContainer}>
                <div>
                    <div className={styles.inputContainer}>
                        <Input type="file" id="fileDemo" onChange={e=>changeFileDemo(e)}/>
                        <Button variant="contained" onClick={e=>loadExcel(e)}>UPLOAD</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExcelRenderer;