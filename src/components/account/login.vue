<template>
      <div>
      <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model="user_name" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input @click='login' id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    // 按需导入
    import {bus} from '../../common/commonvue.js'

    export default {
        data(){
            return {
                user_name: '',
                password: ''
            }
        },
        methods: {
            login(){
                this.$axios.post('site/account/login',{user_name: this.user_name,password: this.password}).then(res=>{
                    // console.log(res.data);
                    // 1、登录成功之后，跳转到想要去的页面
                    if(res.data.status === 0){
                        this.$message({
                            message: '登录成功！！！',
                            type: 'success',
                            duration: 900
                        });

                        this.$router.push({path: localStorage.getItem('wantVisitPage')})

                        // 2.发送信息给App.vue, 我登录成功了
                        bus.$emit('loginSuccess',true)
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: '用户名或密码错误，请重新输入',
                            type: 'error'
                        });
                    }
                })
                    
            }
        }
    }
</script>
