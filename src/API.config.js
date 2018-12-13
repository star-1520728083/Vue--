const BASEURL = 'https://www.easy-mock.com/mock/5bed15a89e6bbf680f549573/StarVue/'
const LOACKURL = 'http://localhost:3000/'

const URL = {
    getShoppingMallInfo : BASEURL + "index",   //easy-mock数据接口
    registerUser : LOACKURL + 'user/register',  //用户注册接口
    login:LOACKURL + 'user/login', //登录接口
    getDetailGoodsInfo:LOACKURL + 'goods/getDatailGoodsInfo', //详解接口
    getCategoryList:LOACKURL + 'goods/getCategoryList', //大类信息
    getCategoryListSub:LOACKURL+ 'goods/getCategoryListSub', //小类信息
    getCategoryListSubId:LOACKURL +'goods/getCategoryListSubId', //子类信息
}

module.exports = URL