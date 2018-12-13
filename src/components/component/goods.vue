<template>
    <div>
        <div>
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onclickLeft"
            />
        </div>
        <div>
            <img :src="goodsInfo.IMAGE1" alt="卖完了" width="100%">
        </div>
        <div>{{goodsInfo.NAME}}</div>
        <div>价格：￥{{goodsInfo.PRESENT_PRICE }}</div>
        <div class="tabs">
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL">
                    </div> 
                </van-tab>
                <van-tab title="评论">
                    非常6+1
                </van-tab>
            </van-tabs>
        </div>
        <div class="btn-bottom">
            <div><van-button type="danger" size="large" @click="onclickCart">购物车</van-button></div>
            <div><van-button type="primary" size="large">购买</van-button></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/API.config.js'
import { Toast } from 'vant'
    export default {
        data() {
            return {
                goodsId:'',
                goodsInfo:{},
            }
        },
        created() {
            this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId//接受热卖商品Id
            console.log(this.goodsId)
            this.getInfo()
        },
        
        methods: {
            getInfo() {
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                })
                .then(response=>{
                    console.log(response)
                    this.goodsInfo = response.data.message
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            onclickLeft(){
                this.$router.go(-1)
            },
            onclickCart(){
               //localStorage.removeItem('cartInfo')

                //从localStorage取值，无则返回空数组
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [] 
                // cartinfo数组中的goodsId与data中的goodsId进行对比 有则返回第一个数组，无则返回undifend
                let isHaveGoods = cartInfo.find(cart => cart.cartGoodsId == this.goodsId) 
                console.log(isHaveGoods) 
                console.log(this.goodsInfo) 

                // 没有商品时直接添加到购物车数组中 
                if(!isHaveGoods){

                    //给购物车赋值
                    let newGoodsInfo = {
                        cartGoodsId : this.goodsInfo.ID,
                        cartName : this.goodsInfo.NAME,
                        cartPrice : this.goodsInfo.PRESENT_PRICE,
                        cartImage : this.goodsInfo.IMAGE1,
                        count : 1
                    }
                    cartInfo.push(newGoodsInfo) //添加购物车
                    localStorage.cartInfo = JSON.stringify(cartInfo) //购物车数据保存本地，操作本地数据
                    Toast.success('添加成功')
                }else{
                    Toast.success('已有商品')
                }

                this.$router.push({name:'Cart'}) //跳转购物车页面
            }
            
        },
    }
</script>

<style scoped>
    .detail{
        font-size: 0;
    }
    .btn-bottom{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 20rem;
    }
    .btn-bottom >div{
        flex: 1;
        padding:0px 3px;
    }
    .categoryActive{
        background-color:#fff;
    }
</style>