const Koa = require('koa')
const app = new Koa()
const Router = require ('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

//插入数据
router.get('/insertAllGoodsInfo',async(ctx)=>{
     fs.readFile('./datajson/newGoods.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log('失败：'+error)
            })
        })
    })
    ctx.body='开始导入'
})


router.get('/category',async(ctx)=>{
    fs.readFile('./datajson/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let count = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map(value => {
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                count ++
                console.log('成功'+count)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })
    })
    ctx.body='开始导入数据'
})

//解析categorysub数据,并插入数据库
router.get('/categorysub',async(ctx)=>{
    fs.readFile('./datajson/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let count = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map(value => {
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                count ++
                console.log('成功'+count)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })
    })
    ctx.body='成功导入'
})
  
//热卖商品详情数据接口
router.post('/getDatailGoodsInfo',async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({ID:goodsId}).exec()
        ctx.body={
            code:200,
            message:result
        }
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

//读取大类的文件
router.get('/getCategoryList',async(ctx) =>{
    try{
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {code:200,message:result}
    }catch(err){
        console.log(err)
    }
})

//读取小类的文件
router.post('/getCategoryListSub',async(ctx)=>{
    try{
        let categoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
//获取小类的Id
router.post('/getCategoryListSubId',async(ctx) =>{
    try{
        let categorySubId = ctx.request.body.categorySubId
        let page = ctx.request.body.page //获取当前页数
        let num = 10 //每页显示的数量
        let start = (page-1)*num   //从第0个开始
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
        ctx.body = {code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
module.exports=router;