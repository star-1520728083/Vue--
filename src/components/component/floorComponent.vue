<template>
    <!-- floor area -->
    <div>
        <!-- 不规则图形 -->
        <div class="floorTitle">{{floorTitle}}</div>
        <div class="floor">
            <div class="floor-anomaly">
                <div class="floorone">
                    <img :src="floorData0.image" alt="" style="height:100%;width:100%">
                </div>
                <div class="floor-bottom"> 
                    <div class="floortwo">
                        <img :src="floorData1.image" alt="" style="height:100%;width:100%">
                    </div>
                    <div class="floorthree">
                        <img :src="floorData2.image" alt="" style="height:100%;width:100%">
                    </div>
                </div>
            </div>
        </div>
        <!-- 规则图片 -->
        <div class="floor-rule">
            <div v-for="(item,index) in floorData.slice(1)" :key="index">
                <img :src="item.image" alt="" width="100%">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        
        props:['floorData','floorTitle'],
        watch:{
            floorData:function(val){
                console.log(this.floorData)
                this.floorData0 = this.floorData[0]
                this.floorData1 = this.floorData[1]
                this.floorData2 = this.floorData[2]
            }
        }
    }
</script>

<style scoped>
   .floor-anomaly{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 20rem;
    }
    .floor-anomaly div{
        width: 10rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .floorone{
        border-right:1px solid #ddd;
        height: 10.375rem;
    }
    .floor-bottom{
        display: flex;
        flex-direction: column;
    }
    .floortwo{
        border-bottom: 1px solid #ddd;
        height: 5.1875rem;

    }
    .floorthree{
        height: 5.1875rem;
        
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width:20rem;
    }
    .floor-rule div{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        width: 10rem;
        height: 5.1875rem;
        border-top:1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right:1px solid #ddd;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .floorTitle{
        text-align: center;
        font-size:16px;
        height: 1.8rem;
        line-height: 1.8rem;
    }
</style>