<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像区域-->
            <div class="img_box"><img src="../assets/logo.png" alt=""></div>
            <!--表单区域-->
            <el-form ref="loginform" :model="formdata" class="login-form" :rules="loginformrule">
                <el-form-item prop="username">
                    <el-input  v-model="formdata.username" prefix-icon="iconfont iconuser"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input  type="password" v-model="formdata.password" prefix-icon="iconfont iconmima"></el-input>
                </el-form-item>
                <el-form-item class="login-btn-box">
                    <el-button type="primary" @click="loginok">登录</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      },
      loginformrule: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 8, max: 14, message: '最少需要8个字符，最长不超过14个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginok () {
      this.$refs.loginform.validate(async val => {
        if (val) {
          const data = await this.$http.post('login', this.formdata)
          console.log(data.data)
          if (data.data.status == 200) {
            window.sessionStorage.setItem('token', data.data.token)
            window.sessionStorage.setItem('username', this.formdata.username)
            this.$router.push('/Home')
          } else {
            return this.$message.error('用户名或密码错误!')
          }
        }
      })
    },
    reset () {
      this.$refs.loginform.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 4px;
    margin-left: 50%;
    transform: translate(-50%,50%);
}
.img_box{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    padding: 10px;
    margin-left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 10px #ddd;
    background: #fff;
    border-radius:50%;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
    }
}
.login-form {
    position: relative;
    top: -50px;
    padding: 0 20px;
}
.login-btn-box{
    display: flex;
    justify-content: flex-end;
}
</style>
