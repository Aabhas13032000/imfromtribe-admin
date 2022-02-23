const pool = require('../database/connection');

module.exports ={
    getphotographers : (data,callback) => {
        const query = "SELECT *  FROM `users` WHERE `status` = 1 AND `role_id` = 2 LIMIT 30 OFFSET "+ data.offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getnotphotographers : (data,callback) => {
        const query = "SELECT *  FROM `users` WHERE `status` = 1 AND `role_id` = 3 LIMIT 30 OFFSET "+ data.offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    becomeaphotographer : (data,callback) => {
        const query2  = "UPDATE `users` SET `role_id` = 2  WHERE `id` = '"+ data.id +"'";
        pool.query(query2,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });            
    },
    getphotographersexcludeid : (data,callback) => {
        const query = "SELECT *  FROM `users` WHERE `status` = 1 AND `role_id` = 2 AND `id` <> '"+ data.id +"' LIMIT 30 OFFSET "+ data.offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    deletephotographer : (data,callback) => {
        const query2  = "UPDATE `users` SET `status` = 0  WHERE `id` = '"+ data.id +"'";
        pool.query(query2,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });            
    },
    getphotographerbyid : (data,callback) => {
        const query = "SELECT *  FROM `users` WHERE `status` = 1 AND `role_id` = 2 AND `id` = '"+ data.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getsearchphotographerexcludeid : (data,callback) => {
        const query = "SELECT *  FROM `users` WHERE `status` = 1 AND `role_id` = 2 AND `id` <> '"+ data.id +"' AND `name` LIKE '%"+ data.name +"%'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getsearchphotographerincludeid : (data,callback) => {
        const query = "SELECT *  FROM `users` WHERE `status` = 1 AND `role_id` = 2 AND `name` LIKE '%"+ data.name +"%'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
}