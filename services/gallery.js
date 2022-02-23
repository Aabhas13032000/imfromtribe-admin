const pool = require('../database/connection');

module.exports = {
    getimages : (approval,offset,callback) => {
        const query  = "SELECT * FROM `images` WHERE `approved` = '"+ approval +"' AND `category_id` IS NOT NULL ORDER BY `date` DESC LIMIT 20 OFFSET "+ offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getimagesbycategories : (data,callback) => {
        const query  = "SELECT i.* FROM `images` i INNER JOIN `categories` c ON c.`id` = i.`category_id` WHERE i.`approved` = '1' AND c.`name` = '"+ data.category +"' AND i.`category_id` IS NOT NULL ORDER BY i.`date` DESC LIMIT 20 OFFSET "+ data.offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    getimagesbycategoriesfordashboard : (data,callback) => {
        const query  = "SELECT i.* FROM `images` i INNER JOIN `categories` c ON c.`id` = i.`category_id` WHERE i.`approved` = '"+ data.approval +"' AND c.`name` = '"+ data.category +"' AND i.`category_id` IS NOT NULL ORDER BY i.`date` DESC LIMIT 20 OFFSET "+ data.offset +"";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                callback(null,results);
            }
        });
    },
    addgalleryImages : (data,callback) => {
        var category_id = (Object.entries(data)[0])[1];
        var images_array = [];
        var user_id = (Object.entries(data)[2])[1];
        console.log(user_id);
        if(typeof (Object.entries(data)[1])[1] != 'string'){
            images_array = (Object.entries(data)[1])[1];
        } else {
            images_array.push((Object.entries(data)[1])[1]);
        }
        for(var i=0;i<images_array.length;i++) {
            var query  = "INSERT INTO `images` (`path`,`user_id`,`category_id`,`approved`,`category`) VALUES ('"+ images_array[i] +"','"+ user_id +"','"+ category_id +"',1,'image')";
            pool.query(query,function(err,results,fields){
                if(err) {
                    console.log(err);
                    callback(err);
                } else {
                }
            });
        }
        callback(null,[{message:'submitted successfully'}]);
    }
}