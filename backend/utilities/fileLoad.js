const Baby = require("babyparse");
const CSV2 = require("json2csv");
const moment = require("moment");
const xlsx = require('xlsx');
const config = require('../config.js');
const filepath = config.FILE_LOCATION;
const fs = require("fs");
const mysql = require('./mysql');
const devlog = require('./devlog');


class fileLoad {
    constructor(request, response, biller, title, startrow, sheetNumber, isCogs) {
        this.file = (request) ? request.file : null;
        this.mysql = mysql;
        this.filepath = filepath;
        this.startrow = (startrow) ? startrow - 1 : 0;
        this.biller = biller;
        this.sheetNumber = (sheetNumber) ? sheetNumber - 1 : 0;
        this.title = title;
        this.currentFacility = null;
        this.upload_month = 0;
        this.upload_year = 0;
        this.filelocation = '';
        this.request = request;
        this.response = response;
        this.isExcel = false;
        this.mapping = null;
        this.rows = 0;
        this.currentUser;
        this.currentRepName;
        this.reportID = 0;
        this.isCogs = isCogs;
        console.log("Object Created");
    }
    saveAsCSV() {
        console.log("Starting the file upload")
        const filename = this.file.originalname;
        const parts = filename.split(".");
        const type = parts[parts.length - 1];
        const me = this;
        console.log(type);
        if (['xlsx', 'csv', 'txt'].indexOf(type.toLowerCase()) > -1) {
            let workbook = null;
            let worksheet = null;
            if (type == 'xlsx') {
                workbook = xlsx.readFile(this.file.path);
                me.isExcel = true;
                devlog.log("Is Excel");
            }
            if (workbook && me.isExcel) {
                console.log("writing file now")
                const sheetName = workbook.SheetNames[this.sheetNumber];
                xlsx.writeFileAsync(`${filepath}/${this.title}.csv`, workbook, {
                    bookType: 'csv',
                    sheet: sheetName
                }, function(){
                    devlog.log("Is Excel Schema Check");
                    me.checkSchema()
                })
            }
            else {
                devlog.log("Bad Workbook");
                this.response.status(500);
                this.response.send({
                    validFile: false,
                    fileName: this.file.originalname,
                    error: `Excel Workbook could not be parsed as CSV`
                });                
            }
        }   
        else {
            devlog.log("Bad File Type");
            this.response.status(500);
            this.response.send({
                validFile: false,
                fileName: this.file.originalname,
                error: `File type of ${type} is not accepted in the upload`
            });
        }    
    }
    checkSchema() {
        let me = this;
        let path = (this.isExcel) ? `${filepath}/${me.title}.csv` : `${filepath}/${me.title}`;
        devlog.log("Query MYSQL");
        let query = mysql.queryBuilder('Report_Column_Mapping', null, `REPORT_ID = '${me.reportID}'`)
        mysql.query('Biller Header Mappings', query,
        function(results, me, response, err) {
            fs.readFile(path, 'utf8', function(err, data) {
                if (!err) {
                    devlog.log("CSV File Read");
                    let splitData = data.split("\n");
                    me.rows = splitData.length - 1;
                    let schemaData = splitData[me.startrow];
                    let parseData = null;
                    try {
                        devlog.log("Parsing Data");
                        devlog.log(schemaData)
                        let babyParseData = Baby.parse(schemaData);
                        parseData = babyParseData.data;
                        let mappedData = me.setMapping(parseData[0], results);
                        let blankProperties = [];
                        for (var item of results) {
                            if (mappedData[item.MAPPED_COLUMN_NAME] == null || mappedData[item.MAPPED_COLUMN_NAME] == undefined) {
                                blankProperties.push(item.MAPPED_COLUMN_NAME);
                            }
                        }
                        if (blankProperties.length > 0) {
                            response.status(500);
                            response.send({
                                validFile: false,
                                fileName: me.file.originalname,
                                error: `You have unmapped columns in this file. Are you sure you are using the correct start row?`,
                                errorObject: blankProperties
                            });  
                        }
                        else {
                            devlog.log("Writing New CSV");
                            me.mapping = mappedData;
                            me.mapCSV(splitData, results);
                        }
                    }
                    catch(e) {
                        devlog.log("Caught Error");
                        devlog.log(e);
                        response.status(500);
                        response.send({
                            validFile: false,
                            fileName: me.file.originalname,
                            error: `Failed when attempting to parse Schema from CSV`,
                            errorObject: e
                        });                        
                    }
                }
                else {
                    devlog.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        fileName: me.file.originalname,
                        error: `Failed when attempting to read CSV Version of File`,
                        errorObject: err
                    });
                }
            });   
            /*else {
                devlog.log('Error Occured');
                devlog.log(err);
                me.response.status(500);
                me.response.send({
                    validFile: false,
                    fileName: me.file.originalname,
                    error: `Unsuccessful attempt to use database`,
                })                
            }*/   
        }, me, me.response);
    }
    mapCSV(newData, resultData) {
        let me = this;
        console.log("newData is " + newData.length)
        let data = null;
        let dataPull = [];
        let csv = null;
        //if (me.biller == 10) {
            let k = 0;
            for (var d of newData) {
                if (k > 0) {
                    let bab = Baby.parse(d, {skipEmptyLines: true});
                    if (bab) {
                        if (bab.data) {
                            dataPull.push(bab.data[0]);
                        }
                    }
                }
                k++;
            }
            csv = dataPull;
        /*}
        else {
            data = Baby.parse(newData.join("\n"), {skipEmptyLines: true});
            csv = data.data;
        }*/
        let table = [];
        let i = 0;
        let usingFacilities = false;
        me.currentRepName = '';
        let newDate = new Date();
        let momentDate = moment(newDate).format('YYYY-MM-DD');
        let map = me.mapping; 
        //devlog.log('map : ');
        //devlog.log(map);    
        for (var r of csv) {
            console.log(r);
            devlog.log(r);
            if (i >= me.startrow) {
                let obj = {};
                for (var o in map) {
                    let testItems = [];
                    if (r) {
                        if (r[map[o] - 1]) {
                            testItems.push(r[map[o] - 1].trim());
                        }
                        if (r[map[o] + 1]) {
                            testItems.push(r[map[o] + 1]);
                        }
                        if (r[map[o] + 2]) {
                            testItems.push(r[map[o] + 2]);
                        }                                                
                        if (i == me.startrow) {
                            console.log(r);
                        } 
                        //console.log(r[map[o]]);                           
                        let item = me.itemParse(o, r[map[o]].trim(), testItems, r);
                        //console.log('item :');
                        //console.log(item);
                        if (item == 'false number') {
                            if (r[map[o] - 1]) {
                                item = me.itemParse(o, r[map[o] - 1].trim() + r[map[o]].trim());
                            }
                            else {
                                item = null;
                            }
                        }
                        if (item == 'new facility') {
                            usingFacilities = true;
                        }
                        if (o == 'FACILITY_NAME' && usingFacilities) {
                            obj[o] = me.currentFacility.trim();
                        }
                        else {
                            obj[o] = (item == '') ? null : item;
                        }
                    }
                }
                if (me.isCogs) {
                    if (obj.REP_NAME !== '' && obj.REP_NAME !== null && obj.REP_NAME !== undefined && obj.FACILITY_NAME !== '' && obj.FACILITY_NAME !== null && obj.FACILITY_NAME !== undefined) {
                        obj['UPLOAD_MONTH'] = me.upload_month;
                        obj['UPLOAD_YEAR'] = me.upload_year;
                        obj['CREATED_DATE'] = momentDate;
                        obj['CREATED_BY'] = me.currentUser;
                        obj['MODIFIED_DATE'] = momentDate;
                        obj['MODIFIED_BY'] = me.currentUser;
                        table.push(obj);
                    }
                }
                else {
                    if (obj.PATIENT_LAST_NAME !== '' && obj.PATIENT_LAST_NAME !== null && obj.PATIENT_LAST_NAME !== 'PATIENT NAME' && obj.PATIENT_LAST_NAME !=='TOTAL' && obj.REP_NAME !== '' && obj.REP_NAME !== null && obj.REP_NAME !== undefined) {
                        if (obj.PATIENT_LAST_NAME && obj.FACILITY_NAME && obj.PATIENT_FIRST_NAME) {
                            if (obj.PATIENT_LAST_NAME.toLowerCase().indexOf('ref source') > -1 || obj.FACILITY_NAME.toLowerCase().indexOf('ref source') > -1 || obj.PATIENT_FIRST_NAME.toLowerCase().indexOf('ref source') > -1) {
                                obj = null;
                            }                        
                            else {
                                if (obj.PATIENT_FIRST_NAME == 'new facility' || obj.PATIENT_LAST_NAME == 'new facility') {
                                    obj = null;
                                }
                                else {
                                    if (obj.FACILITY_NAME !== '' && obj.FACILITY_NAME !== null && obj.FACILITY_NAME !== undefined) {
                                        obj['UPLOAD_MONTH'] = me.upload_month;
                                        obj['UPLOAD_YEAR'] = me.upload_year;
                                        obj['BILLER_ID'] = parseInt(me.biller);
                                        obj['CREATED_DATE'] = momentDate;
                                        obj['CREATED_BY'] = me.currentUser;
                                        obj['MODIFIED_DATE'] = momentDate;
                                        obj['MODIFIED_BY'] = me.currentUser;
                                        table.push(obj);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            i++;
        }
        me.writeCSVToFile(table);
    }
    setMapping(headers, data) {
        let me = this;
        let map = {};
        let heads = [];

        for (var h of headers) {
            heads.push(h.trim());
        }
        for (var d of data) {
            let index = heads.indexOf(d.RAW_COLUMN_NAME);
            if (index > -1) {
                map[d.MAPPED_COLUMN_NAME] = index;
            }
        }
        return map;
    }
    writeCSVToFile(data) {
        let me = this;
        console.log("Writing data to " + data.length.toString())
        let fields = [];
        for (var f in data[0]) {
            fields.push(f);
        }

        let writer = CSV2({data: data, fields: fields});
        me.filelocation =`${filepath}/${me.title}.build.csv`;
        fs.writeFile(me.filelocation, writer, function(err){
            if (err) {
                me.response.status(500);
                me.response.send({
                    validFile: false,
                    fileName: me.file.originalname,
                    error: `Failed when attempting to write CSV File for Upload`,
                    errorObject: err
                });
            }
            else {
                me.response.status(200);
                me.response.send({
                    validFile: true,
                    rows: me.rows,
                    fileName: me.file.originalname,
                    success: `Schema Checked and File Cleaned`,
                    successObject: data[0]
                });  
            }
        });
    }
    loadFileToDatabase() {
        let me = this;
        let deleteQuery = '';
        let query = '';
        console.log("Biller is " + me.biller)
        if (me.isCogs) {
            deleteQuery = `DELETE FROM CogsStaging WHERE UPLOAD_MONTH = ${me.upload_month} AND UPLOAD_YEAR = ${me.upload_year}`;
            query =
                "LOAD DATA LOCAL INFILE '" + me.filelocation + "' INTO TABLE CogsStaging FIELDS TERMINATED BY ',' " +
                "ENCLOSED BY '\"'" + " LINES TERMINATED BY '\\n' IGNORE 1 LINES" +
                "(@REP_NAME,@LINE_ID,@FACILITY_NAME,@COG_DATE,@TRANSACTION_TYPE,@AMOUNT,@ID_NUM,@DESC_NAME,@DESCRIPTION,@UPLOAD_MONTH,@UPLOAD_YEAR,@CREATED_DATE,@CREATED_BY,@MODIFIED_DATE,@MODIFIED_BY)" +
                "SET REP_NAME = nullif(@REP_NAME, ''),LINE_ID = nullif(@LINE_ID, ''),FACILITY_NAME = nullif(@FACILITY_NAME, ''),COG_DATE = nullif(@COG_DATE, ''),TRANSACTION_TYPE = nullif(@TRANSACTION_TYPE, ''),AMOUNT = nullif(@AMOUNT, ''),ID_NUM = nullif(@ID_NUM, ''),DESC_NAME = nullif(@DESC_NAME, ''),DESCRIPTION = nullif(@DESCRIPTION, '')," +
                "UPLOAD_MONTH = nullif(@UPLOAD_MONTH, ''),UPLOAD_YEAR = nullif(@UPLOAD_YEAR, ''),CREATED_DATE = nullif(@CREATED_DATE, ''),CREATED_BY = nullif(@CREATED_BY, ''),MODIFIED_DATE = nullif(@MODIFIED_DATE, ''),MODIFIED_BY = nullif(@MODIFIED_BY, '')";                
        }      
        else {
            deleteQuery = `DELETE FROM PaidBDSStaging WHERE UPLOAD_MONTH = ${me.upload_month} AND UPLOAD_YEAR = ${me.upload_year} AND BILLER_ID = ${me.biller}`;
            query =
                "LOAD DATA LOCAL INFILE '" + me.filelocation + "' INTO TABLE PaidBDSStaging FIELDS TERMINATED BY ',' " +
                "ENCLOSED BY '\"'" + " LINES TERMINATED BY '\\n' IGNORE 1 LINES" +
                "(@REP_NAME,@LINE_ID,@FACILITY_NAME,@PATIENT_LAST_NAME,@PATIENT_FIRST_NAME,@DATE_OF_SERVICE,@PAID_AMOUNT,@PAID_DATE,@INSURANCE_COMPANY,@UPLOAD_MONTH,@UPLOAD_YEAR,@BILLER_ID,@CREATED_DATE,@CREATED_BY,@MODIFIED_DATE,@MODIFIED_BY)" +
                "SET REP_NAME = nullif(@REP_NAME, ''),LINE_ID = nullif(@LINE_ID, ''),FACILITY_NAME = nullif(@FACILITY_NAME, ''),PATIENT_LAST_NAME = nullif(@PATIENT_LAST_NAME, ''),PATIENT_FIRST_NAME = nullif(@PATIENT_FIRST_NAME, ''),DATE_OF_SERVICE = nullif(@DATE_OF_SERVICE, ''),PAID_AMOUNT = nullif(@PAID_AMOUNT, ''),PAID_DATE = nullif(@PAID_DATE, ''),INSURANCE_COMPANY = nullif(@INSURANCE_COMPANY, '')," +
                "UPLOAD_MONTH = nullif(@UPLOAD_MONTH, ''),UPLOAD_YEAR = nullif(@UPLOAD_YEAR, ''),BILLER_ID = nullif(@BILLER_ID, ''),CREATED_DATE = nullif(@CREATED_DATE, ''),CREATED_BY = nullif(@CREATED_BY, ''),MODIFIED_DATE = nullif(@MODIFIED_DATE, ''),MODIFIED_BY = nullif(@MODIFIED_BY, '')";        
        }
        mysql.query('Remove from PAID BDS', deleteQuery, function(results, me, response, err) {
            /*if (err) {
                me.response.status(500);
                me.response.send({
                    error: 'Failed when attempting to clean staging table',
                    errorObject: err
                });
            }*/
            //else {
                devlog.log("Data cleaned from Staging!");
                me.mysql.query('Data Staging Push', query, function(results, me, response, err) {
                    /*if (err) {
                        me.response.status(500);
                        me.response.send({
                            error: 'Failed when attempting to push data to staging table',
                            errorObject: err
                        });
                    }
                    else {*/

                        devlog.log("New data loaded to staging!");
                        let mappingQuery = `
                            CALL MAPFACILITES(${(me.biller) ? me.biller : 0}, ${me.upload_month}, ${me.upload_year}, ${(me.isCogs) ? 1 : 0})
                        `
                        me.mysql.query('Data Mapping', mappingQuery, function(results, me, response, err) {
                            /*if (err) {
                                me.response.status(500);
                                me.response.send({
                                    error: 'Failed when attempting to map facilities and reps',
                                    errorObject: err
                                });
                            }
                            else {*/
                                me.response.status(200);
                                if (results) {
                                    if (results[0].length > 0) {
                                        me.response.send({
                                            isMapped: false,
                                            unmappedItems: results,
                                            error: 'There are some unmapped items to review'
                                        });  
                                    }    
                                    else {
                                        me.response.send({
                                            isMapped: true
                                        });                                           
                                    }                          
                                }
                                else {
                                    me.response.send({
                                        isMapped: true
                                    });                                
                                }
                            //}
                        }, me, me.response)
                    //}
                }, me, me.response);
            //}
        }, me, me.response);
    }
    itemParse(map, item, testItems, row) {
        let me = this;
        let index = item.indexOf(',');
        if (map == 'PATIENT_LAST_NAME') {
            if (item.toLowerCase().indexOf('ref source') > -1) {
                let fac = "";
                if (item.toLowerCase().indexOf("number of records") > -1) {
                    fac = me.currentFacility;
                }
                else {
                    fac = item.replace(/ref source -? ?/gi, "").toUpperCase();
                }
                
                if (testItems) {
                    if (testItems[1]) {
                        if (testItems[1] !== '') {
                            fac = fac + testItems[1];
                        }
                    }
                    if (testItems[2]) {
                        if (testItems[2] !== '') {
                            fac = fac + testItems[2];
                        }
                    }
                }
                me.currentFacility = fac;
                return 'new facility';
            }
            if (index > -1) {
                return item.substring(0, index).trim().toUpperCase();
            }
            return item.toUpperCase();
        }
        if (map == 'PATIENT_FIRST_NAME') {
            if (index > -1) {
                return item.substring(index + 1, item.length).trim().toUpperCase();
            }
            if (item.toLowerCase().indexOf("number of records") > -1) {
                return ''
            }            
            return item.toUpperCase();          
        }
        if (map == 'PAID_AMOUNT' || map == 'AMOUNT') {
            if (item !== '') {
                let num = item.replace('$', '');
                if (num.indexOf('(') > -1) {
                    num = num.replace('(', '');
                    num = num.replace(')', '');
                    num = parseFloat(num) * -1;
                }
                else {
                    num = parseFloat(num);
                    if (me.title == 'Pro DME' || me.title == 'Duramed' || me.title == 'Symed' || me.title == 'Capital') {
                        num = num * -1;
                    }
                }
                return num;
            }
            return item;
        }
        if (map == 'REP_NAME' && me.isCogs) {
            let rep = row[0];
            if (rep !== undefined && rep !== null && rep !== '') {
                if (rep.substring(0, 5) !== 'Total') {
                    if (rep !== me.currentRepName) {
                        me.currentRepName = rep;
                        return me.currentRepName;
                    }
                    else {
                        return me.currentRepName;
                    }
                }
                else {
                    return me.currentRepName;
                }
            }
            else {
                return me.currentRepName;
            }
        }
        if (map == 'PAID_DATE' || map == 'DATE_OF_SERVICE' || map == 'COG_DATE') {
            if (item !== '' || item !== null) {
                let testDate =  moment(item, ["MM-DD-YYYY", "MM-DD-YY"]).format("YYYY-MM-DD");
                let isValid = moment(item, ["MM-DD-YYYY", "MM-DD-YY"]).isValid();
                if (!isValid) {
                    testDate = null;
                }
                if (testDate == '0000-00-00') {
                    testDate = null;
                }
                return testDate;
            }
            if (item == '0000-00-00') {
                item = null;
            }
            return null;
        }
        return item.toUpperCase();
    }
}

module.exports = fileLoad;