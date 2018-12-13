<template>
    <div>
        <div>
          <van-nav-bar title="购物车"/>
        </div>
         <div class="cart-clear"> 
            <van-button size="small" type="danger" @click="clearCart" class="btn">
                清空购物车
            </van-button>
        </div>
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="cart-image">
                    <img :src="item.cartImage" alt="" width="100%">
                </div>
                <div class="cart-text">
                    <div class="cart-name">{{item.cartName}}</div>
                    <div class="cart-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="cart-price">
                    <div>
                        ￥{{item.count*item.cartPrice | toMoney}}
                    </div>
                </div>
               
            </div>
             <!-- 商品总价 -->
            <div class="cart-money">
                总价：{{totalMoney | toMoney}}
            </div>
        </div>
        
       
    </div>
</template>

<script>
    import {Money} from '@/filter.js'
    export default {
        data() {
            return {
                cartInfo:[],   //购物车中的商品
                flag:false     //判断购物车是否有值，有值设置为true
            }
        },
        filters:{
            toMoney(price){
                return Money(price)
            }
        },
        created() {
            this.getCartInfo()
        },
        methods: {
                // 得到购物车的商品
            getCartInfo() {
                //判断购物车是否有值
                if (localStorage.cartInfo){
                //有数据赋值给数组cartinfo
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                console.log(JSON.stringify(this.cartInfo))
                this.flag = this.cartInfo.length>0 ? true : false
            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo = []
            }
        },
        computed:{
            totalMoney(){
                let allMoney = 0
                this.cartInfo.forEach((item,index) => {
                allMoney += item.cartPrice*item.count
                });
                localStorage.cartInfo=JSON.stringify(this.cartInfo)
                return allMoney
            }
        }
    }
</script>

<style scoped>
    .cart-clear{
        background-color:beige;
        text-align: right;
        padding: 5px;
        margin: auto;
    }
    .cart-list{
        background:#fff;
    }
    .cart-row{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border-bottom: 1px solid #eee;
    }
    .cart-image{
        flex:6;
    }
    .cart-text{
        flex:14;
        text-align: center;
        margin:auto auto;
    }
    .cart-price{
        flex:4;
        text-align: center;
        margin:auto auto;
        color:red;
    }
    .cart-money{
        padding:4px;
        text-align: right;
        color:orangered;
    }
</style>