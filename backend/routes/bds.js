const express = require('express');
const bds = express.Router();
const utils = require('../utilities/utils');
const devlog = require('../utilities/devlog');
const mysql = require('../utilities/mysql');
const async = require('async');

bds.post('/api/v1/loadNewBDSItems', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    let items = request.body.BDSItems;
    let user = request.fullUser.ID;
    async.forEach(items, function(item, done){
        if (item.PATIENT_FIRST_NAME !== null && item.PATIENT_FIRST_NAME !== '') {
            let query = `
                INSERT INTO BDS
                (FACILITY_ID, PATIENT_FIRST_NAME, PATIENT_LAST_NAME,
                DATE_OF_SERVICE, IF_OR_HOME, CREATED_DATE, CREATED_BY,
                MODIFIED_DATE, MODIFIED_BY)
                VALUES (
                    ${item.FACILITY_ID},
                    ${item.PATIENT_FIRST_NAME},
                    ${item.PATIENT_LAST_NAME},
                    ${item.DATE_OF_SERVICE},
                    ${item.IF_OR_HOME},
                    NOW(),
                    ${user},
                    NOW(),
                    ${user}
                )
            `
            mysql.query('Adding New BDS Entry', query, function(results, item, response, err) {
                done();
            }, null, response, 'Failed at Adding New BDS Entry');    
        }
        else {
            done();
        } 
    }, function(err){
            if (!err) {
                response.status(200);
                response.send("Success!");
            }
            else {
                response.status(500);
                response.send({
                    error: 'Error in processing update to database',
                    errorObject: err
                });            
            }
        });
});

bds.get('/api/v1/getBDS', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    let limit = request.query.limit;
    let offset = request.query.offset;

    let query = `
        CALL GET_BDS_TABLE(${limit},${offset})
    `
    mysql.query('Selecting BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed Selecting BDS",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Selecting BDS",
                successObject: results
            });            
        }
    }, null, response, 'Failed Selecting BDS'); 
});

bds.get('/api/v1/getBDSUnmapped', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    let limit = request.query.limit;
    let offset = request.query.offset;

    let query = `
        CALL GET_BDS_UNMAPPED(${limit},${offset})
    `
    mysql.query('Selecting BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed Selecting BDS",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Selecting BDS",
                successObject: results
            });            
        }
    }, null, response, 'Failed Selecting BDS'); 
});


bds.get('/api/v1/getBDSMapped', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {
    let limit = request.query.limit;
    let offset = request.query.offset;

    let query = `
        CALL GET_BDS_MAPPED(${limit},${offset})
    `
    mysql.query('Selecting BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed Selecting BDS",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Selecting BDS",
                successObject: results
            });            
        }
    }, null, response, 'Failed Selecting BDS'); 
});

bds.get('/api/v1/getBDSDelayed', utils.ensureAuthenticated, utils.ensureEditorUser, function(request, response) {

    let query = `
        CALL GET_BDS_DELAYED(${limit},${offset})
    `
    mysql.query('Selecting BDS', query, function(results, item, response, err) {
        if (err) {
            response.status(500);
            response.send({
                isValid: false,
                error: "Failed Selecting BDS",
                errorObject: err
            });
        }
        else {
            response.status(200);
            response.send({
                isValid: true,
                success: "Selecting BDS",
                successObject: results
            });            
        }
    }, null, response, 'Failed Selecting BDS'); 
});