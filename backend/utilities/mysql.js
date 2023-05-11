const mysql2 = require("mysql2");
const MYSQL_CONNECTION = require("../config.js");
const pool = mysql2.createPool({
    host: MYSQL_CONNECTION.HOST,
    user: MYSQL_CONNECTION.USER,
    password: MYSQL_CONNECTION.PASSWORD,
    database: MYSQL_CONNECTION.DATABASE
});

module.exports = {
    query: function(name, query, cb, usedObject, res, errorText, redirect) {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log("Failed Here:")
                console.log(err);
                if (res) {
                    return res.status(500).send({
                        name: (name) ? name : 'Unamed',
                        isValid: false,
                        error: 'Internal Server Error on Connection',
                        errorText: errorText
                    });
                }
            }
            else {
                connection.query(query, function(err, results, fields) {
                    connection.release();
                    if (err) {
                        console.log("Failed On Connection for " + (name) ? name : 'Unamed');
                        console.log(err);
                        if (res) {
                            if (redirect) {
                                return res.redirect(redirect);
                            }                            
                            return res.status(500).send({
                                name: (name) ? name : 'Unamed',
                                isValid: false,
                                error: 'Internal Server Error in SQL',
                                errorText: errorText,
                                errorObject: results
                            });
                        }
                    }
                    else {
                        if (name) {
                            console.log(name + ' Query Run');
                        }
                        return cb(results, usedObject, res, err);
                    }
                    
                });
            }
        });   
    },
    execute: function(name, query, cb, usedObject, res, errorText, redirect) {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log("Failed Here:")
                console.log(err);
                if (res) {
                    return res.status(500).send({
                        name: (name) ? name : 'Unamed',
                        isValid: false,
                        error: 'Internal Server Error on Connection',
                        errorText: errorText
                    });
                }
            }
            else {
                connection.execute(query, function(err, results, fields) {
                    connection.release();
                    if (err) {
                        console.log("Failed On Connection for " + (name) ? name : 'Unamed');
                        console.log(err);
                        if (res) {
                            if (redirect) {
                                return res.redirect(redirect);
                            }                            
                            return res.status(500).send({
                                name: (name) ? name : 'Unamed',
                                isValid: false,
                                error: 'Internal Server Error in SQL',
                                errorText: errorText,
                                errorObject: results
                            });
                        }
                    }
                    else {
                        if (name) {
                            console.log(name + ' stored procedure executed');
                        }
                        return cb(results[0], usedObject, res, err);
                    }
                    
                });
            }
        });   
    },
    updateBuilder: function(table, setters, id, where) {
        let setterString = 'SET MODIFIED_DATE = CURDATE(), MODIFIED_BY = 1';
        for (let setter of setters) {
            setterString += `, ${setter[0]} = ${setter[1]}`;
        }
        if (id) {
            setterString += ` WHERE ID = '${id}'`
        }
        if (where) {
            setterString += ` WHERE ${where}`
        }
        return `UPDATE ${table} ${setterString}`;
    },
    queryBuilder: function(table, columns, filter) {
        let queryString = 'SELECT ';
        if (columns) {
            let cArray = [];
            for (var c of columns) {
                cArray.push('`' + c + '`');
            }
            queryString += `${c.join(',')} FROM ${table}`;
        }
        else {
            queryString += `* FROM ${table}`;
        }
        if (filter) {
            queryString += ` WHERE ${filter}`;
        }
        return queryString;
    }
};