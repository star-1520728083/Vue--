const mongoose = require('mongoose')  //引入mongoose
const Schema = mongoose.Schema //声明schema
let ObjectId = mongoose.Types.ObjectId  //声明Object类型
const bcrypt = require('bcrypt') //引入bcrypt加盐处理
const SALT_WORK_FACTOR = 10
//创建我们的用户注册schema
const UserSchema = new Schema({
    UserId:{type:ObjectId}, 
    userName:{unique:true,type:String},
    password:{type:String},  
    createAt:{type:Date,default:Date.now()}, //登录时间
    lastLoginAt:{type:Date,default:Date.now()}  //最后登录时间
})
//每次存储数据时都要执行
UserSchema.pre('save',function(next){

    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
        if(err) return next(err)

        bcrypt.hash(this.password,salt,(err,hash) => {

            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})
UserSchema.methods = {
    //密码对比方法
    comparePassword:(_password,password) =>{
        return new Promise((resolve,reject) => {
            bcrypt.compare(_password,password,(err,isMatch) => {
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('User',UserSchema)