<template>
  <div class="login">
    <LoginHeader>
        <el-form
            slot="container"
            :rules="rules"
            :model="ruleForm"
            ref="ruleForm"
        >
            <div class="title">
                <h3>账号密码登录</h3>
            </div>
            <!-- username -->
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
                    <i slot="prefix" class="fa fa-user-o"></i>
                </el-input>
            </el-form-item>

            <!-- password -->
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码">
                    <i slot="prefix" class="fa fa-lock"></i>
                </el-input>
            </el-form-item>

            <!-- 登陆button -->
            <el-form-item>
                <el-button
                    :loading="isLogin"
                    @click.native.prevent='handleSubmit'
                    type="primary"
                    style="width:100%;"
                >
                    登陆
                </el-button>
            </el-form-item>
        </el-form>
    </LoginHeader>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginHeader from './LoginHeader.vue' 
import {login} from '@/api/user'

export default {
  name: 'login',
  components: {
    LoginHeader
  },
  data(){
      return {
          isLogin:false,
          ruleForm:{
              username:'admin',
              password:'123',
              autoLogin:true
          },
          rules:{
                username: [{ required: true, message: "请输入账号", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
          }
      }
  },
  methods:{
      handleSubmit(){
          this.$refs['ruleForm'].validate((valid)=>{
              if(valid){
                this.isLogin=true;
                login(this.ruleForm).then((res)=>{
                    if(res.data.code==1){
                        let token = res.data.token;
                        localStorage.setItem('tsToken',token);
                        this.$store.dispatch('setUser',token);//setUser(token)
                        this.$router.push('/');
                    }else{
                        this.$message({
                        message: res.data['msg'],
                        type: 'warning'
                        });  
                    }
                }).catch(err=>{
                    this.isLogin=false;
                })
              }
          })
      }
  }
}
</script>
<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>
