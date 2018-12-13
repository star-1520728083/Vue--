<template>
    <div>
        <div>
            <van-nav-bar title="会员中心"/>
        </div>
        <div class="vip-img">
            <div class="img">
                <img src="../../assets/logo.png" alt="">
            </div>
        </div>
        <div class="btn">
            <div>
                 <van-button type="primary">我要登录</van-button>
            </div>
            <div>
                <van-button type="danger">我要注册</van-button>
            </div>
        </div>
        <div class="list">
            <ul>
                <li>会员卡</li>
                <li>地址管理</li>
                <li>我的订单</li>
                <li>会员权益</li>
                <li>联系我们</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .vip-img{
        background: #eee;
    }
    .img{
        background:pink;
        margin:auto auto;
        height: 100px;
        width: 100px;
        text-align: center;
        border-radius:50px;
    }
    .vip-img img{
        height: 100%;
        width: 100%;
        border-radius:50px;
    }
    .btn{
        background:#fff;
        display: flex;
        text-align: center;
        padding-top:20px;
    }
    .btn div{
        flex: 1;
    }
    .list{
        color:blueviolet;
        background: #fff;
        padding-left:10px;
    }
    .list li {
        border-bottom:1px solid #eee;
        margin:5px;
    }
</style>