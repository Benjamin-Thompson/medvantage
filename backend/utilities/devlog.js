/*
* devlog is a class that allows you to log data only if the environment is a production environment
*/
const mysql = require('./mysql');
class devlog {
    constructor() {
        this.environment = 'dev';
    }

    log (content) {
        //if (this.environment == 'dev') {
        //    console.log(content);
        //} else {
            let query = `
            INSERT INTO Debug (TStamp, Content)
            VALUES (NOW(),'${content}')
        `;
        mysql.query('Logging', query, function(results, item, res, err) {}, null, null, null, null);
        //}
    }

    publish(Category, Action, UserID) {
        let query = `
            INSERT INTO Logs (USER_ACTION, ACTION_CATEGORY, ACTION_TIME, CREATED_DATE, CREATED_BY,MODIFIED_DATE,MODIFIED_BY)
            VALUES ('${Action}', '${Category}', NOW(), CURDATE(), ${(UserID) ? UserID : 'NULL'}, CURDATE(), ${(UserID) ? UserID : 'NULL'})
        `;
        mysql.query('Logging', query, function(results, item, res, err) {}, null, null, null, null);
    }

    status(Process, Status, Completion) {
        let query = `
            INSERT INTO Status_Report (CURRENT_PROCESS, CURRENT_STATUS, PROCESS_COMPLETE)
            VALUES (${Process}, ${Status}, ${Completion})
        `;
        mysql.query('Logging', query, function(results, item, res, err) {}, null, null, null, null);
    }    


}
module.exports = new devlog();