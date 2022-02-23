const express = require('express');
const router = express.Router();
const { sign,verify } = require('jsonwebtoken');
const accessTokenSecret = 'useraccesstokensecret';
const controllers = require('../controllers/usercontrollers');
const path = require('path');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'thephotographytribe@gmail.com',
            pass: 'Qwerty@12345',
         },
    secure: true,
    });

router.get('/',function(req,res,next){
    res.json({message:'hello'});
});

router.post('/saveToken',controllers.saveUserToken);
router.post('/updateLoginStatus',controllers.updateLoginStatus);
router.post('/updateDetails',controllers.updateDetails);
router.get('/getUser/:token',controllers.getUser);
router.get('/getUserImagesVideos/:category/:id/:offset',controllers.getUserImagesVideos);
router.get('/checkUser/:email',controllers.checkUser);
router.post('/signup',controllers.saveUser);

router.post('/sendmail',function(req,res){
    // console.log(req.body);
    const mailData = {
        from: 'thephotographytribe@gmail.com',  // sender address
        to: req.body.email,   // list of receivers
        subject: 'One Time Password',
        text: 'That was easy!',
        html: `<b>Hola User! </b><br> We are glad to have you on our website<br> Your OTP is: ${req.body.otp}<br> Please login in our website and enjoy our services<br/>`,
    };

    transporter.sendMail(mailData, function (err, info) {
        if(err){
            console.log(err);
            res.json({message:'not_successfull'});
        }
        else {
            // console.log(info);
            res.json({message:'successfull'});
        }
     });
});

module.exports = router;
