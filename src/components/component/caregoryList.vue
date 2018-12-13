<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="类别列表"
            />
            <div>
                <van-row>
                    <van-col span="6">
                        <div id="left-nav">
                            <ul>
                                <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in navLeftList" :key="index">{{item.MALL_CATEGORY_NAME}}</li>
                            </ul>
                        </div>
                    </van-col>
                    <van-col span="18">
                        <div class="tabCategorySub">
                            <van-tabs v-model="active" @click="onclickSubList"> 
                                <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                                    
                                </van-tab>
                            </van-tabs>
                        </div>
                        <div id="list-div">
                            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                                <van-list v-model="loading" :finished="finished" @load="onLoad">
                                    <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodlist" :key="index"> 
                                       <div class="item-img">
                                           <img :src="item.IMAGE1" alt="" width="100%" :onerror="errorimg">
                                       </div>
                                       <div class="item-text">
                                           <div>{{item.NAME}}</div>
                                           <div>{{item.PRESENT_PRICE | toMoney}}</div>
                                       </div>
                                    </div>
                                </van-list>
                            </van-pull-refresh>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/API.config.js'
    import {Money} from '@/filter.js'
import { Toast, List } from 'vant';
    export default {
        data() {
            return {
                navLeftList:[],
                categoryIndex:0,
                categorySub:[],
                active:0,
                loading:false,  
                finished:false, //上拉加载是否有数据
                isRefresh:false, //下拉加载
                page:1, //页数
                goodlist:[], //商品列表
                categorySubId:'',  //商品子类信息Id
                errorimg:'this.src=" ' +require('@/assets/imgs/errorimg.png')+'"' //错误图片显示路径
            }
        },
        created() {
            this.getCategory()
        },
        mounted() {
            document.getElementById('left-nav').style.height=document.documentElement.clientHeight -46-50 +'px'
            document.getElementById('list-div').style.height=document.documentElement.clientHeight -90-50 +'px'
        },
        filters:{
            toMoney(price){
                return Money(price)
            }
        },
        methods: {
            getCategory() {
                axios({
                    url:url.getCategoryList,
                    method:'get'
                }).then(response => {
                    this.navLeftList = response.data.message
                    if(response.data.code ==200 && response.data.message){
                        this.getCategorySubByCategoryId(this.navLeftList[0].ID)
                        console.log(response)
                    }else{
                        Toast('数据错误请检查')
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            //css大类颜色改变效果
            clickCategory(index,categoryId){
                this.categoryIndex = index
                this.page=1
                this.finished = false
                this.goodlist=[]
                this.getCategorySubByCategoryId(categoryId)
                
            },
            //根据大类读取小类的方法
            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategoryListSub,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(response =>{
                    console.log(response)
                    if(response.data.code==200 && response.data.message){
                        this.categorySub = response.data.message
                        this.active=0
                        this.categorySubId = this.categorySub[0].ID
                        this.onLoad()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            onLoad(){
                setTimeout(()=>{
                    this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodsList()
               },1000)
            },
            //获取商品列表的方法
            getGoodsList(){
                axios({
                    url:url.getCategoryListSubId,
                    method:'post',
                    data:{
                        page:this.page,
                        categorySubId:this.categorySubId
                    }
                }).then(response=>{
                    if(response.data.code==200&&response.data.message.length){
                        this.page ++
                        this.goodlist=this.goodlist.concat(response.data.message)
                    }else{
                        this.finished = true
                    }
                    this.loading =false
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //下拉刷新
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished=false;
                    this.goodlist = []
                    this.page =1
                    this.onLoad()
                }, 500);
            },
            //点击小类信息获取子类信息
            onclickSubList(index){
                this.categorySubId = this.categorySub[index].ID
                console.log(this.categorySubId)
                this.goodlist=[]
                this.finished = false
                this.page=1
                this.onLoad()
            },
            //跳转详情页
            goGoodsInfo(id){
                this.$router.push({name:'Goods',params:{goodsId:id}})
            }
        },
    }
</script>

<style scoped>
    #left-nav{
        background-color:rgb(245, 236, 236);
    }
    #left-nav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
    }
    .categoryActive{
        background:#fff;
    }
    .list-item{
        height: 124px;
        text-align: center;
        border-bottom: 1px solid #CCC;
        background-color: #fff;
        display: flex;
        flex-direction: row;
    }
    #list-div{
        overflow: scroll;
    }
    .item-img{
        flex:5;
        border-right: 1px solid #ccc;
    }
    .item-img img{
        width: 100%;
        height: 100%;
    }
    .item-text{
        flex:5;
        font-size: 14px;
        line-height: 24px;
        margin-top: 24px;
    }
</style>