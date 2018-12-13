<template>
    <div>
       <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
       />
       <div class="register-panel">
           <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            :error-message="usernameMessage"
            @click-icon="username = ''"
           />
           <van-field
            label="密码"
            icon="clear"
            type="password"
            v-model="password"
            :error-message="passwordMessage"
            placeholder="请输入密码"
            @click-icon="password=''"
           />
           <div class="register-button">
               <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">
               马上注册
               </van-button>
           </div>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/API.config.js'
import {Toast} from 'vant'
    export default {
        data() {
            return {
               username:'',
               password:'',
               openLoading:false,  //是否开启用户的loading
               usernameMessage:'',//用户名注册时提示信息
               passwordMessage:'',//密码出错时信息
            }
        },
        methods:{
            goBack(){
                return this.$router.go(-1)
            },
            registerAction(){
                this.checkForm() && this.axiosRegisterUser()
            },
            //表单验证
            checkForm(){
                let isOK = true
                if(this.username.length<5){
                    this.usernameMessage = '用户名不能少于5'
                    isOK =false
                }else{
                    this.usernameMessage = ''
                }
                if(this.password.length<6 ){
                    this.passwordMessage='密码不能少于5位' 
                    isOK =false
                }
                return isOK
            },
            axiosRegisterUser(){
                this.openLoading=true;
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response => {
                    console.log(response)
                    //如过code为200，代表注册成功，我们给用户做Toast提示
                    if(response.data.code == 200){
                        Toast.success('注册成功')
                        this.$router.push('/')
                    }else{
                        console.log(response.data.message)
                        Toast.fail('注册失败,用户名已经存在')
                        this.openLoading=false
                    }
                })
                .catch(error => {
                    Toast.fail('注册失败')
                    console.log(error)
                    this.openLoading=false
                })
            }
        }
    }
</script>

<style scopeed>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>