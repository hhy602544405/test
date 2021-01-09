var express = require('express');
// const order = require('../sql/order');
var router = express.Router();
const order = require('../sql/order')
/* GET home page. */
router.get('/', function(req, res, next) {
    order.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

    res.render('order', {
      index:3,
      data:data
    });
  })
  
});


//添加用户信息
router.get('/add',(req,res,next)=>{
  res.render('orderAdd',{
    index:3
  })
})

router.post('/addAction',(req,res,next)=>{
  console.log('进入添加用户信息页面');
  let obj = req.body;
  //数字转换
  // obj.phone = Number(obj.phone);
  obj.age = Number(obj.age);

  order.insertMany(obj,(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.redirect('/order');
  })
})



//用户搜索
router.get('/search',(req,res,next)=>{
  console.log('用户搜索中');
  const obj = req.query;

  let reg = new RegExp(obj.search);
  order.find({userName:reg},(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.render('order',{
      index:3,
      data
    })
  })
})



//修改用户信息
router.get("/update",(req,res,next)=>{
  console.log(req.query);

  const _id = req.query._id;
  console.log("_id",_id);

  order.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('orderUpdate',{
      index:3,
      data:data
    })
})
})

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  // obj.phone = Number(obj.phone);
  obj.age = Number(obj.age);
  // obj.discount = obj.discount - 0;
  // obj.sales = obj.sales - 0;
  // obj.score = obj.score * 1;
  console.log('obj_id',obj)
  order.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/order");

  })

  
});


//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log('我现在进入/delete里面了')
  console.log(req.query)

  order.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     res.redirect("/order");
  })
});

module.exports = router;
