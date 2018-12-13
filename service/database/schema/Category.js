const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:String,
    MALL_CATEGORY_NAME:String,
    IMAGE:String,
    TYPE:Number,
    SORT:Number,
    COMMENTS:String
},{collections:'Category'})

mongoose.model('Category',categorySchema)