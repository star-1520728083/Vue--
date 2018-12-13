const Router = require ('koa-router')
let router = new Router()
const mongoose = require('mongoose')
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.post('/register',async(ctx)=>{
    //取得model
    const User = mongoose.model('User')
    //把前端接受的POST数据封装成一个新的对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save()方法直接储存,然后判断是否成功,返回相应的结果
    await newUser.save().then(() => {
        //成功返回code=200，并返回成功的信息
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error => {
        //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:'注册失败'
        }
    })
})

//登录的实践
router.post('/login',async(ctx)=>{
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码
    await User.findOne({userName:userName}).exec().then(async(result) => {
        console.log(result)
        if(result){
            //当用户存在,比对密码
            let newUser = new User()//因为是实例方法，所有要new出对象才能调用
            await newUser.comparePassword(password,result.password)
            .then( (isMatch) => {
                //返回比对结果
                ctx.body = {code:200,message:isMatch}
            })
            .catch(error =>{
                console.log(error)
                ctx.body = {code:500,message:error}
            })
        }else{
            ctx.body={code:200,message:'用户名不存在'}
        }
    }).catch(error => {
        //服务器出现错误或者网路异常
        console.log(error)
        ctx.body = {code:500,message:error}
    })
})
module.exports=router;