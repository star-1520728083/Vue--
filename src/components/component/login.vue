<template>
    <div>
       <van-nav-bar
        title="登录"
        left-text="返回"
        left-arrow
        @click-left="goBack"
       />
       <div class="login-panel">
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
           <div class="login-button">
               <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">
               登录
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
        created() {
            if(localStorage.userInfo){
                Toast.success('已经登录过了')
                this.$router.push('/')
            }
        },
        methods:{
            goBack(){
                return this.$router.go(-1)
            },
            registerAction(){
                this.checkForm() && this.axiosLoginUser()
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
                if(this.password.length<5 ){
                    this.passwordMessage='密码不能少于五位' 
                    isOK =false
                }
                return isOK
            },
            axiosLoginUser(){
                this.openLoading=true;
                axios({
                    url:url.login,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response => {
                    console.log(response)
                    //如过code为200，我们给用户做Toast提示
                    if(response.data.code == 200 && response.data.message == true){
                       new Promise((resolve,reject)=>{
                            localStorage.userInfo={userName:this.username}
                            setTimeout(()=>{
                                resolve()
                            },500)
                        }).then(()=>{
                                Toast.success('登录成功')
                                this.$router.push('/')
                        }).catch(err=>{
                                Toast.fail('登录状态保存失败')
                                console.log(err)
                        })
                    }else{
                        Toast.fail('登录失败,用户名不存在')                        
                        this.openLoading=false
                    }
                })
                .catch(error => {
                    console.log(error)
                    Toast.fail('登录失败')
                    this.openLoading=false
                })
                
            }
            
        }
    }
</script>

<style scopeed>
    .login-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .login-button{
        padding-top:10px;
    }
</style>