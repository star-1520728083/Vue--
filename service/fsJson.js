const fs = require('fs')
fs.readFile('./goods.json','utf8',function(err,data){
    //json对象
    let newData = JSON.parse(data)
    //提纯json
    let pushData = []
    let i = 0
    newData.RECORDS.map(function(value){
        if(value.IMAGE1!=null){
            i++
            console.log(i)
            pushData.push(value)
        }
    })
    fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
        if(err) console.log(err)
        else console.log('写入文件操作成功')
    })
    console.log(pushData)
})