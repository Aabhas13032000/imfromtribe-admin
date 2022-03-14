const {saveusertoken,getuser,saveuser,checkuser,updateloginstatus,updatedetails,getuserimagesvideos,getsearchuser} = require('../services/user');

module.exports = {
    getUser: (req,res) => {
        getuser(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results); 
                res.json({data: results});
            }
        });
    },
    getUserImagesVideos: (req,res) => {
        getuserimagesvideos(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results); 
                res.json({data: results});
            }
        });
    },
    checkUser: (req,res) => {
        checkuser(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results); 
                res.json({data: results});
            }
        });
    },
    saveUserToken: (req,res) => {
        saveusertoken(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results); 
                res.json({message:'User Created Successfully'});
            }
        });
    },
    saveUser: (req,res) => {
        saveuser(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results); 
                res.json({message:'User Updated Successfully'});
            }
        });
    },
    updateLoginStatus: (req,res) => {
        updateloginstatus(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results); 
                res.json({message:'User Updated Successfully'});
            }
        });
    },
    updateDetails: (req,res) => {
        updatedetails(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results); 
                res.json({message:'User Updated Successfully'});
            }
        });
    },
    getSearchUser: (req,res) => {
        getsearchuser(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
}