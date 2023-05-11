const express = require('express');
const uploads = express.Router();
const utils = require('../utilities/utils');
const devlog = require('../utilities/devlog');
const mysql = require('../utilities/mysql');
const fileLoad = require('../utilities/fileLoad');
const multer = require('multer');
const config = require('../config.js');
const filepath = config.FILE_LOCATION;
const async = require('async');
const upload = multer({
    dest: 'temp/', 
    limits: {
        files: 1
    },
    fileFilter: function(request, file, cb) {
        try {    
            cb(null, true);
        }
        catch(e) {
            console.log(e)
        }        
    },
    storage: multer.diskStorage({
        destination: function(request, file, cb) {
            try {
                cb(null, filepath);
            }
            catch(e) {
                console.log(e)
            }            
        },
        filename: function(request, file, cb) {
            try {
                cb(null, request.query.biller);
            }
            catch(e) {
                console.log(e)
            }            
        }
    }) 
});

uploads.post('/schemaCheck', utils.ensureAuthenticated, utils.ensureAdminUser, upload.single('uploadFiles'), function(request, response) {
    try {
        devlog.log(`Uploading File`);
        const reportID = request.query.reportID;
        let billerID = request.query.billerID;
        const sheetNumber = request.query.sheetNumber;
        const startRow = request.query.startRow;
        const month = request.query.month;
        const year = request.query.year;     
        const title = request.query.biller   
        const isCogs = (request.query.isCogs == 'yes') ? true : false;  
        if (isCogs) {
            billerID = 0;
        }        
        devlog.log(`Upload Biller ${title} POST Route Selected (Schema Check)`);
        devlog.log("Checking Schema");
        let fileLoader = new fileLoad(request, response, billerID, title, startRow, sheetNumber, isCogs);
        fileLoader.upload_month = month;
        fileLoader.upload_year = year;
        fileLoader.reportID = reportID;
        fileLoader.currentUser = request.fullUser.ID;
        let fileStatus = fileLoader.saveAsCSV();            
    }
    catch(e) {
        console.log(e);
        response.status(500);
        response.send({
            error: 'Internal Server Error',
            errorObject: e
        });
    }    
});

uploads.get('/getReportActivity', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    let query = `
        SELECT isACTIVE FROM ActiveReports WHERE UPLOAD_MONTH = ${request.params.month} AND UPLOAD_YEAR = ${request.params.year}
    `
    mysql.query('ActiveReports', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed ActiveReports",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "ActiveReports",
                successObject: results
            });            
        }
    }, null, response, 'Failed ActiveReports');   

});

uploads.post('/setReportActivity', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    let activity = request.body.activity
    let query = `
        CALL UpdateActiveReports(${request.body.month},${request.body.year},${request.fullUser.ID},${(request.body.activity) ? 'TRUE' : 'FALSE'})
    `
    mysql.query('Upadating Report Activity', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed Upadating Report Activity",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Upadating Report Activity",
                successObject: results
            });            
        }
    }, null, response, 'Failed Upadating Report Activity');     
});

uploads.post('/:billerID/mapFile', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    try {
        devlog.log("Mapping CSV File");
        let biller = request.params.billerID;
        const month = request.body.month;
        const year = request.body.year;
        const title = request.body.title;
        const isCogs = (request.query.isCogs == 'yes') ? true : false; 
        if (isCogs) {
            biller = 0;
        }
        console.log("my title is " + title)
        let fileLoader = new fileLoad(request, response, biller, title);
        fileLoader.isCogs = isCogs;
        fileLoader.upload_month = month;
        fileLoader.upload_year = year;
        fileLoader.filelocation = `${fileLoader.filepath}/${fileLoader.title}.build.csv`;
        console.log("my file is " + fileLoader.filelocation)
        let fileStatus = fileLoader.loadFileToDatabase(); 
    }
    catch(e) {
        response.status(500);
        response.send({
            error: 'Internal Server Error',
            errorObject: e
        });
    }                 
});

uploads.post('/:billerID/pushToDatabase', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    try {
        let biller = request.params.billerID;
        const title = request.body.title;    
        const month = request.body.month;
        const year = request.body.year;    
        const isCogs = (request.query.isCogs == 'yes') ? true : false; 
        if (isCogs) {
            biller = 0;
        }
        let query = `
            CALL LOADTODATABASE(${(biller) ? biller : 0}, ${month}, ${year}, ${(isCogs) ? 1 : 0})
        ` 
        console.log(query);      
        mysql.query('Push to database', query, function(results, item, response, err) {
            if (err) {
                response.status(500);
                response.send({
                    isValid: false,
                    error: 'Failed when loaded data to database',
                    errorObject: err
                });                  
            }
            else {
                if (isCogs) {
                    query = `
                        SELECT SUM(AMOUNT) as PAID_AMOUNT FROM Cogs 
                        WHERE UPLOAD_MONTH = ${month} AND UPLOAD_YEAR = ${year}
                    `
                }
                else {
                    query = `
                        SELECT SUM(PAID_AMOUNT) as PAID_AMOUNT FROM PaidBDS 
                        WHERE BILLER_ID = ${biller} AND UPLOAD_MONTH = ${month} AND UPLOAD_YEAR = ${year}
                    `
                }

                let buildResults = results
                mysql.query('Get Final Amount',query, function(results, item, response, err) {
                    if (err) {
                        response.status(500);
                        response.send({
                            isValid: false,
                            error: 'Failed when attempting to get PAID_AMOUNT from PaidBDS',
                            errorObject: err
                        });  
                    }
                    else {
                        response.status(200);
                        response.send({
                            isValid: true,
                            success: 'Successful load of data',
                            paidTotal: results,
                            results: buildResults
                        }); 
                    }
                }, null, response, 'Failed to get Final Amount');                 
            }
        }, null, response, 'Failed to load to Database');
    }
    catch(e) {
        response.status(500);
        response.send({
            isValid: false,
            error: 'Internal Server Error',
            errorObject: e
        });        
    }
});
module.exports = uploads;