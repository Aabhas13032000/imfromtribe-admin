const pool = require('../database/connection');

module.exports = {
    getuser : (data,callback) => {
        const query = "SELECT * FROM `users` WHERE `token` = '"+ data.token +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    saveusertoken : (data,callback) => {
        const query = "INSERT INTO `users` (`token`,`login`) VALUES ('"+ data.token +"',0)";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    saveuser : (data,callback) => {
        const query = "UPDATE `users` SET `name` = '"+ data.name +"',`email` = '"+ data.email +"',`password` = '"+ data.password +"',`role_id` = '"+ data.role_id +"',`login` = 1 WHERE `token` = '"+ data.token +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    updateloginstatus : (data,callback) => {
        const query = "UPDATE `users` SET `login` = 1 WHERE `token` = '"+ data.token +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    updatedetails : (data,callback) => {
        const query = "UPDATE `users` SET `name` = '"+ data.name +"',`phone` = '"+ data.phone +"',`gender` = '"+ data.gender +"',`bio` = '"+ data.bio +"',`profile_pic` = '"+ data.profile_pic +"',`skills` = '"+ data.skills +"' WHERE `token` = '"+ data.token +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    checkuser : (data,callback) => {
        const query = "SELECT * FROM `users` WHERE `email` = '"+ data.email +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getuserimagesvideos : (data,callback) => {
        const query = "SELECT * FROM `images` WHERE `category` = '"+ data.category +"' AND `user_id` = '"+ data.id +"' ORDER BY `date` DESC LIMIT 20 OFFSET "+ data.offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getsearchuser : (data,callback) => {
        const query = "SELECT *  FROM `users` WHERE `status` = 1 AND `role_id` = 3 AND `name` LIKE '%"+ data.name +"%'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
};