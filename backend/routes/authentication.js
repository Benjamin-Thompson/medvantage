const express = require('express');
const authentication = express.Router();
const utils = require('../utilities/utils');
const devlog = require('../utilities/devlog');
const mysql = require('../utilities/mysql');
const async = require('async');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const moment = require('moment');
const request = require('request');
const config = require('../config.js');



authentication.get('/me', utils.ensureAuthenticated, function(req, res) {
    devlog.log("getting /me");
  let query = `
    SELECT TITLE, EMAIL, PICTURE, USER_TYPE, DISPLAY_NAME, REP_ID FROM Users WHERE GOOGLE = '${req.user}' AND ISACTIVE = TRUE
  `;
  mysql.query('Get Current User', query, function(results, item, res, err){
    //if (!err) {
        if (results.length > 0) {
            return res.status(200).send(results);
        }
        else {
            return res.status(200).send([])
        }
    //}  
    /*else {
        devlog.log("Cant find me!")
        return res.status(400).send("User not found!");
    }*/
  },null,res, 'no me found'); 
});

/*
authentication.put('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
        console.log("Cant find me!")
      return res.status(400).send({ message: 'User not found' });
    }
    console.log("This is me");
    console.log(user);
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});
*/


authentication.post('/auth/google', function(req, res) {
  devlog.log("Attempting Login");
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    devlog.log("Transferring auth code");
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        devlog.publish('Login', profile.error.message);
        return res.status(500).send({message: profile.error.message});
      }
      // Step 3a. Link user accounts.
      devlog.log("Checking headers")
      if (req.header('Authorization')) {
        let query = `
            SELECT * FROM Users WHERE GOOGLE = '${profile.sub}' AND ISACTIVE = TRUE
        `;
        mysql.query('Checking for good users in Auth', query, function(results, item, res, err) {
                if (results.length > 0) {
                    devlog.log("User already linked");
                    return res.status(409).send({isValid: true, error: "User is already linked to you!"});
                }
                else {
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    devlog.log("PAYLOAD:");
                    devlog.log(payload);
                    query = `
                        SELECT * FROM Users WHERE GOOGLE = '${payload.sub}' AND ISACTIVE = TRUE
                    `;
                    mysql.query('Google User Login', query, function(results, item, res, err) {
                            let thisDate = new Date();
                            devlog.log("User being linked initially:")
                            devlog.log(results);
                            if (results.length > 0) {
                                query = `
                                    UPDATE Users
                                    SET GOOGLE = ${profile.sub}, PICTURE = ${results[0].PICTURE || profile.picture.replace('sz=50', 'sz=200')},
                                    DISPLAY_NAME = ${results[0].DISPLAY_NAME || profile.name}, LAST_LOGIN = NOW(),
                                    MODIFIED_BY = ${results[0].ID}, MODIFIED_DATE = CURDATE()
                                    WHERE ID = ${results[0].ID}
                                `;
                                let currentUser = results[0].ID;
                                mysql.query('Google User Linking', query, function(results, item, res, err) {
                                        devlog.log("Sending Token Now");
                                        let token = utils.createJWT(user);
                                        devlog.publish('Login', 'User Logging In: ' + profile.email, currentUser);
                                        return res.status(200).send({ token: token });
                                    //}
                                }, null, res, 'Failed to link User');
                            }
                        //}
                    }, null, res, 'Bad User Login');
                }
            //}
        }, null, res, 'Bad User Error');
      } 
      else {
        // Step 3b. Create a new user account or return an existing one.
        let query = `
            SELECT * FROM Users WHERE GOOGLE = '${profile.sub}' AND ISACTIVE = TRUE
        `;
        mysql.query('Checking Google User', query, function(results, item, res, err) {

                if (results.length > 0) {
                    devlog.log("Existing User Send Off:");
                    query = `UPDATE Users SET LAST_LOGIN = NOW() WHERE ID = ${results[0].ID}`
                    console.log(query);
                    mysql.query('Updating Users', query, function(results, item, res, err) {}, null, null, null, null);
                    devlog.publish('Login', 'User Logged In: ' + results[0].EMAIL, results[0].ID);
                    res.status(200).send({
                        token: utils.createJWT({
                            GOOGLE: results[0].GOOGLE,
                            DISPLAY_NAME: results[0].DISPLAY_NAME,
                            EMAIL: results[0].EMAIL,
                            PICTURE: results[0].PICTURE,
                            USER_TYPE: results[0].USER_TYPE,
                            SIMULATED_AS: results[0].SIMULATED_AS
                        })
                    });
                }
                else {
                    query = `
                        SELECT * FROM Users WHERE EMAIL = '${profile.email}' AND ISACTIVE = TRUE
                    `;
                    mysql.query('Getting User Email', query, function(results, item, res, err) {
                        if (err || results.length == 0) {
                            devlog.log("Hacker Alert!");
                            devlog.log("email is " + profile.email);
                            devlog.log(results);
                            devlog.log(err);
                            devlog.publish('HACKER ALERT', 'Looks like a hacker is trying to login with the email address: ' + profile.email);
                            return res.status(500).send({isValid: false, error: "ARE YOU HACKING ME?"}); 
                        }
                        else {
                            devlog.log("New User Logging In for First Time")
                            devlog.log(profile);
                            let thisUser = {
                                GOOGLE: profile.sub,
                                DISPLAY_NAME: profile.name,
                                EMAIL: results[0].EMAIL,
                                PICTURE: profile.picture.replace('sz=50', 'sz=200'),
                                USER_TYPE: results[0].USER_TYPE,
                                SIMULATED_AS: results[0].SIMULATED_AS                                
                            }
                            console.log(thisUser);
                            query = `
                                UPDATE Users
                                SET GOOGLE = '${profile.sub}', PICTURE = '${profile.picture.replace('sz=50', 'sz=200')}', DISPLAY_NAME = '${profile.name}', 
                                LAST_LOGIN = NOW(),
                                MODIFIED_BY = ${results[0].ID}, MODIFIED_DATE = CURDATE()
                                WHERE ID = '${results[0].ID}'
                            `;
                            let currentUser = results[0].ID;
                            mysql.query('Update Users Query', query, function(results, item, res, err) {
                                if (err) {
                                    devlog.log(err);
                                    return res.status(500).send({isValid: false, error: "Failed to add new user"});
                                }
                                else {
                                    devlog.publish('Login', 'First time login for user with email address: ' + profile.email, currentUser);
                                    return res.status(200).send({isValid: true, message: "New User Added", token: utils.createJWT(thisUser)});
                                }
                            }, null, res, 'Failed to add new User');                             
                        }
                    }, null, res, 'Hacker Alert');                   
                }
            //}
        }, null, res, 'Bad User Error');
      }
    });
  });
});

module.exports = authentication;