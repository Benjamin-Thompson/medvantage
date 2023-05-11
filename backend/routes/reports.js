/*const express = require('express');
const reports = express.Router();
const utils = require('../utilities/utils');
const devlog = require('../utilities/devlog');
const mysql = require('../utilities/mysql');


reports.get('/', utils.ensureAuthenticated, function(request, response) {
    let reportsShown = [];
    if (user.fullUser.USER_TYPE == 'SUPER') {
        reportsShown.push('Users');
        reportsShown.push('Reps');
        reportsShown.push('Special Commissions');
        reportsShown.push('Override Commissions');
        reportsShown.push('Manual Commissions');
    }
    else if (user.fullUser.USER_TYPE == 'ADMIN') {
        reportsShown.push('Users');
        reportsShown.push('Reps');
        reportsShown.push('Special Commissions');
        reportsShown.push('Override Commissions');
        reportsShown.push('Manual Commissions'); 
        reportsShown.push('Cogs');
        reportsShown.push('PaidBDS');
    }
});

reports.get('/super', utils.ensureAuthenticated, utils.ensureSuperUser, function(request, response) {
    try {
        mysql.query(mysql.queryBuilder('Billers', null, `TITLE <> 'COGS'`), function (err, results, fields) {
            let billers = utils.sortArray(results, 'TITLE', true);      
            let utility = utils.sortArray([
                {
                    abbr: 'BDS',
                    name: 'BDS Report'
                },
                {
                    abbr: 'REP',
                    name: 'Rep User Report'
                } ,
                {
                    abbr: 'FAC',
                    name: 'Facilities Legend'
                } ,
                {
                    abbr: 'BLR',
                    name: 'Biller Profiles'
                }            
            ], 'name', true);
            let DT = new Date(); 
            let YR = DT.getFullYear();
            let MT = 0;
            if (DT.getMonth() == 0) {
                MT = 12; YR--;
            }
            else {
                MT = DT.getMonth();
            }             
            const detail = {
                route: 'uploads',
                secondary: 'root',
                instruction: `Choose a report to upload:`,
                MT: MT,
                YR: YR,
                reports: {
                    billers: billers,
                    utility: utility
                }
            }
            response.status(200);
            response.render('standard', detail);                     
        });
    }
    catch(e) {
        response.status(500);
        response.send({
            error: 'Internal Server Error',
            errorObject: e
        });
    }           
});

reports.get('/admin', utils.ensureAuthenticated, utils.ensureAdminUser, function(request, response) {
    try {
        devlog.log("Uploads Root GET Route Selected");
        devlog.log(`Rendering the Root Report`);
        mysql.query(mysql.queryBuilder('Billers', null, `TITLE <> 'COGS'`), function (err, results, fields) {
            let billers = utils.sortArray(results, 'TITLE', true);      
            let utility = utils.sortArray([
                {
                    abbr: 'BDS',
                    name: 'BDS Report'
                },
                {
                    abbr: 'REP',
                    name: 'Rep User Report'
                } ,
                {
                    abbr: 'FAC',
                    name: 'Facilities Legend'
                } ,
                {
                    abbr: 'BLR',
                    name: 'Biller Profiles'
                }            
            ], 'name', true);
            let DT = new Date(); 
            let YR = DT.getFullYear();
            let MT = 0;
            if (DT.getMonth() == 0) {
                MT = 12; YR--;
            }
            else {
                MT = DT.getMonth();
            }             
            const detail = {
                route: 'uploads',
                secondary: 'root',
                instruction: `Choose a report to upload:`,
                MT: MT,
                YR: YR,
                reports: {
                    billers: billers,
                    utility: utility
                }
            }
            response.status(200);
            response.render('standard', detail);                     
        });
    }
    catch(e) {
        response.status(500);
        response.send({
            error: 'Internal Server Error',
            errorObject: e
        });
    }           
});

module.exports = reports;
*/