router.post('/uploadCategoryImage',upload.single('category_image'), async function(req,res,next){
    console.log(req.file);
    var compressedimage = path.join(__dirname,'../','public/images/uploads',new Date().getTime() + ".webp");
    var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
    await sharp(req.file.path).webp({
      // quality: 100
      lossless: true
    }).resize({
        width: 600
      }).toFile(compressedimage,(err,info) => {
        if(err){
          console.log(err);
        }
        console.log(info);
        fs.unlink(req.file.path,(err) => {
          if(err) {
            console.log(err);
          } else {
            // res.json({message: 'success'});
            res.json({path: name});
          }
        });
      });
    // if(req.file.size > 6000000){
    //   var compressedimage = path.join(__dirname,'../','public/images/uploads',new Date().getTime() + ".webp");
    //   var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
    //   // console.log(compressedimage);
    //   // console.log(name);
    // //   fs.readFile(req.file.path, (err, data) => {
    // //     if (err) throw err;
    // //     console.log(data);
    // //     const params = {
    // //         Bucket: 'iamfromtribe', // pass your bucket name
    // //         Key: req.file.filename, // file will be saved as testBucket/contacts.csv
    // //         Body: JSON.stringify(data, null, 2)
    // //     };
    // //     s3.upload(params, function(s3Err, data) {
    // //         if (s3Err) throw s3Err
    // //         console.log(`File uploaded successfully at ${data.Location}`);
    // //         res.json({path: name});
    // //     });
    // //  });
    //   // await sharp(req.file.path).resize({
    //   //   width: 600
    //   // }).toFile(compressedimage,(err,info) => {
    //   //   if(err){
    //   //     console.log(err);
    //   //   }
    //   //   console.log(info);
    //   //   fs.unlink(req.file.path,(err) => {
    //   //     if(err) {
    //   //       console.log(err);
    //   //     } else {
    //   //       // res.json({message: 'success'});
    //   //       res.json({path: name});
    //   //     }
    //   //   });
    //   // });
    // } else {
    //   res.json({path: req.file.path}); 
    // }
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
        //  console.log(i);
        // if(file.size > 6000000){
          var compressedimage = path.join(__dirname,'../','public/images/uploads',new Date().getTime() + ".webp");
          var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
          // console.log(compressedimage);
          // console.log(name);
          sharp(file.path).webp({
            // quality: 100
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
                // res.json({message: 'success'});
                // res.json({path: name});
                array_of_names.push(name);
                counter++;
                check_counter(counter);
              }
            });
          });
        // } else {
        //   // res.json({path: req.file.path}); 
        //   array_of_names.push(file.path);
        //   counter++;
        // }
        // check_counter(counter);
     }, 2000 * i);
   }
  //  console.log(counter);
    // for(var i=0;i<req.files.length;i++) {
    //   if(req.files[i].size > 6000000){
    //     var compressedimage = path.join(__dirname,'../','public/images/uploads',new Date().getTime() + ".jpeg");
    //     var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
    //     // console.log(compressedimage);
    //     // console.log(name);
    //     sharp(req.files[i].path).jpeg({
    //       quality: 20,
    //       chromaSubsampling : '4:4:4'
    //     }).toFile(compressedimage,(err,info) => {
    //       if(err){
    //         console.log(err);
    //       }
    //       console.log(info);
    //       fs.unlink(req.files[i].path,(err) => {
    //         if(err) {
    //           console.log(err);
    //         } else {
    //           // res.json({message: 'success'});
    //           // res.json({path: name});
    //           array_of_names.push(name);
    //         }
    //       });
    //     });
    //   } else {
    //     // res.json({path: req.file.path}); 
    //     array_of_names.push(req.files[i].path);
    //   }
    //   counter++;
    // }
    function check_counter(counter1){
      if(counter1 == req.files.length){
        res.json({files: array_of_names}); 
      }
    }
  });
  