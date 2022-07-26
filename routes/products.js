const express=require('express');
var router =express.Router();
const fs=require('fs');
const multer=require('multer');
const {findProducts,fineOne,GetProductsBySellerName,createProduct, updateProduct, deleteProduct}
=require('../controllers/products')
const storage=multer.diskStorage({destination:function(req,file,cb){
  cb(null,'./productImage/')
}
,filename:function(req,file,cb){
  cb(null,new Date().toDateString()+file.originalname)
}
});

const upload=multer({storage:storage,
  limits:{
    fileSize:1024*1024*5
  }
})

router.get("/", async(req, res, next) => {
  var products = await findProducts();
  if (products) {
    res.json(products);
  } else {
    res.json({ message: "Sorry! Theses Products Not Found " });
  }
  });

  router.get("/:name", async (req, res, next) => {
    var { name } = req.params;
  
    var product = await fineOne(name);
  
    res.status(201).json(product);
  });
  

  // router.post("/", upload.single('myfile'),(req, res, next) => {
  //   console.log(req.file);
  //   createProduct(req.body).then((product)=>{
  //     console.log(req.body)
  //         res.status(201).json(product)
  //     }).catch((err)=>{
  //         res.status(422).json(err)
  //     })
  // });
  router.post("/", upload.single('myfile'),(req, res, next) => {
    console.log(req.file);
    const product=new products({
      name:req.body.name,
      description:req.body.description,
      createdAt:req.body.createdAt,
      image:file.path
    });
    product.save().then(doc =>{
      res.status(200).json({
        message:"product is added sucessfully",
        product:doc
      })
    }).catch(err=>{
      res.status(404).json({
        message:err
      })
    })
  });
  router.get("/",async(req,res,next)=>{
    var query =req.query.sellerName;
    console.log(req.query);
    var product=await findProducts();
    if(query!=undefined){
    try{
      var result=await GetProductsBySellerName(query);
      res.json(result);
  
    }
  catch(error){
    res.status(422).json({error});
  }
  }
  else{
    res.json(product);
  }
  })

  router.patch("/:id", (req, res, next) => {
    var { id } = req.params;
    var { name } = req.body;
    var { description} = req.body;
    var { createdAt } = req.body;
    var { sellerName } = req.body;

    updateProduct(id,name,description,createdAt,sellerName)
      .then(() => {
        res.status(200).json({ message: "Product updated successfully" });
      })
      .catch((err) => {
        res.status(422).json(err);
      });
    });
    

  router.delete("/:name", (req, res, next) => {
    var { name } = req.params;
    var deleted=deleteProduct(name);
    res.json(deleted);
  });
module.exports=router;  