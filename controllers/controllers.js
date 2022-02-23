const { checkCategory,addcategory,getcategories,markedcategoryimportant,deletecategory,editcategory,getimpcategories } = require('../services/category');
const { getimages,addgalleryImages,getimagesbycategories,getimagesbycategoriesfordashboard } = require('../services/gallery');
const { addblog, getblogs, editblog, deleteblog,getblogimages,getsearchedblogs,getblogsbyoffset,getsimiliarblogs,getblogbyid} =  require('../services/blogs');
const { gettestimonials,addtestimonial,deletetestimonial,markedtestimonialimportant,getimptestimonials} =  require('../services/testimonial');
const { getphotographerbyid,getphotographers,getphotographersexcludeid,getsearchphotographerexcludeid,getsearchphotographerincludeid,deletephotographer,getnotphotographers,becomeaphotographer } =  require('../services/photographers');
const { verify } = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

module.exports = {
    getSearchPhotographerExcludeId: (req,res) => {
        getsearchphotographerexcludeid(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getSearchPhotographerIncludeId: (req,res) => {
        getsearchphotographerincludeid(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getPhotographersExcludeId: (req,res) => {
        getphotographersexcludeid(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getPhotographerById: (req,res) => {
        getphotographerbyid(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getPhotographers: (req,res) => {
        getphotographers(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getNotPhotographers: (req,res) => {
        getnotphotographers(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    becomeAPhotographer: (req,res) => {
        becomeaphotographer(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    deletePhotographer: (req,res) => {
        deletephotographer(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getImages: (req,res) => {
        getimages(req.params.approval,req.params.offset,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getImagesByCategories: (req,res) => {
        getimagesbycategories(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getImagesByCategoriesForDashboard: (req,res) => {
        getimagesbycategoriesfordashboard(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    deleteCategory: (req,res) => {
        deletecategory(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    editCategory: (req,res) => {
        editcategory(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    markedCategoryImportant: (req,res) => {
        markedcategoryimportant(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getCategories: (req,res) => {
        getcategories((err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getImpCategories: (req,res) => {
        getimpcategories((err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    checkingCategory: (req,res) => {
        checkCategory(req.params.name,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    addCategory: (req,res) => {
        addcategory(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({message:'Category added successfully'});
            }
        })
    },
    addGalleryImages: (req,res) => {
        verify(req.session.token,accessTokenSecret,(err,decoded) => {
            console.log(err);
            if(!err) {
                req.body.user_id = decoded.user_id;
                addgalleryImages(req.body,(err,results) => {
                    if(err) {
                        console.log(err);
                        res.json({message:'Database connection error !!'});
                    } else {
                        // console.log(results);
                        res.json({message:'Images added successfully'});
                    }
                })
            }
        });
    },
    getBlogs: (req,res) => {
        getblogs((err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getBlogsByOffset: (req,res) => {
        getblogsbyoffset(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getBlogById: (req,res) => {
        getblogbyid(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getSearchedBlogs: (req,res) => {
        getsearchedblogs(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    addBlog: (req,res) => {
        addblog(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({message:'Book added successfully'});
            }
        });
    },
    editBlog: (req,res) => {
        editblog(req.body,req.params.id,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({message:'Book added successfully'});
            }
        });
    },
    deleteBlog: (req,res) => {
        deleteblog(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({message:'Book added successfully'});
            }
        });
    },
    getBlogImages: (req,res) => {
        getblogimages(req.params.id,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getSimiliarBlogs: (req,res) => {
        getsimiliarblogs(req.params,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getTestimonials: (req,res) => {
        gettestimonials((err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    getImpTestimonials: (req,res) => {
        getimptestimonials((err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({data:results});
            }
        });
    },
    addTestimonial: (req,res) => {
        addtestimonial(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({message:'Book added successfully'});
            }
        });
    },
    deleteTestimonial: (req,res) => {
        deletetestimonial(req.body,(err,results) => {
            if(err) {
                console.log(err);
                res.json({message:'Database connection error !!'});
            } else {
                // console.log(results);
                res.json({message:'Book added successfully'});
            }
        });
    },
    markedTestimonialImportant: (req,res) => {
        markedtestimonialimportant(req.body,(err,results) => {
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