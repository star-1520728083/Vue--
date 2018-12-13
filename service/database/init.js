const mongoose = require('mongoose')
const db = 'mongodb://localhost/simle-db'
const glob = require('glob')
const {resolve} = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

exports.connect = () => {
    //链接数据库
    mongoose.connect(db)
    //增加数据库连接事件监听
    let maxConnectTimes = 0
    return new Promise((resolve ,reject) => {
        mongoose.connection.on('disconnected',() => {

            console.log('***********数据库断开*********')
            if(maxConnectTimes<3){
                maxConnectTimes ++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题')
            }
            
        })
    
        //数据库出现错误的时候
        mongoose.connection.on('error',err=>{
            console.log(err)
            if(maxConnectTimes<3){
                maxConnectTimes ++
                mongoose,connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题')
            }
        })
    
        //链接打开的时候
        mongoose.connection.once('open',() =>{
            console.log('MongonDB Connected successfully!')
            resolve()
        })
    })
    
}
