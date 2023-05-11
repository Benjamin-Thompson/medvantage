const mysql = require('./mysql');
const devlog = require('./devlog');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js');

class utils {
    sortArray(array, property, ascending) {
        if (ascending) {
            if (property) {
                array.sort(function(a, b) {
                    if (a[property] < b[property]) return -1;
                    if (a[property] > b[property]) return 1;
                    return 0;
                });
            }
            else {
                array.sort(function(a, b) {
                    if (a < b) return -1;
                    if (a > b) return 1;
                    return 0;
                });                
            }
        }
        else {
            if (property) {
                array.sort(function(a, b) {
                    if (a[property] < b[property]) return 1;
                    if (a[property] > b[property]) return -1;
                    return 0;
                });
            }
            else {
                array.sort(function(a, b) {
                    if (a < b) return 1;
                    if (a > b) return -1;
                    return 0;
                });                
            }            
        }
        return array;
    }

    getUser(userGoogleID, req, res, next) {
        let query = `
            SELECT * FROM Users WHERE GOOGLE = ${userGoogleID} AND ISACTIVE = TRUE
        `;
        console.log(query);  
        mysql.query('Getting User', query, function(results, item, res, err){
            if (!err) {
                let fullUser = results[0];
                if (fullUser != null){
                    query = `
                        SELECT REP_ID_TO_VIEW FROM Viewable_Users WHERE USER_ID = ${fullUser.ID}
                    `;       
                    console.log(query);         
                    mysql.query('Getting User Viewable', query, function(results2, item, res, err){
                        if (!err) {
                            req.fullUser = fullUser
                            if (results2) {
                                let repMap = results2.map(a => a.REP_ID_TO_VIEW.toString());
                                req.fullUser['ViewReps'] = repMap;
                            }
                            next();
                        }
                        else {
                            return res.redirect('https://' + req.hostname);
                        }
                    }, this, res, 'Could not Find correct User', 'https://' + req.hostname);    
                } else {
                    console.log('google id not found; check by email address for matching new user');
                    console.log(req.useremail);
                    let query = `SELECT * FROM Users WHERE EMAIL = '${req.useremail}' AND ISACTIVE=TRUE`;
                    mysql.query('Getting User', query, function(results3, item, res, err){
                        if (!err) {
                            let fullUser = results3[0];
                            fullUser.GOOGLE = req.user;
                            fullUser.DISPLAY_NAME = req.userdisplayname;
                            fullUser.PICTURE = req.picture;
                             mysql.execute('Updating User', `UPDATE Users SET GOOGLE = ${fullUser.GOOGLE}, DISPLAY_NAME = '${req.userdisplayname}', PICTURE = '${req.userpicture}' WHERE ID  = ${fullUser.ID}`, function(results, item, res, err){}, this, res, 'Could not update user', 'https://' + req.hostname);
                        
                         query = `
                             SELECT REP_ID_TO_VIEW FROM Viewable_Users WHERE USER_ID = ${fullUser.ID}
                         `;       
                         console.log(query);         
                         mysql.query('Getting User Viewable', query, function(results4, item, res, err){
                             if (!err) {
                                 req.fullUser = fullUser
                                 if (results4) {
                                     let repMap = results4.map(a => a.REP_ID_TO_VIEW.toString());
                                     req.fullUser['ViewReps'] = repMap;
                                 }
                                 next();
                             }
                             else {
                                 return res.redirect('https://' + req.hostname);
                             }
                         }, this, res, 'Could not Find correct User', 'https://' + req.hostname);
                        
                            }
                    }, this, res, 'Could not Find correct User', 'https://' + req.hostname);
                }

            }  
            else {
                return res.redirect('https://' + req.hostname);
            }
        }, this, res, 'Could not Find correct User', 'https://' + req.hostname);
    }

    ensureAuthenticated(req, res, next) {
        let me = new utils();
        let prt = (devlog.environment == 'dev') ? ':3000' : '';
        let httpLine = (devlog.environment == 'dev') ? 'http' : 'https';
        let token = '';
        if (req) {
            if (!req.header('Authorization')) {
                if (req.query.token) {
                    token = req.query.token;
                    devlog.log("Token is " + token);
                }
                else {
                    devlog.log("No Auth Header");
                    return res.status(500).send('Unable to authenticate');
                }
            }
            else {
                token = req.header('Authorization').split(' ')[1];
            }
            var payload = null;
            try {
                payload = jwt.decode(token, config.TOKEN_SECRET, true);
            }
            catch (err) {
                
                devlog.log("Error in Payload");  
                devlog.log(err);
                return res.status(500).send('Unable to authenticate');
            }

            if (payload.exp <= moment().unix()) {
                devlog.log("Token Expired")
                return res.status(500).send('Unable to authenticate');
            }
            console.log(payload);
            req.user = payload.sub;
            req.useremail = payload.email;
            req.userdisplayname = payload.name;
            req.userpicture = payload.picture;
            me.getUser(payload.sub, req, res, next);
        }
        else {
            devlog.log("No Request");  
            return res.status(500).send('Unable to authenticate');           
        }
    }

    createJWT(user) {
        var payload = {
            sub: user.GOOGLE,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.TOKEN_SECRET);
    }   

    ensureAdminUser(req, res, next) {
        if (req.fullUser.USER_TYPE !== 'ADMIN') {
            return res.status(401).send('Unauthorized');
        }
        next();
    }   

    ensureEditorUser(req, res, next) {
        if (req.fullUser.USER_TYPE !== 'ADMIN' && req.fullUser.USER_TYPE !== 'EDITOR' ) {
            return res.status(401).send('Unauthorized');
        }
        next();        
    }

    ensureSuperUser(req, res, next) {
        if (req.fullUser.USER_TYPE !== 'ADMIN' && req.fullUser.USER_TYPE !== 'SUPER') {
            return res.status(401).send('Unauthorized');
        }
        next();
    } 
}
module.exports = new utils();