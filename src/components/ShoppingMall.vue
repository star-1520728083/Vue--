<template>
    <div>
        <div  class="search-bar">
        <van-row gutter="5">
            <van-col span="4" style="height:2.2rem;">
                <img :src="loactionImg" alt="" class="loaction-icon">
            </van-col>
            <van-col span="16">
                <input type="text" class="search-input">
            </van-col>
            <van-col span="4">
                <van-button type="primary" class="btn" size="mini">查找</van-button>
            </van-col>
        </van-row>
        </div>
        <!--swipwer area-->
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner,index) in slides" :key="index">
                    <img  v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- list-bar -->
        <div class="list-bar">
            <div v-for="(item,index) in category" :key="index">
                <img v-lazy="item.image" alt="" width="100%">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>
        <!-- banner area -->
        <div>
            <img v-lazy="adBanner.PICTURE_ADDRESS" alt="图片加载未完成" width="100%">
        </div>
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item , index) in recommendGoods" :key="index" class="swiper-slide">
                        <div class="recommend-item">
                            <div class="img-item"><img :src="item.image" alt="" width="100%"></div>
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!-- hot area -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20"> 
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                           <goodsInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper,swiperSlide } from 'vue-awesome-swiper' 
import floorComponent from './component/floorComponent'
import goodsInfo from './component/goodsInfoComponent'
import url from '@/API.config.js'


    export default {
    data () {
        return {
            swiperOption:{
                slidesPerView:3,
                loop:true
            },
            loactionImg:require('../assets/imgs/loaction.png'),
            bannerPicArray:[
            {imageUrl:'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg'},
            {imageUrl:'https://img.yzcdn.cn/'},
            {imageUrl:'https://img.yzcdn.cn/'},
            ],
            slides:[],
            category:[],
            adBanner:"",
            recommendGoods:[],
            floor1:[],
            floor2:[],
            floor3:[],
            floorName:{},
            hotGoods:[]
        }
    },
    filters:{
            moneyFilter:function(money){
                return money.toFixed(2)
            }
    },
    components:{swiper , swiperSlide,floorComponent,goodsInfo},
    created() {
        axios({
            url:url.getShoppingMallInfo,
            method:'get',
        })
        .then(response => {
            console.log(response)
            this.slides = response.data.data.slides,  //轮播图
            this.category = response.data.data.category,  //菜单选项
            this.adBanner = response.data.data.advertesPicture  //广告横幅
            this.recommendGoods = response.data.data.recommend  //推荐商品
            this.floor1 = response.data.data.floor1 //获取楼层数据1
            this.floor2 = response.data.data.floor2 //获取楼层数据2
            this.floor3 = response.data.data.floor3 //获取楼层数据3
            this.floorName = response.data.data.floorName //楼层名字
            this.hotGoods = response.data.data.hotGoods //热卖商品
        })
        .catch(error =>{
            console.log(error)
        })
    },
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        line-height: 2.2rem;
        background-color: #e5017d;
    }
    .loaction-icon{
        height: 60%;
        width: 50%;
        padding-left:0.5rem;
        padding-top:0.5rem;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        border:none;
        border-bottom: 1px solid !important;
        background: #e5017d;
        color:#fff;
    }
    .btn{
        line-height: 1.2rem;
        height: 1.2rem;
        width: 2.2rem;
        margin-left: 0.5rem;
        font-size:0.5rem;
    }
    .swiper-area{
        width: 20rem;
        max-height: 13rem;
        clear: both;
        overflow: hidden;
    }
    .list-bar{
        background-color: #fff;
        margin:0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size:14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .list-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
      width: 4rem;
    }
     .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
    }
    .recommend-title{
        border-bottom:1px solid #eee;
        font-size:14px;
        padding:.2rem;
        color:#e5017d;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }
    .img-item{
        height: 7rem;
    }
    .swiper-slide{
    height:10rem;
    text-align: center;
    border-bottom: 1px solid #ccc;
   }
    .hot-title{
        text-align: center;
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
    }
</style>