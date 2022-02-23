const pool = require('../database/connection');

module.exports ={
    getblogs : (callback) => {
        const query = "SELECT `blogs`.* ,(SELECT `path` FROM `images` WHERE `images`.`blog_id` = `blogs`.`id` LIMIT 1 OFFSET 0) AS image_path FROM `blogs` WHERE `status` = 1 ORDER BY `created_at` DESC";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getblogbyid : (data,callback) => {
        const query = "SELECT * FROM `blogs` WHERE `status` = 1 AND `id` = '"+ data.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getblogsbyoffset : (data,callback) => {
        const query = "SELECT `blogs`.* ,(SELECT `path` FROM `images` WHERE `images`.`blog_id` = `blogs`.`id` LIMIT 1 OFFSET 0) AS image_path FROM `blogs` WHERE `status` = 1 ORDER BY `created_at` DESC LIMIT 10 OFFSET "+ data.offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getsearchedblogs : (data,callback) => {
        const query = "SELECT `blogs`.* ,(SELECT `path` FROM `images` WHERE `images`.`blog_id` = `blogs`.`id` LIMIT 1 OFFSET 0) AS image_path FROM `blogs` WHERE `status` = 1 AND `title` LIKE '%"+ data.value +"%'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    addblog : (data,callback) => {
        var images_array = [];
        if(typeof (Object.entries(data)[2])[1] != 'string'){
            images_array = (Object.entries(data)[2])[1];
        } else {
            images_array.push((Object.entries(data)[2])[1]);
        }
        const query  = "INSERT INTO `blogs` (`title`,`description`,`path`,`category`) VALUES ('"+ data.title +"','"+ data.description +"','"+ images_array[0] +"','"+ data.category +"')";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                for(var i=0;i<images_array.length;i++) {
                    var query  = "INSERT INTO `images` (`path`,`blog_id`) VALUES ('"+ images_array[i] +"','"+ results.insertId +"')";
                    pool.query(query,function(err,results1,fields){
                        if(err) {
                            console.log(err);
                            callback(err);
                            // break;
                        } else {
                        }
                    });
                }
                callback(null,results);
            }
        });
    },
    deleteblog : (data,callback) => {
        const query2  = "UPDATE `blogs` SET `status` = 0  WHERE `id` = '"+ data.id +"'";
        pool.query(query2,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });            
    },
    editblog : (data,id,callback) => {
        const query2  = "UPDATE `blogs` SET `title` = '"+ data.title +"',`description` = '"+ data.description +"',`category` = '"+ data.category +"' WHERE `id` = '"+ id +"'";
        pool.query(query2,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });        
        
    },
    getblogimages : (data,callback) => {
        const query  = "SELECT * FROM `images` WHERE `blog_id` = '"+ data +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getsimiliarblogs : (data,callback) => {
        const query  = "SELECT * FROM `blogs` WHERE `category` = '"+ data.category +"' AND `id` <> '"+ data.id +"' ORDER BY `created_at` DESC LIMIT 6 OFFSET 0";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
}