const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose') 
const {connect , initSchemas} = require('./database/init.js') //引入connect
const Router = require('koa-router')
let user = require('./appAPI/user.js')
const bodyParser = require('koa-bodyparser')//引入路由中间件
const cors = require('koa2-cors')  //跨域中间件
let goods = require('./appAPI/goods.js')

app.use(cors())
app.use(bodyParser())

//装载所有子路由
let router = new Router();
router.use('/user',user.routes());
router.use('/goods',goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行函数
{(async() => {
    await connect()
    initSchemas()
    const User = mongoose.model('User') //创建model
    let onUser = new User({userName:'star',password:'123456'})
    onUser.save().then(() => {
        console.log('插入成功')
    })
    let users = await User.findOne({}).exec() 
    console.log(users)
})
()}


app.use(async(ctx) => {
    ctx.body="hello world"
})

app.listen(3000,() => {
    console.log('开启成功')
})