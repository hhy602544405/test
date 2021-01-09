var express = require('express');
const user = require('../sql/user');
var router = express.Router();
const User = require('../sql/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

    res.render('User', {
      index:2,
      data:data
    });
  })
  
});


//添加用户信息
router.get('/add',(req,res,next)=>{
  res.render('userAdd',{
    index:2
  })
})

router.post('/addAction',(req,res,next)=>{
  console.log('进入添加用户信息页面');
  let obj = req.body;
  //数字转换
  obj.phone = Number(obj.phone);
  obj.age = Number(obj.age);

  User.insertMany(obj,(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.redirect('/user');
  })
})



//用户搜索
router.get('/search',(req,res,next)=>{
  console.log('用户搜索中');
  const obj = req.query;

  let reg = new RegExp(obj.search);
  User.find({userName:reg},(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.render('User',{
      index:2,
      data
    })
  })
})



//修改用户信息
router.get("/update",(req,res,next)=>{
  console.log(req.query);

  const _id = req.query._id;
  console.log("_id",_id);

  User.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate',{
      index:2,
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
  obj.phone = Number(obj.phone);
  obj.age = Number(obj.age);
  // obj.discount = obj.discount - 0;
  // obj.sales = obj.sales - 0;
  // obj.score = obj.score * 1;
  console.log('obj_id',obj)
  User.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/user");

  })

  
});


//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log('我现在进入/delete里面了')
  console.log(req.query)

  User.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     res.redirect("/user");
  })
});

module.exports = router;
