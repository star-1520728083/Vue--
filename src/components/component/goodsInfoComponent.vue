<template>
    <div class="goods-info" @click="GoGoodsPage">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="100%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | filtersPrice}}</div>
    </div>
</template>

<script>
    export default {
        props:['goodsImage' , 'goodsName' ,'goodsPrice','goodsId'],
        filters:{
            filtersPrice:(price) => {
                return price.toFixed(2)
            }
        },
        methods:{
            GoGoodsPage(){
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
        }
    }
</script>

<style scoped>
    .goods-name{
       padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>