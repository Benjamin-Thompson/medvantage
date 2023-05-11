const express = require('express');
const general = express.Router();
const utils = require('../utilities/utils');
const devlog = require('../utilities/devlog');
const mysql = require('../utilities/mysql');
const fs = require("fs");
const CSV2 = require("json2csv");
const async = require('async');
const config = require('../config.js');
const filepath = config.FILE_LOCATION;




general.get('/reports', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Reports Route Selected");
    let query = `
        SELECT * FROM Reports
    `;
    mysql.query('Getting Reps', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.put('/reports/:id', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Reports Route Selected PUT");
    let query = `
        UPDATE Reports SET TITLE = '${request.body.TITLE}', SHEET_NUMBER = ${request.body.SHEET_NUMBER}, START_ROW = ${request.body.START_ROW},
        MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
        WHERE ID = ${request.params.id}
    `;
    mysql.query('Updating Reps', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                success: 'Updated Report'
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.get('/columns/:reportID', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Reports Route Selected");
    let query = `
        SELECT * FROM Report_Column_Mapping WHERE REPORT_ID = ${request.params.reportID}
    `;
    mysql.query('Getting Reps', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.put('/columns/:id', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Columns Route Selected PUT");
    let query = `
        UPDATE Report_Column_Mapping SET RAW_COLUMN_NAME = '${request.body.RAW_COLUMN_NAME}',
        MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
        WHERE ID = ${request.params.id}
    `;
    mysql.query('Updating Column Mapping', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                success: 'Updated Column Mapping'
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.get('/reps', utils.ensureAuthenticated, function(request, response) {
    devlog.log("Rep Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.COMMISSION
            FROM Reps a
            ORDER BY a.TITLE
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.COMMISSION
            FROM Reps a
            WHERE a.ID = ${request.fullUser.REP_ID} ${(request.fullUser.ViewReps.length > 0) ? 'OR a.ID IN (' + request.fullUser.ViewReps.join(',') + ')' : ''}
        `     
        console.log(query);
    }
    else {
        query = `
            SELECT a.ID, a.TITLE, a.COMMISSION
            FROM Reps a
            WHERE a.ID = ${request.fullUser.REP_ID}
        `        
    }
  
    mysql.query('Getting Reps', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.get('/reps/:id', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Rep Route Selected for Individual");
    let query = '';
    let id = request.params.id;
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT * FROM (
            SELECT a.ID, a.FACILITY_ID, a.REP_ID, b.TITLE as REP_NAME, c.TITLE as FACILITY_NAME, a.COMMISSION, a.COMMISSIONTYPE, a.UPLOAD_MONTH, a.UPLOAD_YEAR, a.SHOW_FACILITY
            FROM Facilities_To_Rep a
            LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Facilities c ON a.FACILITY_ID = c.ID
            WHERE a.REP_ID = ${id}) p
            ORDER BY FACILITY_NAME            
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT * FROM (
            SELECT a.ID, a.FACILITY_ID, a.REP_ID, b.TITLE as REP_NAME, c.TITLE as FACILITY_NAME, a.COMMISSION, a.COMMISSIONTYPE, a.UPLOAD_MONTH, a.UPLOAD_YEAR, a.SHOW_FACILITY
            FROM Facilities_To_Rep a
            LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Facilities c ON a.FACILITY_ID = c.ID
            ORDER BY a.TITLE
            WHERE a.REP_ID = ${id} OR IN [${request.fullUser.ViewReps.join(',')}]
            ORDER BY FACILITY_NAME  
        `
    }
  
    mysql.query('Getting Reps', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.post('/reps', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Rep Route Selected in POST");
    let ID = request.body.ID
    let query = '';
    let insert = false;
    let upload = request.body.upload;
    if (upload) {
        if (request.fullUser.USER_TYPE == 'ADMIN') {
            let split = upload.split('\n');
            async.forEach(split, function(item, done){
                let itemSplit = item.split('|');
                let TITLE = itemSplit[0];
                let COMMISSION = itemSplit[1];
                let query = `
                    INSERT INTO Reps (TITLE, COMMISSION, TRUECOMMISSION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${TITLE}', ${COMMISSION}, ${COMMISSION}, CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
                console.log(query);
                mysql.query('Bulk Rep Update', query, function(results, item, response, err) {
                    done();
                }, null, null, null, null);   
            });
            response.status(200).send({success:"Complete"});
        }
        else {
            response.status(401).send({error:'Unauthorized Access'});
        }
    }
    else {
        if (ID && ID !== '' && ID !== null) {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    UPDATE Reps SET TITLE = '${request.body.TITLE}', COMMISSION = ${request.body.COMMISSION},
                    TRUECOMMISSION = ${request.body.COMMISSION},
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
                    WHERE ID = ${ID}
                `; 
            }
            else if (request.fullUser.USER_TYPE == 'SUPER') {
                query = `
                    UPDATE Reps SET TITLE = '${request.body.TITLE}', COMMISSION = ${request.body.COMMISSION},
                    TRUECOMMISSION = (SELECT (COMMISSION * ${request.body.COMMISSION}) FROM Reps WHERE ID = ${request.fullUser.REP_ID})
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
                    WHERE ID = ${ID} AND ID IN (SELECT REP_ID FROM Users WHERE ID IN
                    (SELECT USER_ID_TO_VIEW FROM Viewable_Users
                    WHERE USER_ID = ${request.fullUser.ID})
                `; 
            }
        }
        else {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    INSERT INTO Reps (TITLE, COMMISSION, TRUECOMMISSION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${request.body.TITLE}', ${request.body.COMMISSION}, ${request.body.COMMISSION}, CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
            }  
            else if (request.fullUser.USER_TYPE == 'SUPER') {
                query = `
                    INSERT INTO Reps (TITLE, COMMISSION, TRUECOMMISSION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${request.body.TITLE}', ${request.body.COMMISSION}, (SELECT (COMMISSION * ${request.body.COMMISSION}) FROM Reps WHERE ID = ${request.fullUser.REP_ID}), 
                    CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
            }                
        }
        mysql.query('Set Reps', query, function(results, item, response, err) {
            if (err) {
                response.status(500);
                response.send({
                    error: 'Could not retrieve Reps',
                    errorObject: err
                });
            }
            else {
                response.status(200);
                response.send({success:'Updated Rep'});           
            }
        }, null, response, 'Could not retrieve');
    }    
});

general.get('/bdserrors', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT a.TITLE as FacilityName, MAX(b.SCAN_DATE) as LastEntryDate
        FROM Facilities a LEFT JOIN BDS b ON a.ID = b.FACILITY_ID
        GROUP BY a.TITLE
    `;    
    console.log(query);
    mysql.query('Download BDS Errors', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/BDSFacilityError.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/rep/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM Reps a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
    `;    
    console.log(query);
    mysql.query('Download Reps', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/Reps.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/commission/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT a.*
        FROM COMMISSION_TABLE a
        WHERE UPLOAD_MONTH = ${request.query.month} AND UPLOAD_YEAR = ${request.query.year}
    `;    
    console.log(query);
    mysql.query('Download Commissions', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/COMMISSION.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.post('/rep/facilities', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Rep Facility Route Selected in POST");
    let ID = request.body.ID;
    let REP_ID = request.body.REP_ID;
    let query = '';
    let upload = request.body.upload;
    if (upload) {
        if (request.fullUser.USER_TYPE == 'ADMIN') {
            let split = upload.split('\n');
            async.forEach(split, function(item, done){
                let itemSplit = item.split('|');
                REP_ID = itemSplit[0];
                let FACILITY_ID = itemSplit[1];
                let COMMISSION = itemSplit[2];
                let COMMISSIONTYPE = itemSplit[3];
                let UPLOAD_MONTH = itemSplit[4];
                let UPLOAD_YEAR = itemSplit[5];
                let SHOW_FACILITY = itemSplit[6];
                let query = `
                    INSERT INTO Facilities_To_Rep (REP_ID, FACILITY_ID, COMMISSIONTYPE, COMMISSION, TRUECOMMISSION, CREATED_DATE, CREATED_BY,MODIFIED_DATE, MODIFIED_BY, UPLOAD_MONTH, UPLOAD_YEAR, SHOW_FACILITY) 
                    VALUES (${REP_ID}, ${FACILITY_ID}, '${COMMISSIONTYPE}', ${COMMISSION}, ${COMMISSION}, 
                    CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}, ${UPLOAD_MONTH}, ${UPLOAD_YEAR}, ${SHOW_FACILITY})                    
                `; 
                mysql.query('Bulk Rep Update', query, function(results, item, response, err) {
                    done();
                }, null, null, null, null);   
            });
            response.status(200).send({success:"Complete"});
        }
        else {
            response.status(401).send({error:'Unauthorized Access'});
        }
    }
    else {
        if (ID && ID !== '' && ID !== null) {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    UPDATE Facilities_To_Rep SET FACILITY_ID = ${request.body.FACILITY_ID}, REP_ID = ${REP_ID}, COMMISSION = ${request.body.COMMISSION},
                    TRUECOMMISSION = ${request.body.COMMISSION}, COMMISSIONTYPE = '${request.body.COMMISSIONTYPE}',
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE(), UPLOAD_YEAR = ${request.body.UPLOAD_YEAR}, UPLOAD_MONTH = ${request.body.UPLOAD_MONTH}, SHOW_FACILITY = ${request.body.SHOW_FACILITY}
                    WHERE ID = ${ID}
                `;
            }
            else if (request.fullUser.USER_TYPE == 'SUPER') {
                query = `
                    UPDATE Facilities_To_Rep SET FACILITY_ID = ${request.body.FACILITY_ID}, REP_ID = ${REP_ID}, COMMISSION = ${request.body.COMMISSION},
                    TRUECOMMISSION = ${request.body.COMMISSION}, COMMISSIONTYPE = '${request.body.COMMISSIONTYPE}',
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE(), UPLOAD_YEAR = ${request.body.UPLOAD_YEAR}, UPLOAD_MONTH = ${request.body.UPLOAD_MONTH}, SHOW_FACILITY = ${request.body.SHOW_FACILITY}
                    WHERE ID = ${ID} AND REP_ID IN
                    (SELECT REP_ID FROM Users WHERE ID IN
                    (SELECT USER_ID_TO_VIEW FROM Viewable_Users
                    WHERE USER_ID = ${request.fullUser.ID})
                `; 
            }
        }
        else {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    INSERT INTO Facilities_To_Rep (REP_ID, FACILITY_ID, COMMISSIONTYPE, COMMISSION, TRUECOMMISSION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY, UPLOAD_MONTH, UPLOAD_YEAR, SHOW_FACILITY) 
                    VALUES (${REP_ID}, ${request.body.FACILITY_ID}, '${request.body.COMMISSIONTYPE}', ${request.body.COMMISSION}, ${request.body.COMMISSION}, 
                    CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}, ${request.body.UPLOAD_MONTH}, ${request.body.UPLOAD_YEAR}, ${request.body.SHOW_FACILITY})
                `; 
            }  
            else if (request.fullUser.USER_TYPE == 'SUPER') {
                query = `
                    INSERT INTO Facilities_To_Rep (REP_ID, FACILITY_ID, COMMISSIONTYPE, COMMISSION, TRUECOMMISSION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY, UPLOAD_MONTH, UPLOAD_YEAR, SHOW_FACILITY) 
                    VALUES (${REP_ID}, ${request.body.FACILITY_ID}, '${request.body.COMMISSIONTYPE}', ${request.body.COMMISSION},
                    (SELECT (COMMISSION * ${request.body.COMMISSION}) FROM Reps WHERE ID = ${request.fullUser.REP_ID}), 
                    CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}, ${request.body.UPLOAD_MONTH}, ${request.body.UPLOAD_YEAR}, ${request.body.SHOW_FACILITY})
                `; 
            }                
        }
        console.log(query);
        mysql.query('Set Rep Facilities', query, function(results, item, response, err) {
            if (err) {
                response.status(500);
                response.send({
                    error: 'Could not retrieve Rep Facilities',
                    errorObject: err
                });
            }
            else {
                response.status(200);
                response.send({success:'Updated Rep Facilities'});           
            }
        }, null, response, 'Could not retrieve');
    }    
});

general.delete('/reps/:id/facility/:facilityid', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Rep Facility Route Selected in DELETE");
    let query = '';
    let repid = request.params.id;
    let facilityid = request.params.facilityid;
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            DELETE FROM Facilities_To_Rep
            WHERE FACILITY_ID = ${facilityid} AND REP_ID = ${repid}       
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            DELETE FROM Facilities_To_Rep
            WHERE FACILITY_ID = ${facilityid} AND REP_ID = ${repid} 
            AND REP_ID IN
            (SELECT REP_ID FROM Users WHERE ID IN
            (SELECT USER_ID_TO_VIEW FROM Viewable_Users
            WHERE USER_ID = ${request.fullUser.ID})) p
            ORDER BY FACILITY_NAME  
        `
    }
    mysql.query('Delete Reps', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not delete Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({success:'Deleted Rep Facility'});           
        }
    }, null, response, 'Could not retrieve');   
});

general.get('/reps/facilities/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT d.TITLE as REP, e.TITLE as FACILITY, a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM Facilities_To_Rep a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
        LEFT JOIN Reps d ON a.REP_ID = d.ID
        LEFT JOIN Facilities e ON a.FACILITY_ID = e.ID
    `;    
    mysql.query('Download Rep Facilities', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/RepFacilities.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/facilities', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    devlog.log("Facilities Route Selected");
    let query = '';
    query = `
        SELECT a.ID, a.TITLE, a.ACRONYM FROM Facilities a
        ORDER BY a.TITLE
    `; 
    mysql.query('Get Facilities', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Facilities',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.post('/facilities', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Facility Route Selected in POST");
    let ID = request.body.ID
    let query = '';
    let insert = false;
    let upload = request.body.upload;
    if (upload) {
        if (request.fullUser.USER_TYPE == 'ADMIN') {
            let split = upload.split('\n');
            async.forEach(split, function(item, done){
                let itemSplit = item.split('|');
                let TITLE = itemSplit[1];
                let ACRONYM = itemSplit[0]
                let query = `
                    INSERT INTO Facilities (TITLE, ACRONYM, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${TITLE.replace(/\'/gi,"\\'")}', '${ACRONYM.replace(/\'/gi,"\\'")}', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
                mysql.query('Bulk Facility Update', query, function(results, item, response, err) {
                    done();
                }, null, null, null, null);   
            });
            response.status(200).send({success:"Complete"});
        }
        else {
            response.status(401).send({error:'Unauthorized Access'});
        }
    }
    else {
        if (ID && ID !== '' && ID !== null) {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    UPDATE Facilities SET TITLE = '${request.body.TITLE.replace(/\'/gi,"\\'")}', ACRONYM = '${request.body.ACRONYM.replace(/\'/gi,"\\'")}',
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
                    WHERE ID = ${ID}
                `; 
            }
        }
        else {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    INSERT INTO Facilities (TITLE, ACRONYM, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${request.body.TITLE.replace(/\'/gi,"\\'")}', '${request.body.ACRONYM.replace(/\'/gi,"\\'")}', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
            }      
        }
        mysql.query('Set Facilities', query, function(results, item, response, err) {
            if (err) {
                response.status(500);
                response.send({
                    error: 'Could not retrieve Facilities',
                    errorObject: err
                });
            }
            else {
                response.status(200);
                response.send({success:'Updated Facilities'});           
            }
        }, null, response, 'Could not retrieve');
    }    
});
general.get('/facilities/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM Facilities a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
    `;    
    mysql.query('Download Facilities', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/Facilities.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.post('/facilitiesMap', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Facility Map Route Selected in POST");
    let query = '';
    let upload = request.body.upload;
    if (upload) {
        if (request.fullUser.USER_TYPE == 'ADMIN') {
            async.forEach(upload, function(item, done){
                let myItem = item;
                if (myItem.FACILITY_NAME !== '' && myItem.FACILITY_NAME !== null) {
                    query = `
                        INSERT INTO Facilities (TITLE, ACRONYM, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                        VALUES ('${myItem.FACILITY_NAME.replace(/\'/gi,"\\'")}', '', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                        ON DUPLICATE KEY UPDATE MODIFIED_BY = ${request.fullUser.ID}
                    `
                    mysql.query('Facility Update', query, function(results, item, response, err) {
                        query = `
                            INSERT INTO Facilities_Map (UGLY_FACILITY, FACILITY_ID, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                            VALUES('${myItem.RAW_FACILITY_NAME.replace(/\'/gi,"\\'")}', 
                            (SELECT ID FROM Facilities WHERE LOWER(TITLE) = LOWER('${myItem.FACILITY_NAME.replace(/\'/gi,"\\'")}')), 
                            CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                            ON DUPLICATE KEY UPDATE FACILITY_ID = (SELECT ID FROM Facilities WHERE LOWER(TITLE) = LOWER('${myItem.FACILITY_NAME}'))
                        `
                        mysql.query('Bulk Facility Map Update', query, function(results, item, response, err) {
                            done();
                        }, null, null, null, null); 
                    }, null, null, null, null);
                }
                else {
                    if (myItem.FACILITY_ID !== null && myItem.FACILITY_ID !== '') {
                        query = `
                            INSERT INTO Facilities_Map (UGLY_FACILITY, FACILITY_ID, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                            VALUES('${myItem.RAW_FACILITY_NAME.replace(/\'/gi,"\\'")}', ${myItem.FACILITY_ID}, 
                            CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                            ON DUPLICATE KEY UPDATE FACILITY_ID = ${myItem.FACILITY_ID}
                        `
                        mysql.query('Bulk Facility Map Update', query, function(results, item, response, err) {
                            done();
                        }, null, null, null, null); 
                    }
                    else {
                        done();
                    }
                }
            });
            response.status(200).send({success:"Complete"});
        }
        else {
            response.status(401).send({error:'Unauthorized Access'});
        }
    }
});

general.get('/users', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Users Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.EMAIL, a.USER_TYPE, a.LAST_LOGIN, a.ISACTIVE, a.PICTURE, a.REP_ID, b.TITLE as REP_NAME FROM Users a LEFT JOIN Reps b
            ON a.REP_ID = b.ID
            ORDER BY a.TITLE
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.EMAIL, a.USER_TYPE, a.LAST_LOGIN, a.ISACTIVE, a.PICTURE, b.TITLE as REP_NAME FROM Users a LEFT JOIN Reps b
            ON a.REP_ID = b.ID
            ORDER BY a.TITLE
            WHERE a.ID = ${request.fullUser.ID} OR a.ID IN (SELECT USER_ID_TO_VIEW FROM Viewable_Users WHERE USER_ID = ${request.fullUser.ID})
            ORDER BY a.TITLE
        `; 
    }     
    mysql.query('Get Users', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Users',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.post('/users', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Users Route Selected in POST");
    let ID = request.body.ID
    let query = '';
    let insert = false;
    let upload = request.body.upload;
    if (upload) {
        if (request.fullUser.USER_TYPE == 'ADMIN') {
            let split = upload.split('\n');
            async.forEach(split, function(item, done){
                let itemSplit = item.split('|');
                let TITLE = itemSplit[0];
                let EMAIL = itemSplit[1];
                let TYPE = itemSplit[2];
                let REP_ID = (itemSplit[3]) ? itemSplit[3] : 'NULL';
                let query = `
                    INSERT INTO Users (TITLE, EMAIL, USER_TYPE, ISACTIVE, REP_ID, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${TITLE}', '${EMAIL}', '${TYPE}', TRUE, ${REP_ID}, CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
                mysql.query('Bulk User Update', query, function(results, item, response, err) {
                    done();
                }, null, null, null, null);   
            });
            response.status(200).send({success:"Complete"});
        }
        else {
            response.status(401).send({error:'Unauthorized Access'});
        }
    }
    else {
        if (ID && ID !== '' && ID !== null) {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    UPDATE Users SET TITLE = '${request.body.TITLE}', EMAIL = '${request.body.EMAIL}', USER_TYPE = '${request.body.USER_TYPE}',
                    REP_ID = ${(request.body.REP_ID) ? request.body.REP_ID : 'NULL'},
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
                    WHERE ID = ${ID}
                `; 
            }
            else if (request.fullUser.USER_TYPE == 'SUPER') {
                query = `
                    UPDATE Users SET TITLE = '${request.body.TITLE}', EMAIL = '${request.body.EMAIL}', USER_TYPE = 'GENERAL',
                    REP_ID = ${(request.body.REP_ID) ? request.body.REP_ID : 'NULL'},
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
                    WHERE ID = ${ID} AND ID IN (SELECT REP_ID_TO_VIEW FROM Viewable_Reps WHERE REP_ID = ${request.fullUser.ID})
                `; 
            }
        }
        else {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    INSERT INTO Users (TITLE,EMAIL, USER_TYPE, ISACTIVE, REP_ID, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${request.body.TITLE}', '${request.body.EMAIL}', '${request.body.USER_TYPE}', TRUE, ${(request.body.REP_ID) ? request.body.REP_ID : 'NULL'}, CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
            }
            else if (request.fullUser.USER_TYPE == 'SUPER') {
                insert = true;
                query = `
                    INSERT INTO Users (TITLE,EMAIL, USER_TYPE, ISACTIVE, REP_ID, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${request.body.TITLE}', '${request.body.EMAIL}', 'GENERAL', TRUE, ${(request.body.REP_ID) ? request.body.REP_ID : 'NULL'}, CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
            }        
        }
        mysql.query('Set Users', query, function(results, item, response, err) {
            if (err) {
                response.status(500);
                response.send({
                    error: 'Could not retrieve Users',
                    errorObject: err
                });
            }
            else {
                if (insert) {
                    query = `
                        INSERT INTO Viewable_Users (USER_ID, USER_ID_TO_VIEW, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                        VALUES ('${request.fullUser.ID}', (SELECT ID FROM Users WHERE EMAIL = '${request.body.EMAIL}'), CURDATE(), NULL, CURDATE(), NULL)
                    `       
                    mysql.query('Set Viewable User', query, function(results, item, response, err) {}, null, null, null, null);      
                }
                response.status(200);
                response.send({success:'Updated Users'});           
            }
        }, null, response, 'Could not retrieve');
    }    
});

general.put('/users', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Users Route Selected in POST");
    let ID = request.body.ID;
    let ACTION = request.body.ACTION;
    let query = '';
    if (ID && ID !== '' && ID !== null) {
        if (request.fullUser.USER_TYPE == 'ADMIN') {
            query = `
                UPDATE Users SET ISACTIVE = ${(ACTION == 'ACTIVATE') ? 'TRUE' : 'FALSE'}
                WHERE ID = ${ID}
            `; 
        }
        else if (request.fullUser.USER_TYPE == 'SUPER') {
            query = `
                UPDATE Users SET ISACTIVE = ${(ACTION == 'ACTIVATE') ? 'TRUE' : 'FALSE'}
                WHERE ID = ${ID} AND ID IN (SELECT REP_ID_TO_VIEW FROM Viewable_Reps WHERE REP_ID = ${request.fullUser.ID})
            `; 
        }
    }
    mysql.query('Update Users State', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Users',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({success:'Updated User'});           
        }
    }, null, response, 'Could not retrieve');    
});
general.get('/users/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT a.*, d.TITLE as REP_NAME, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM Users a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
        LEFT JOIN Reps d ON a.REP_ID = d.ID
    `;    
    mysql.query('Download Users', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/Users.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/billers', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    devlog.log("Billers Route Selected");
    let query = '';
    query = `
        SELECT a.* FROM Billers a 
        ORDER BY a.TITLE
    `; 
    mysql.query('Get Billers', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Billers',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.post('/billers', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Billers Route Selected in POST");
    let ID = request.body.ID
    let query = '';
    let insert = false;
    let upload = request.body.upload;
    if (upload) {
        if (request.fullUser.USER_TYPE == 'ADMIN') {
            async.forEach(upload, function(item, done){
                let itemSplit = item.split('|');
                let TITLE = itemSplit[0];
                let ABBREVIATION = itemSplit[1];
                let query = `
                    INSERT INTO Billers (TITLE, ABBREVIATION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${TITLE}', '${ABBREVIATION}', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
                mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                    query = `
                        INSERT INTO Reports (TITLE, START_ROW, SHEET_NUMBER, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                        VALUES ('${TITLE}', 1, 1, CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                    `
                    console.log(query)
                    mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                        query = `
                            UPDATE Billers SET REPORT_ID = (SELECT ID FROM Reports WHERE TITLE = '${TITLE}')
                            WHERE TITLE = '${TITLE}'
                        `
                        mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                            query = `
                                SELECT ID FROM Reports WHERE TITLE = '${TITLE}'
                            `               
                            mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                                if (TITLE !== 'COGS') {
                                    query = `
                                        INSERT INTO Report_Column_Mapping (REPORT_ID, COLUMN_ORDER_NUMBER, RAW_COLUMN_NAME, MAPPED_COLUMN_NAME, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                                        VALUES 
                                        (${results[0].ID},1,'','REP_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},2,'','LINE_ID', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},3,'','FACILITY_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},4,'','PATIENT_LAST_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},5,'','PATIENT_FIRST_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},6,'','DATE_OF_SERVICE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},7,'','PAID_AMOUNT', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},8,'','PAID_DATE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},9,'','INSURANCE_COMPANY', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                                    `
                                }
                                else {
                                    query = `
                                        INSERT INTO Report_Column_Mapping (REPORT_ID, COLUMN_ORDER_NUMBER, RAW_COLUMN_NAME, MAPPED_COLUMN_NAME, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                                        VALUES 
                                        (${results[0].ID},1,'','REP_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},2,'','LINE_ID', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},3,'','FACILITY_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},4,'','COG_DATE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},5,'','TRANSACTION_TYPE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},6,'','AMOUNT', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},7,'','ID_NUM', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},8,'','DESC_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                        (${results[0].ID},9,'','DESCRIPTION', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                                    `                                    
                                }
                                mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                                    done();
                                }, null, null, null, null); 
                            }, null, null, null, null);  
                        }, null, null, null, null);                         
                    }, null, null, null, null);                     
                }, null, null, null, null); 


            });
            response.status(200).send({success:"Complete"});
        }
        else {
            response.status(401).send({error:'Unauthorized Access'});
        }
    }
    else {
        if (ID && ID !== '' && ID !== null) {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    UPDATE Billers SET TITLE = '${request.body.TITLE}', ABBREVIATION = '${request.body.ABBREVIATION}',
                    MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = CURDATE()
                    WHERE ID = ${ID}
                `; 
            }
        }
        else {
            if (request.fullUser.USER_TYPE == 'ADMIN') {
                query = `
                    INSERT INTO Billers (TITLE, ABBREVIATION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                    VALUES ('${request.body.TITLE}', '${request.body.ABBREVIATION}', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `; 
            }      
        }
        mysql.query('Set Billers', query, function(results, item, response, err) {
            if (err) {
                response.status(500);
                response.send({
                    error: 'Could not retrieve Billers',
                    errorObject: err
                });
            }
            else {
                let TITLE = request.body.TITLE
                query = `
                    INSERT INTO Reports (TITLE, START_ROW, SHEET_NUMBER, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                    VALUES ('${TITLE}', 1, 1, CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                `
                mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                    query = `
                        UPDATE Billers SET REPORT_ID = (SELECT ID FROM Reports WHERE TITLE = '${TITLE}')
                        WHERE TITLE = '${TITLE}'
                    `
                    mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                        query = `
                            SELECT ID FROM Reports WHERE TITLE = '${TITLE}'
                        `            
                        mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                            if (TITLE !== 'COGS') {
                                query = `
                                    INSERT INTO Report_Column_Mapping (REPORT_ID, COLUMN_ORDER_NUMBER, RAW_COLUMN_NAME, MAPPED_COLUMN_NAME, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                                    VALUES 
                                    (${results[0].ID},1,'','REP_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},2,'','LINE_ID', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},3,'','FACILITY_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},4,'','PATIENT_LAST_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},5,'','PATIENT_FIRST_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},6,'','DATE_OF_SERVICE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},7,'','PAID_AMOUNT', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},8,'','PAID_DATE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},9,'','INSURANCE_COMPANY', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                                `
                            }
                            else {
                                query = `
                                    INSERT INTO Report_Column_Mapping (REPORT_ID, COLUMN_ORDER_NUMBER, RAW_COLUMN_NAME, MAPPED_COLUMN_NAME, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
                                    VALUES 
                                    (${results[0].ID},1,'','REP_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},2,'','LINE_ID', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},3,'','FACILITY_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},4,'','COG_DATE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},5,'','TRANSACTION_TYPE', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},6,'','AMOUNT', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},7,'','ID_NUM', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},8,'','DESC_NAME', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID}),
                                    (${results[0].ID},9,'','DESCRIPTION', CURDATE(), ${request.fullUser.ID}, CURDATE(), ${request.fullUser.ID})
                                `                                    
                            }
                            mysql.query('Bulk Biller Update', query, function(results, item, response, err) {
                                response.status(200);
                                response.send({success:'Updated Billers'});   
                            }, null, response, null); 
                        }, null, response, null);  
                    }, null, response, null);                         
                }, null, response, 'Could not retrieve');
            }
        }, null, response, null);
    }
});

general.get('/billers/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM Billers a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
    `;    
    mysql.query('Download Billers', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/Billers.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/activereports', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Active Reports Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.UPLOAD_MONTH, a.UPLOAD_YEAR, a.ISACTIVE FROM Active_Commission_Reports a 
            ORDER BY a.UPLOAD_YEAR, a.UPLOAD_MONTH
        `; 
    } 
    mysql.query('Get ActiveReports', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve ActiveReports',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});


general.get('/facility_reps/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT b.REP_ID as REP_ID, c.TITLE as REP_NAME, 
        a.* FROM Facilities a LEFT JOIN Facilities_To_Rep b ON a.ID = b.FACILITY_ID
        LEFT JOIN Reps c ON b.REP_ID = c.ID
    `; 
    mysql.query('Download Facilities with Rep', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/FacilitiesWithRep.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/bdsdashboard', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    devlog.log("BDS Dashboard Route Selected");
    let query = `
        SELECT COUNT(*) as COUNTERS FROM BDS WHERE DATE(MODIFIED_DATE) = DATE(CURDATE())
        UNION ALL
        SELECT COUNT(*) as COUNTERS FROM BDS WHERE DATE(MODIFIED_DATE) = DATE(CURDATE()) AND MODIFIED_BY = ${request.fullUser.ID} 
        UNION ALL
        SELECT COUNT(*) as COUNTERS FROM BDS WHERE MONTH(MODIFIED_DATE) = MONTH(CURDATE()) AND YEAR(MODIFIED_DATE) = YEAR(CURDATE())
        UNION ALL
        SELECT COUNT(*) as COUNTERS FROM BDS WHERE MONTH(MODIFIED_DATE) = MONTH(CURDATE()) AND YEAR(MODIFIED_DATE) = YEAR(CURDATE()) AND MODIFIED_BY = ${request.fullUser.ID}
        `; 
    mysql.query('Get BDS Dashboard', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve BDS',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});

general.get('/bds', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    devlog.log("BDS Route Selected");
    let mine = request.query.mybds
    let query = '';
    let where = '';
    if (request.query.filterColumn && request.query.filterColumn !== '') {
        let columnName = '';
        if (request.query.filterColumn == 'BILLER_NAME') {
            columnName = 'd.TITLE';
            where = `WHERE LOWER(${columnName}) LIKE '%${request.query.filterString.toLowerCase()}%'`
        }
        else if (request.query.filterColumn == 'FACILITY_NAME') {
            columnName = 'e.TITLE';
            where = `WHERE LOWER(${columnName}) LIKE '%${request.query.filterString.toLowerCase()}%'`
        }
        else if (request.query.filterColumn == 'PATIENT') {
            where = `WHERE LOWER(PATIENT_LAST_NAME) LIKE '%${request.query.filterString.toLowerCase()}%' OR LOWER(PATIENT_FIRST_NAME) LIKE '%${request.query.filterString.toLowerCase()}%'`
        }
        else {
            columnName = 'a.' + request.query.filterColumn;
            where = `WHERE LOWER(${columnName}) LIKE '%${request.query.filterString.toLowerCase()}%'`
        }
        if (mine == 'y') {
            where += ` AND (CREATED_BY = ${request.fullUser.ID} OR MODIFIED_BY = ${request.fullUser.ID})`
        }
        query = `
            SELECT * FROM (
            SELECT @r := @r + 1 as ROW_NUMBER, z.* FROM (
            SELECT a.*, b.TITLE as CREATED, c.TITLE as MODIFIED, 
            d.TITLE as BILLER_NAME, e.TITLE as FACILITY_NAME 
            FROM BDS a 
            LEFT JOIN Users b ON a.CREATED_BY = b.ID
            LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
            LEFT JOIN Billers d ON a.BILLER_ID = d.ID
            LEFT JOIN Facilities e ON a.FACILITY_ID = e.ID
            ${where}
            ORDER BY a.MODIFIED_DATE DESC, a.PATIENT_LAST_NAME, a.PATIENT_FIRST_NAME) z, (SELECT @r := 0) r) x
            WHERE ROW_NUMBER BETWEEN ${(request.query.offest) ? request.query.offest : 0} AND ${request.query.limit}
        `; 
    }
    else {
        if (mine == 'y') {
            where += ` AND (CREATED_BY = ${request.fullUser.ID} OR MODIFIED_BY = ${request.fullUser.ID})`
        }        
        query = `
            SELECT * FROM (
            SELECT @r := @r + 1 as ROW_NUMBER, z.* FROM (
            SELECT a.*, b.TITLE as CREATED, c.TITLE as MODIFIED, 
            d.TITLE as BILLER_NAME, e.TITLE as FACILITY_NAME 
            FROM BDS a 
            LEFT JOIN Users b ON a.CREATED_BY = b.ID
            LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
            LEFT JOIN Billers d ON a.BILLER_ID = d.ID
            LEFT JOIN Facilities e ON a.FACILITY_ID = e.ID
            ORDER BY a.MODIFIED_DATE DESC, a.PATIENT_LAST_NAME, a.PATIENT_FIRST_NAME) z, (SELECT @r := 0) r) x
            WHERE ROW_NUMBER BETWEEN ${(request.query.offest) ? request.query.offest : 0} AND ${request.query.limit} ${where}
        `;         
    }
    mysql.query('Get BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve BDS',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    }, null, response, 'Could not retrieve');
});
general.delete('/bds/:id', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    devlog.log("BDS Route Selected in DELETE");
    let ID = request.params.id;    
    let query = `
        DELETE FROM BDS WHERE ID = ${ID}
    `; 
    mysql.query('DELETE BDS', query, function(results, item, response, err) {
        response.status(200).send({success:"Complete"}); 
    },null,response,null,null);
});

general.post('/bds', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    devlog.log("BDS Route Selected in POST");
    let upload = request.body.upload;
    let query = '';
    let insert = false;
    if (upload) {
        let split = upload.split('\n');
        async.forEach(split, function(item, done){
            let itemSplit = item.split('|');
            let TITLE = itemSplit[0];
            let query = `
                INSERT INTO BDS (TITLE, ABBREVIATION, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
                VALUES ('${TITLE}', '${request.body.ABBREVIATION}', NOW(), ${request.fullUser.ID}, NOW(), ${request.fullUser.ID})
            `; 
            mysql.query('Bulk BDS Update', query, function(results, item, response, err) {
                done();
            }, null, null, null, null);   
        });
        response.status(200).send({success:"Complete"});
    }
    else {
        query = `
            INSERT INTO BDS (BILLER_ID, FACILITY_ID, PATIENT_LAST_NAME, PATIENT_FIRST_NAME, 
            DATE_OF_SERVICE, SCAN_DATE, IF_OR_HOME, INSURANCE, TAKEHOMESERIAL,
            CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY) 
            VALUES (${request.body.BILLER}, ${request.body.FACILITY}, '${request.body.PATIENT_LAST_NAME}', 
            '${request.body.PATIENT_FIRST_NAME}','${request.body.DATE_OF_SERVICE}', '${request.body.SCAN_DATE}', '${request.body.IF_OR_HOME}',
            '${request.body.INSURANCE}', '${request.body.TAKEHOMESERIAL}',
            NOW(), ${request.fullUser.ID}, NOW(), ${request.fullUser.ID})
        `; 
    }
    mysql.query('Set BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve BDS',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({success:'Updated BDS'});           
        }
    }, null, response, 'Could not retrieve');
     
});
general.post('/bds/:id', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    devlog.log("BDS Route Selected in POST");
    let ID = request.params.id
    let query = '';
    let insert = false;
    query = `
        UPDATE BDS SET BILLER_ID = ${request.body.BILLER}, FACILITY_ID = ${request.body.FACILITY},
        PATIENT_LAST_NAME = '${request.body.PATIENT_LAST_NAME}', PATIENT_FIRST_NAME = '${request.body.PATIENT_FIRST_NAME}',
        DATE_OF_SERVICE = '${request.body.DATE_OF_SERVICE}', SCAN_DATE = '${request.body.SCAN_DATE}',
        IF_OR_HOME = '${request.body.IF_OR_HOME}', INSURANCE = '${request.body.INSURANCE}',
        TAKEHOMESERIAL = '${request.body.TAKEHOMESERIAL}',
        MODIFIED_BY = ${request.fullUser.ID}, MODIFIED_DATE = NOW()
        WHERE ID = ${ID}
    `;           

    mysql.query('Set BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve BDS',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({success:'Updated BDS'});           
        }
    }, null, response, 'Could not retrieve');
});
general.get('/bds/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT d.TITLE as BILLER, e.TITLE as FACILITY, a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM BDS a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
        LEFT JOIN Billers d ON a.BILLER_ID = d.ID
        LEFT JOIN Facilities e ON a.FACILITY_ID = e.ID
    `;    
    mysql.query('Download BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/BDS.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/paid/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT d.TITLE as BILLER, e.TITLE as FACILITY, a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM PaidBDS a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
        LEFT JOIN Billers d ON a.BILLER_ID = d.ID
        LEFT JOIN Facilities e ON a.FACILITY_ID = e.ID
        WHERE UPLOAD_MONTH = ${request.query.month} AND UPLOAD_YEAR = ${request.query.year}
    `;    
    mysql.query('Download PaidBDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/PaidBDS.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/commissiondetail/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT *
        FROM COMMISSION_DETAIL
        WHERE UPLOAD_MONTH = ${request.query.month} AND UPLOAD_YEAR = ${request.query.year}
        ORDER BY REP_NAME, FACILITY_NAME, COMMISSIONTYPE
    `;    
    mysql.query('Download Commission Detail', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/CommissionDetail.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/cogs/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT e.TITLE as FACILITY, a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM Cogs a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
        LEFT JOIN Facilities e ON a.FACILITY_ID = e.ID
        WHERE UPLOAD_MONTH = ${request.query.month} AND UPLOAD_YEAR = ${request.query.year}
    `;    
    mysql.query('Download COGS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/COGS.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/cogrep/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
            SELECT g.TITLE as CORRECT_REP_FROM_TOOL, f.REP_ID, 
            e.TITLE as CORRECT_FACILITY_FROM_TOOL, 
            a.*, 
            b.TITLE as CREATED, c.TITLE as MODIFIED
            FROM Cogs a 
            LEFT JOIN ( SELECT FACILITY_ID, REP_ID, COMMISSIONTYPE, max(COMMISSION) as COMMISSION, max(UPLOAD_MONTH) as MaxUploadMonth, max(UPLOAD_YEAR) as MaxUploadYear 
                        FROM Facilities_To_Rep WHERE SHOW_FACILITY=1
                        GROUP BY FACILITY_ID, REP_ID, COMMISSIONTYPE ) f ON a.FACILITY_ID = f.FACILITY_ID 
            LEFT JOIN Users b ON a.CREATED_BY = b.ID
            LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
            LEFT JOIN Facilities e ON f.FACILITY_ID = e.ID
            LEFT JOIN Reps g ON f.REP_ID = g.ID         
            WHERE a.UPLOAD_MONTH=${request.query.month} AND a.UPLOAD_YEAR=${request.query.year}
            AND b.ISACTIVE=1       
    `;    
    mysql.query('Download COGS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/COGS.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/paidvscogs/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
    SELECT CASE WHEN ISNULL(a.REP_ID) THEN b.REP_ID ELSE a.REP_ID END as REP_ID, 
    CASE WHEN ISNULL(a.FACILITY_ID) THEN b.FACILITY_ID ELSE a.FACILITY_ID END AS FACILITY_ID, 
    CASE WHEN ISNULL(a.FACILITY_NAME) THEN b.FACILITY_NAME ELSE a.FACILITY_NAME END as FACILITY_NAME, 
    CASE WHEN ISNULL(a.PAID_AMOUNT) THEN 0 ELSE a.PAID_AMOUNT END as PAID_AMOUNT, 
    CASE WHEN ISNULL(b.COGS_AMOUNT) THEN 0 ELSE b.COGS_AMOUNT END as COGS_AMOUNT 
    FROM    
    (SELECT p.FACILITY_ID, p.FACILITY_NAME,  r.REP_ID, SUM(p.PAID_AMOUNT) as PAID_AMOUNT FROM medvantage.PaidBDS p
    INNER JOIN medvantage.Facilities_To_Rep r on r.FACILITY_ID = p.FACILITY_ID and r.SHOW_FACILITY=1 AND r.COMMISSIONTYPE='GENERAL'
    WHERE p.UPLOAD_MONTH = ${request.query.month} AND p.UPLOAD_YEAR=${request.query.year}
    GROUP BY  r.REP_ID, p.FACILITY_ID, p.FACILITY_NAME ) a   
    LEFT OUTER JOIN (SELECT c.FACILITY_ID, c.FACILITY_NAME, c.REP_ID, SUM(c.AMOUNT) as COGS_AMOUNT
    FROM medvantage.Cogs c
    WHERE  c.UPLOAD_MONTH = ${request.query.month} AND c.UPLOAD_YEAR=${request.query.year}
    GROUP BY c.REP_ID, c.FACILITY_ID, c.FACILITY_NAME) b on b.FACILITY_ID = a.FACILITY_ID   
    union  
    SELECT CASE WHEN ISNULL(a.REP_ID) THEN b.REP_ID ELSE a.REP_ID END as REP_ID, 
    CASE WHEN ISNULL(a.FACILITY_ID) THEN b.FACILITY_ID ELSE a.FACILITY_ID END AS FACILITY_ID, 
    CASE WHEN ISNULL(a.FACILITY_NAME) THEN b.FACILITY_NAME ELSE a.FACILITY_NAME END as FACILITY_NAME, 
    CASE WHEN ISNULL(a.PAID_AMOUNT) THEN 0 ELSE a.PAID_AMOUNT END as PAID_AMOUNT, 
    CASE WHEN ISNULL(b.COGS_AMOUNT) THEN 0 ELSE b.COGS_AMOUNT END as COGS_AMOUNT 
    FROM 
    (SELECT p.FACILITY_ID, p.FACILITY_NAME, r.REP_ID, SUM(p.PAID_AMOUNT) as PAID_AMOUNT FROM medvantage.PaidBDS p
    INNER JOIN medvantage.Facilities_To_Rep r on r.FACILITY_ID = p.FACILITY_ID and r.SHOW_FACILITY=1 AND r.COMMISSIONTYPE='GENERAL'
    WHERE  p.UPLOAD_MONTH = ${request.query.month} AND p.UPLOAD_YEAR=${request.query.year}
    GROUP BY r.REP_ID, p.FACILITY_ID, p.FACILITY_NAME ) a
    RIGHT OUTER JOIN (SELECT c.FACILITY_ID, c.FACILITY_NAME, c.REP_ID, SUM(c.AMOUNT) as COGS_AMOUNT
    FROM medvantage.Cogs c
    WHERE c.UPLOAD_MONTH = ${request.query.month} AND c.UPLOAD_YEAR=${request.query.year}
    GROUP BY c.REP_ID, c.FACILITY_ID, c.FACILITY_NAME) b on b.FACILITY_ID = a.FACILITY_ID
    ORDER BY FACILITY_NAME      
    `;    
    mysql.query('Download Paid vs Cogs', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/PaidVsCogs.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});

general.get('/paidrep/download', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    const query = `
        SELECT d.TITLE as BILLER, g.TITLE as REP_NAME, e.TITLE as FACILITY, a.*, b.TITLE as CREATED, c.TITLE as MODIFIED
        FROM PaidBDS a
        LEFT JOIN Users b ON a.CREATED_BY = b.ID
        LEFT JOIN Users c ON a.MODIFIED_BY = c.ID
        LEFT JOIN Billers d ON a.BILLER_ID = d.ID
        LEFT JOIN Facilities e ON a.FACILITY_ID = e.ID
        LEFT JOIN Facilities_To_Rep f ON a.FACILITY_ID = f.FACILITY_ID
        LEFT JOIN Reps g ON f.REP_ID = g.ID 
        WHERE a.UPLOAD_MONTH = ${request.query.month} AND a.UPLOAD_YEAR = ${request.query.year}
    `;    
    mysql.query('Download PaidBDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve data from database',
                errorObject: err
            });
        }
        else {
            let fields = [];
            for (var f in results[0]) {
                fields.push(f);
            }
            let writer = CSV2({data: results, fields: fields});
            let filelocation =`${filepath}/PaidBDS.download.csv`;
            fs.writeFile(filelocation, writer, function(err){
                if (err) {
                    console.log(err);
                    response.status(500);
                    response.send({
                        validFile: false,
                        error: `Failed when attempting to write CSV File for Download`,
                        errorObject: err
                    });
                }
                else {
                    response.status(200);
                    response.download(filelocation, function(err) {
                        if (err) {console.log(err);}
                    });
                }
            });          
        }
    }, null, response, 'Could not retrieve');
});
/*
general.get('/api/v1/getMappings', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT a.ID, a.UGLY_FACILITY, a.FACILITY_ID, 
        a.REP_ID, b.TITLE as FACILITY_NAME, 
        c.TITLE as REP_NAME FROM Facilities_Rep_Map a 
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID 
        LEFT JOIN Reps c ON a.REP_ID = c.ID
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.get('/api/v1/getCommissions', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT a.ID, a.UGLY_FACILITY, a.FACILITY_ID, 
        a.REP_ID, b.TITLE as FACILITY_NAME, 
        c.TITLE as REP_NAME FROM Facilities_Rep_Map a 
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID 
        LEFT JOIN Reps c ON a.REP_ID = c.ID
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.get('/api/v1/getBillers', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT ID, TITLE, ABBREVIATION, START_ROW, SHEET_NUMBER
        FROM Billers
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.get('/api/v1/getUsers', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Users Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
            WHERE a.PARENT_USER = ${req.fullUser.ID}
        `; 
    }
   
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});


general.get('/api/v1/getPaidBDS', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT *
        FROM PaidBDS
        WHERE UPLOAD_MONTH = ${req.body.month} AND UPLOAD_YEAR = ${req.body.year}
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.get('/api/v1/getCogs', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT *
        FROM Cogs
        WHERE UPLOAD_MONTH = ${req.body.month} AND UPLOAD_YEAR = ${req.body.year}
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});
*/



/*
general.put('/api/v1/updateReps', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Rep Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.COMMISSION, a.PARENT_USER, b.TITLE as PARENT_NAME FROM Reps a
            FROM Reps a LEFT JOIN Users b ON a.PARENT_USER = b.ID
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.COMMISSION, a.PARENT_USER, b.TITLE as PARENT_NAME FROM Reps a
            FROM Reps a LEFT JOIN Users b ON a.PARENT_USER = b.ID
            WHERE a.PARENT_USER = ${req.fullUser.ID}
        `; 
    }    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.put('/api/v1/updateFacilities', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Facilities Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, b.TITLE as REP_NAME FROM Facilities a 
            LEFT JOIN Reps b ON a.REP_ID = b.ID
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, b.TITLE as REP_NAME FROM Facilities a 
            LEFT JOIN Reps b ON a.REP_ID = b.ID
            WHERE a.REP_ID = ${req.fullUser.REP_ID}
        `; 
    }     
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Facilities',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.put('/api/v1/updateMappings', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT a.ID, a.UGLY_FACILITY, a.FACILITY_ID, 
        a.REP_ID, b.TITLE as FACILITY_NAME, 
        c.TITLE as REP_NAME FROM Facilities_Rep_Map a 
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID 
        LEFT JOIN Reps c ON a.REP_ID = c.ID
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.put('/api/v1/updateCommissions', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT a.ID, a.UGLY_FACILITY, a.FACILITY_ID, 
        a.REP_ID, b.TITLE as FACILITY_NAME, 
        c.TITLE as REP_NAME FROM Facilities_Rep_Map a 
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID 
        LEFT JOIN Reps c ON a.REP_ID = c.ID
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.put('/api/v1/updateBillers', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT ID, TITLE, ABBREVIATION, START_ROW, SHEET_NUMBER
        FROM Billers
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.put('/api/v1/updateUsers', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Users Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
            WHERE a.PARENT_USER = ${req.fullUser.ID}
        `; 
    }
   
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});





general.post('/api/v1/newReps', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Rep Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.COMMISSION, a.PARENT_USER, b.TITLE as PARENT_NAME FROM Reps a
            FROM Reps a LEFT JOIN Users b ON a.PARENT_USER = b.ID
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.COMMISSION, a.PARENT_USER, b.TITLE as PARENT_NAME FROM Reps a
            FROM Reps a LEFT JOIN Users b ON a.PARENT_USER = b.ID
            WHERE a.PARENT_USER = ${req.fullUser.ID}
        `; 
    }    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Reps',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.post('/api/v1/newFacilities', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Facilities Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, b.TITLE as REP_NAME FROM Facilities a 
            LEFT JOIN Reps b ON a.REP_ID = b.ID
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, b.TITLE as REP_NAME FROM Facilities a 
            LEFT JOIN Reps b ON a.REP_ID = b.ID
            WHERE a.REP_ID = ${req.fullUser.REP_ID}
        `; 
    }     
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Facilities',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.post('/api/v1/newMappings', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT a.ID, a.UGLY_FACILITY, a.FACILITY_ID, 
        a.REP_ID, b.TITLE as FACILITY_NAME, 
        c.TITLE as REP_NAME FROM Facilities_Rep_Map a 
        LEFT JOIN Facilities b ON a.FACILITY_ID = b.ID 
        LEFT JOIN Reps c ON a.REP_ID = c.ID
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.post('/api/v1/newBillers', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    devlog.log("Mappings Route Selected");
    const query = `
        SELECT ID, TITLE, ABBREVIATION, START_ROW, SHEET_NUMBER
        FROM Billers
    `;    
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.post('/api/v1/newUsers', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Users Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
            WHERE a.PARENT_USER = ${req.fullUser.ID}
        `; 
    }
   
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});

general.post('/api/v1/newCommissions', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    devlog.log("Users Route Selected");
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
        `; 
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        query = `
            SELECT a.ID, a.TITLE, a.REP_ID, a.EMAIL, a.USER_TYPE, a.PARENT_USER, c.TITLE as PARENT_NAME, b.TITLE as REP_NAME
            FROM Users a LEFT JOIN Reps b ON a.REP_ID = b.ID
            LEFT JOIN Users c ON a.PARENT_USER = c.PARENT_USER
            WHERE a.PARENT_USER = ${req.fullUser.ID}
        `; 
    }
   
    mysql.query(query, function(err, results, fields) {
        if (err) {
            response.status(500);
            response.send({
                error: 'Could not retrieve Mappings',
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                successObject: results
            });           
        }
    });
});
*/


module.exports = general;
