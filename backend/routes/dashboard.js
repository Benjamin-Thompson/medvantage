const express = require('express');
const dashboard = express.Router();
const utils = require('../utilities/utils');
const devlog = require('../utilities/devlog');
const mysql = require('../utilities/mysql');

dashboard.get('/activestate', utils.ensureAuthenticated, function(request, response) {
    let month = request.query.month;
    let year = request.query.year;
    let query = `
        SELECT ISACTIVE FROM COMMISSION_TABLE 
        WHERE UPLOAD_MONTH = ${month} AND UPLOAD_YEAR = ${year}
        LIMIT 1
    `
    mysql.query('Selecting Active State', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to Select Active State",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                activeState: (results[0]) ? results[0] : false,
                success: "Selected Active State",
                successObject: results
            });            
        }
    }, null, response, 'Failed to Select Active State'); 
});
dashboard.post('/activestate', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    let month = request.body.month;
    let year = request.body.year;
    let isActive = request.body.isActive;
    let query = `
        CALL LOADDASHBOARD(${month}, ${year}, ${(isActive) ? 1 : 0})
    `
    console.log(query);
    mysql.query('Calling Active State', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to Call Active State",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                activeState: results[0],
                success: "Called Active State",
                successObject: results
            });            
        }
    }, null, response, 'Failed to Call Active State'); 
});
dashboard.get('/manual/:repID', utils.ensureAuthenticated, function(request, response) {
    let month = request.query.month;
    let year = request.query.year;
    let repID = 0;
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        repID = request.params.repID
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        if (request.fullUser.ViewReps.indexOf(request.params.repID) > -1) {
            repID = request.params.repID
        }
        else {
            repID = request.fullUser.REP_ID;
        }
    }
    else {
        repID = request.fullUser.REP_ID
    }
    let query = `
        SELECT * FROM Manual_Overrides 
        WHERE UPLOAD_MONTH = ${month} AND UPLOAD_YEAR = ${year}
        AND REP_ID = ${repID}
        ORDER BY AMOUNT
    `
    console.log(query);
    mysql.query('Selecting Manual Entry Override', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to Select Manual Entry Override",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Selected Manual Entry Override",
                successObject: results
            });            
        }
    }, null, response, 'Failed to Select Manual Entry Override'); 
});
dashboard.delete('/manual/:id', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    let query = `
        DELETE FROM Manual_Overrides 
        WHERE ID = ${request.params.id}
    `
    console.log(query);
    mysql.query('Deleting Manual Entry Override', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to Delete Manual Entry Override",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Deleted Manual Entry Override"
            });            
        }
    }, null, response, 'Failed to Delete Manual Entry Override'); 
});
dashboard.post('/manual/:repID', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    let month = request.body.month;
    let year = request.body.year;
    let toRepID = request.params.repID;
    let amount = request.body.AMOUNT;
    let title = request.body.TITLE;
    let description = request.body.DESCRIPTION;
    let userID = request.fullUser.ID;

    let query = `
        INSERT INTO Manual_Overrides 
        (REP_ID, TITLE, AMOUNT, DESCRIPTION, UPLOAD_MONTH, UPLOAD_YEAR,
        CREATED_DATE, CREATED_BY, MODIFIED_DATE, MODIFIED_BY)
        VALUES (
            ${toRepID},
            '${title}',
            ${amount},
            '${description}',
            ${month},
            ${year},
            CURDATE(),
            ${userID},
            CURDATE(),
            ${userID}
        )
    `
    console.log(query);
    mysql.query('Creating New Manual Entry Override', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to Create New Manual Entry Override",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Created New Manual Entry Override"
            });            
        }
    }, null, response, 'Failed to Create New Manual Entry Override'); 
});
dashboard.get('/detail/:repID', utils.ensureAuthenticated, function(request, response) {
    let month = request.query.month;
    let year = request.query.year;
    let repID = 0;
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        repID = request.params.repID;
        query = `
            SELECT * FROM COMMISSION_TABLE WHERE REP_ID = ${repID}
            AND UPLOAD_MONTH = ${month} AND UPLOAD_YEAR = ${year}
        `        
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        if (request.fullUser.ViewReps.indexOf(request.params.repID) > -1) {
            repID = request.params.repID
        }
        else {
            repID = request.fullUser.REP_ID;
        }
        query = `
            SELECT * FROM COMMISSION_TABLE WHERE REP_ID = ${repID}
            AND UPLOAD_MONTH = ${month} AND UPLOAD_YEAR = ${year}
            AND ISACTIVE = TRUE
        `
    }
    else {
        repID = request.fullUser.REP_ID;
        query = `
            SELECT * FROM COMMISSION_TABLE WHERE REP_ID = ${repID}
            AND UPLOAD_MONTH = ${month} AND UPLOAD_YEAR = ${year}
            AND ISACTIVE = TRUE
        `             
    }

    mysql.query('Loading Dashboard', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to run Dashboard for ",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Successful Dashboard for ",
                successObject: results[0]
            });            
        }
    }, null, response, 'Failed to run Dashboard'); 
});

dashboard.get('/detail/:repID/paid', utils.ensureAuthenticated, function(request, response) {
    devlog.log("PaidBDS Path Loaded");
    let month = request.query.month;
    let year = request.query.year;
    let type = request.query.type;
    let repID = 0;
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        repID = request.params.repID;
        if (type == 'summary') {
            query = `CALL medvantage.GetAdmin_RepPaid_Summary(${month}, ${year}, ${repID});`
        }
        else {
            query = `CALL medvantage.GetAdmin_RepPaid_Detail(${month}, ${year}, ${repID});`
        }
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        if (request.fullUser.ViewReps.indexOf(request.params.repID) > -1) {
            repID = request.params.repID
        }
        else {
            repID = request.fullUser.REP_ID;
        }        
        if (type == 'summary') {
            query = `CALL medvantage.GetUser_RepPaid_Summary(${month}, ${year}, ${repID}); 
            `
        }
        else {
            query = `CALL medvantage.GetSUser_RepPaid_Detail(${month}, ${year}, ${repID});
            `
        }   
    }
    else {
        repID = request.fullUser.REP_ID;
        if (type == 'summary') {
            query = `
            CALL medvantage.GetUser_RepPaid_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetUser_RepPaid_Detail(${month}, ${year}, ${repID});
            `
        }    
    }
    mysql.execute('Paid Detail', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to run PaidBDS Query for",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Successful Dashboard for",
                successObject: results
            });            
        }
    }, null, response, 'Failed to Paid Query'); 
});

dashboard.get('/detail/:repID/cogs', utils.ensureAuthenticated, function(request, response) {
    devlog.log("Cogs Path Loaded");
    let month = request.query.month;
    let year = request.query.year;
    let type = request.query.type;
    let repID = 0;
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        repID = request.params.repID;
        if (type == 'summary') {
            query = `
            CALL medvantage.GetAdmin_RepCOGS_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetAdmin_RepCOGS_Detail(${month}, ${year}, ${repID});
            `
        }  
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        if (request.fullUser.ViewReps.indexOf(request.params.repID) > -1) {
            repID = request.params.repID
        }
        else {
            repID = request.fullUser.REP_ID;
        }   
        if (type == 'summary') {
            query = `
            CALL medvantage.GetUser_RepCOGS_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetUser_RepCOGS_Detail(${month}, ${year}, ${repID});
            `
        }     
    }
    else {
        repID = request.fullUser.REP_ID;
        if (type == 'summary') {
            query = `
            CALL medvantage.GetUser_RepCOGS_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetUser_RepCOGS_Detail(${month}, ${year}, ${repID});
            `
        }    
    }    
    mysql.execute('COG Detail', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to run Cogs Query",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Successful Dashboard for",
                successObject: results
            });            
        }
    }, null, response, 'Failed to run Cogs'); 
});

dashboard.get('/detail/:repID/manual', utils.ensureAuthenticated, function(request, response) {
    devlog.log("Manual Path Loaded");
    let month = request.query.month;
    let year = request.query.year;
    let type = request.query.type;
    let repID = 0;
    let query = '';   
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        repID = request.params.repID;
        query = `
        CALL medvantage.GetAdmin_ManualOverrides(${month}, ${year}, ${repID});
        `
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        if (request.fullUser.ViewReps.indexOf(request.params.repID) > -1) {
            repID = request.params.repID
        }
        else {
            repID = request.fullUser.REP_ID;
        }  
        query = `
        CALL medvantage.GetUser_ManualOverrides(${month}, ${year}, ${repID});
        `
    }
    else {
        repID = request.fullUser.REP_ID;
        query = `
        CALL medvantage.GetUser_ManualOverrides(${month}, ${year}, ${repID});
        ` 
    }    
    mysql.execute('Manual Load Detail', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to run Manual Query",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Successful Dashboard for",
                successObject: results
            });            
        }
    }, null, response, 'Failed to run Manual'); 
});

dashboard.get('/detail/:repID/override', utils.ensureAuthenticated, function(request, response) {
    devlog.log("Override Commission Path Loaded");
    let month = request.query.month;
    let year = request.query.year;
    let type = request.query.type;
    let repID = 0;
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        repID = request.params.repID;
        if (type == 'summary') {
            query = `
            CALL medvantage.GetAdmin_RepOverrides_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetAdmin_RepOverrides_Detail(${month}, ${year}, ${repID});
            `
        }
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        if (request.fullUser.ViewReps.indexOf(request.params.repID) > -1) {
            repID = request.params.repID
        }
        else {
            repID = request.fullUser.REP_ID;
        }  
        if (type == 'summary') {
            query = `
            CALL medvantage.GetUser_RepOverrides_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetUser_RepOverrides_Detail(${month}, ${year}, ${repID});
            `
        }    
    }
    else {
        repID = request.fullUser.REP_ID;
        if (type == 'summary') {
            query = `
            CALL medvantage.GetUser_RepOverrides_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetUser_RepOverrides_Detail(${month}, ${year}, ${repID});
            `
        }    
    }
    mysql.execute('Override Details', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to run Override Query",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Successful Dashboard",
                successObject: results
            });            
        }
    }, null, response, 'Failed to run Overrides'); 
});

dashboard.get('/detail/:repID/general', utils.ensureAuthenticated, function(request, response) {
    devlog.log("General Commission Path Loaded");
    let month = request.query.month;
    let year = request.query.year;
    let type = request.query.type;
    let repID = 0;
    let query = '';
    if (request.fullUser.USER_TYPE == 'ADMIN') {
        repID = request.params.repID;
        if (type == 'summary') {
            query = `
            CALL medvantage.GetAdmin_RepGeneral_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetAdmin_RepGeneral_Detail(${month}, ${year}, ${repID});
            `
        }
    }
    else if (request.fullUser.USER_TYPE == 'SUPER') {
        if (request.fullUser.ViewReps.indexOf(request.params.repID) > -1) {
            repID = request.params.repID
        }
        else {
            repID = request.fullUser.REP_ID;
        }  
        console.log("HERE ARE MY REPS FOR THE REPORT")
        console.log(request.fullUser.ViewReps)
        console.log(request.params.repID)
        if (type == 'summary') {
            query = `
            CALL medvantage.GetUser_RepGeneral_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetUser_RepGeneral_Detail(${month}, ${year}, ${repID});
            `
        }   
    }
    else {
        repID = request.fullUser.REP_ID;
        if (type == 'summary') {
            query = `
            CALL medvantage.GetUser_RepGeneral_Summary(${month}, ${year}, ${repID});
            `
        }
        else {
            query = `
            CALL medvantage.GetUser_RepGeneral_Detail(${month}, ${year}, ${repID});
            `
        }    
    }
    mysql.execute('General Override Details', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed to run Override Query",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Successful Dashboard",
                successObject: results
            });            
        }
    }, null, response, 'Failed to run Overrides'); 
});




module.exports = dashboard;
