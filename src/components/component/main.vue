<template>
    <div>
        <div class="main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <div>
            <van-tabbar v-model="active" @change="change(active)">
                <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
                <van-tabbar-item icon="shop">商品页</van-tabbar-item>
                <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
                <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
            }
        },
        created() {
            this.caetActive()
        },
        updated() {
            this.caetActive() // tabbar添加购物车 跳转对应的底部导航
        },
        methods: {
            caetActive(){
                if(this.$route.path == "/cart"){
                    this.active = 2
                }
            },
            change(active) {
                if(active == 0){
                    this.$router.push({name:'ShoppingMall'})
                }
                else if(active==1){
                    this.$router.push({name:'caregoryList'})
                }else if(active == 2){
                    this.$router.push({name:'Cart'})
                }else if(active==3){
                    this.$router.push({name:'Vip'})
                }
            }
        },
    }
</script>

<style scoped>

</style>