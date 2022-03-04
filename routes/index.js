const express = require('express');
const router = express.Router();
const { sign,verify } = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const multer = require('multer');
const sharp = require("sharp");
const fs =  require('fs');
const pool = require('../database/connection');
// const AWS = require('aws-sdk');
// const s3 = new AWS.S3({
//   accessKeyId: 'AKIAZ6KYMGIZIMW7EQEX',
//   secretAccessKey: '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'
// });

const fileStorageEngine = multer.diskStorage({
  destination: (req,file,callback) => {
    callback(null,'public/images/category');
  },
  filename : (req,file,callback) => {
    callback(null,Date.now() + '--' + file.originalname)
  }
});

const upload = multer({
  storage : fileStorageEngine,
});

const controllers = require('../controllers/controllers');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.session);
  // req.session.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGlhbWZyb210cmliZS5jb20iLCJwYXNzd29yZCI6ImFkbWluQGlhbWZyb210cmliZSIsInVzZXJfaWQiOjEsImlhdCI6MTYzOTcyMDg5Mn0.zBZMMSnlfTXbLzE1dsfXamTOQEnCmTu5EHpLisrKSl4';
  if(req.session.token && req.session.initialPath.length != 0){
    verify(req.session.token,accessTokenSecret,(err,decoded) => {
      console.log(err);
      console.log(decoded);
      res.render('index',{
        initialPath : req.session.initialPath,
      });
    });
  } else {
    if(req.query.error){
      res.render('components/login/login',{
        message: req.query.error,
        message_class:'alert-danger'
      });
    } else {
      res.render('components/login/login',{
        message:'You are logged out, Please Login again!!',
        message_class:'alert-warning'
      });
    }
  }
});

/* GET User page. */
router.get('/user', function(req, res, next) {
  res.render('pages/user/user');
});

/* GET Categories page. */
router.get('/categories', function(req, res, next) {
  res.render('pages/categories/categories');
});

/* GET Gallery page. */
router.get('/gallery', function(req, res, next) {
  res.render('pages/gallery/gallery');
});

/* GET Blogs page. */
router.get('/blogs', function(req, res, next) {
  res.render('pages/blogs/blogs');
});

/* GET Testimonial page. */
router.get('/testimonials', function(req, res, next) {
  res.render('pages/testimonials/testimonials');
});

/* GET Approvals page. */
router.get('/approvals', function(req, res, next) {
  res.render('pages/approvals/approvals');
});

/* GET Photographer page. */
router.get('/photographer', function(req, res, next) {
  res.render('pages/photographer/photographer');
});

/* GET Profile page. */
router.get('/profile', function(req, res, next) {
  const query = "SELECT * FROM `appData`";
    pool.query(query,function(err,results,fields){
        if(err) {
            console.log(err);
            res.send('Database error');
        } else {
            res.render('pages/profile/profile',{
              results:results
            });
        }
    });
});

/* Logout application. */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect('/');
  })
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  console.log(req.body);
  const check_user = "SELECT * FROM `appData` WHERE `username` = '"+ req.body.email +"' AND `password` = '"+ req.body.password +"'";
  pool.query(check_user,function(err,result){
    if(err) {
      console.log(err);
    } else {
      if(result.length !=0){
        const jsontoken = sign({username : req.body.email, password:req.body.password, user_id: result[0].id},accessTokenSecret);
        req.session.token = jsontoken;
        req.session.initialPath = '/user';
        res.redirect('/');
      } else {
        res.redirect('/?error=Invalid username and password !!');
      }
    }
  });
});

/* Update Password. */
router.post('/updatePassword', function(req, res, next) {
  const query = "UPDATE `appData` SET `password` = '"+ req.body.c_password +"'";
  pool.query(query,function(err,results,fields){
    res.redirect('/profile');      
  });
});

// Api's

//Photographer
router.get('/getPhotographers/:offset',controllers.getPhotographers);
router.get('/getNotPhotographers/:offset',controllers.getNotPhotographers);
router.get('/getPhotographerById/:id',controllers.getPhotographerById);
router.get('/getPhotographersExcludeId/:id/:offset',controllers.getPhotographersExcludeId);
router.get('/getSearchPhotographerIncludeId/:name',controllers.getSearchPhotographerIncludeId);
router.get('/getSearchPhotographerExcludeId/:id/:name',controllers.getSearchPhotographerExcludeId);
router.post('/deletePhotographger',controllers.deletePhotographer);
router.post('/becomeAPhotographer',controllers.becomeAPhotographer);

//Blogs
router.post('/deleteBlog',controllers.deleteBlog);
router.get('/getBlogs',controllers.getBlogs);
router.get('/getBlogsByOffset/:offset',controllers.getBlogsByOffset);
router.get('/getSearchedBlogs/:value',controllers.getSearchedBlogs);
router.post('/addBlog',controllers.addBlog);
router.get('/getBlogImages/:id',controllers.getBlogImages);
router.get('/getBlogById/:id',controllers.getBlogById);
router.post('/editBlog/:id',controllers.editBlog);
router.get('/getSimiliarBlogs/:category/:id',controllers.getSimiliarBlogs);

router.post('/saveBookImages',upload.array('book_images'),function(req,res,next){
  res.json({files: req.files}); 
});

router.post('/saveEditBookImages/:id/:value',upload.array('book_images'),function(req,res,next){
  // console.log(req.files);
  for(var i=0;i<req.files.length;i++) {
    var path = req.files[i].path.slice(6,req.files[i].path.length);
    if(req.params.value == 'blogs') {
      var query  = "INSERT INTO `images` (`path`,`blog_id`) VALUES ('"+ path +"','"+ req.params.id +"')";
    }
    pool.query(query,function(err,results,fields){
        if(err) {
            console.log(err);
            // break;
        } else {
        }
    });
  }
  res.json({files: req.files}); 
});

//save profile picture
router.post('/saveProfilePicture',upload.single('profile_image'),function(req,res,next){
  res.json({path: req.file.path}); 
});

router.post('/deletePhoto',function(req,res,next){
  var path = `public${req.body.path}`;
  fs.unlink(path,(err) => {
    if(err) {
      console.log(err);
    } else {
      res.json({message: 'success'});
    }
  });
});

router.post('/saveEditBookImages/:id',upload.single('book_images'),function(req,res,next){
  // console.log(req.files);
  var query  = "UPDATE `categories` SET `image` = '"+ req.file.path.slice(6,req.file.path.length) +"' WHERE `id` = '"+ req.params.id +"'";
    pool.query(query,function(err,results,fields){
        if(err) {
            console.log(err);
            // break;
        } else {
          res.json({files: req.file.path}); 
        }
    });
});


router.post('/deleteEditPhoto',function(req,res,next){
  var path = `public${req.body.path}`;

  const query2  = "UPDATE `categories` SET `image` = '' WHERE `path` = '"+ req.body.path +"'";
  pool.query(query2,function(err,results,fields){
    if(err) {
      console.log(err);
    } else {
      fs.unlink(path,(err) => {
        if(err) {
          console.log(err);
        } else {
          res.json({message: 'success'});
        }
      });
    }
  }); 
});

//Common Testimonial + Categories
router.get('/getImpCategoriesTestimonials',function(req,res){
  const categories  = "SELECT * FROM `categories` WHERE `status` = 1 AND `imp` = 1";
  const testimonials  = "SELECT * FROM `testimonials` WHERE `status` = 1 AND `imp` = 1";
  pool.query(categories,function(err,categories,fields){
    if(err) {
      console.log(err);
      res.json({message:'something_went_wrong'});
    } else {
      pool.query(testimonials,function(err,testimonials,fields){
        if(err) {
          console.log(err);
          res.json({message:'something_went_wrong'});
        } else {
          res.json({
            categories:categories,
            testimonials:testimonials,
          })
        }
      });
    }
  });
});

//Testimonal
router.post('/deleteTestimonial',controllers.deleteTestimonial);
router.get('/getTestimonials',controllers.getTestimonials);
router.get('/getImpTestimonials',controllers.getImpTestimonials);
router.post('/addTestimonial',controllers.addTestimonial);
router.post('/markedTestimonialImportant',controllers.markedTestimonialImportant);

//Gallery
router.post('/addGalleryImages',controllers.addGalleryImages);
router.get('/getImagesByCategories/:category/:offset',controllers.getImagesByCategories);
router.get('/getImagesByCategoriesForDashboard/:category/:offset/:approval',controllers.getImagesByCategoriesForDashboard);
router.get('/getImages/:approval/:offset',controllers.getImages);

// category
router.get('/getCategories',controllers.getCategories);
router.get('/getImpCategories',controllers.getImpCategories);
router.post('/markedCategoryImportant',controllers.markedCategoryImportant);
router.post('/deleteCategory',controllers.deleteCategory);
router.post('/editCategory',controllers.editCategory);
router.post('/addCategory',controllers.addCategory);
router.get('/checkCategory/:name',controllers.checkingCategory);
router.post('/uploadCategoryImage',upload.single('category_image'), async function(req,res,next){
  // console.log(req.file);
  var compressedimage = path.join(__dirname,'../','public/images/uploads',new Date().getTime() + ".webp");
  var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
  await sharp(req.file.path).webp({
    lossless: true
  }).resize({
      width: 600
    }).toFile(compressedimage,(err,info) => {
      if(err){
        console.log(err);
      }
      // console.log(info);
      fs.unlink(req.file.path,(err) => {
        if(err) {
          console.log(err);
        } else {
          res.json({path: name});
        }
      });
    });
});

router.post('/uploadUserCoverImage/:user_id',upload.single('cover_image'), async function(req,res,next){
  // console.log(req.file);
  var compressedimage = path.join(__dirname,'../','public/images/uploads',new Date().getTime() + ".webp");
  var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
  await sharp(req.file.path).webp({
    lossless: true
  }).resize({
      width: 600
    }).toFile(compressedimage,(err,info) => {
      if(err){
        console.log(err);
      }
      // console.log(info);
      const query = "UPDATE `users` SET `cover_photo` = '"+ ( 'http://imfromtribe.com:5000' + name.slice(6,name.length)) +"' WHERE `id` = '"+ req.params.user_id +"'";
      pool.query(query,function(err,results,fields){
          if(err) {
              console.log(err);
          } else {
            fs.unlink(req.file.path,(err) => {
              if(err) {
                console.log(err);
              } else {
                res.json({path: name});
              }
            });
          }
      });
    });
});

router.post('/saveGalleryImages',upload.array('gallery_images'),function(req,res,next){
  console.log(req.files);
  var array_of_names = [];
  var counter = 0;
  for (let i=0; i<req.files.length; i++) {
    task(i,req.files[i]);
 }
   
 function task(i,file) {
   setTimeout(function() {
        var compressedimage = path.join(__dirname,'../','public/images/uploads',new Date().getTime() + ".webp");
        var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
        sharp(file.path).webp({
          lossless: true
        }).resize({
            width: 600
          }).toFile(compressedimage,(err,info) => {
          if(err){
            console.log(err);
          }
          console.log(info);
          fs.unlink(file.path,(err) => {
            if(err) {
              console.log(err);
            } else {
              array_of_names.push(name);
              counter++;
              check_counter(counter);
            }
          });
        });
   }, 1000 * i);
 }
  function check_counter(counter1){
    if(counter1 == req.files.length){
      res.json({files: array_of_names}); 
    }
  }
});

router.post('/deletePhoto',function(req,res,next){
  var splited_array = req.body.path.split('/');
  // console.log(splited_array);
  var path = `public${req.body.path}`;
  // console.log(path);
  fs.unlink(path,(err) => {
    if(err) {
      console.log(err);
    } else {
      res.json({message: 'success'});
    }
  });
});

router.post('/deleteGalleryPhoto',function(req,res,next){
  var splited_array = req.body.path.split('/');
  var path = `public${req.body.path}`;
  const query2  = "DELETE FROM `images` WHERE `path` = '"+ req.body.path +"'";
  pool.query(query2,function(err,results,fields){
    if(err) {
      console.log(err);
    } else {
      fs.unlink(path,(err) => {
        if(err) {
          console.log(err);
        } else {
          res.json({message: 'success'});
        }
      });
    }
  }); 
});

router.post('/approveGalleryPhoto',function(req,res,next){
  if(req.body.approve_value == 1){
    var query2  = "UPDATE `images` SET `approved` = 0 WHERE `path` = '"+ req.body.path +"'";
  } else {
    var query2  = "UPDATE `images` SET `approved` = 1 WHERE `path` = '"+ req.body.path +"'";
  }
  pool.query(query2,function(err,results,fields){
    if(err) {
      console.log(err);
    } else {
      res.json({message: 'success'}); 
    }
  }); 
});

module.exports = router;
