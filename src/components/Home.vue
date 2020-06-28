<template>
    <el-container class="home-container">
        <!--主页头部区域-->
        <el-header>
            <div class="header-div">
                <i class="iconfont iconlogo_github mylogo"></i>
                <span>电子书后台管理系统</span>
            </div>
              <el-dropdown>
              <span class="el-dropdown-link">
                <i class="iconfont iconyonghu1" style="color: wheat;font-size: 32px;"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>用户: {{loginname}}</el-dropdown-item>
                    <el-dropdown-item style="text-align: center"><span @click="loginout">退出</span></el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <!--主页菜单栏区域-->
        <el-container>
            <el-aside width="asidewidth">
                <div class="toggle-botton" @click="togglecollapse" :style="{width: asidewidth}">|||</div>
                <el-menu background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409eff" unique-opened :collapse="iscollapse" :collapse-transition="false" router :default-active="index">
                    <el-submenu :index="item.authnname" v-for="item,index in datalist" :key="item.authnname">
                        <template slot="title">
                            <i :class="iconlist[index]" style="padding-right: 10px"></i>
                            <span>{{item.authnname}}</span>
                        </template>
                        <el-menu-item :index="items.path" v-for="items in item.children" :key="items.authnname" @click="saveindex(items.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{items.authnname}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>

</template>
<script>
export default {
  data () {
    return {
      datalist: [],
      loginname: '',
      iconlist: {
        0: 'iconfont iconuser-group',
        1: 'iconfont iconquanxian',
        2: 'iconfont iconmanage-the-return-of-books font18px',
        3: 'iconfont iconyuedu font13px',
        4: 'iconfont iconxieboke'
      },
      iscollapse: false,
      asidewidth: '200px',
      index: '/Booklist'
    }
  },
  created () {
    this.getdata()
    const index = window.sessionStorage.getItem('currenindex')
    if(index)
    {
        this.index=index
    }
    this.loginname = window.sessionStorage.getItem('username')
  },
  methods: {
    async getdata () {
      var result = await this.$http.post('/GetPermission', JSON.stringify(window.sessionStorage.getItem('username')))
      if (result.data.status == '200') {
        this.datalist = result.data.data.roleid.levelone
      } else if (result.data.status == '201') {
        return this.$message.warning('后台服务异常，请检查...')
      }
//      else {
//        return this.$message.warning('登录过期，请重新登录...')
//      }
    },
    loginout () {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
    togglecollapse () {
      this.iscollapse = !this.iscollapse
      if (this.iscollapse) {
        this.asidewidth = '64px'
      } else {
        this.asidewidth = '200px'
      }
    },
    saveindex (index) {
      window.sessionStorage.setItem('currenindex', index)
    }

  }
}
</script>
<style lang="less" scoped>
.font13px
{
    font-size: 13px;
    padding-right: 13px!important;
}
.font18px
{
    position: relative;
    left: -2px;
    font-size: 18px;
    padding-right: 8px!important;
}
.el-header{
    display: flex;
    color: white;
    font-size: 25px;
    font-family: 'STKaiti';
    justify-content: space-between;
    align-items: center;
    background: #373d41;
}
.el-aside{
    background: #333744;
}
.el-main{
    padding: 0!important;
    background: #eaedf1;
}
.home-container{
    width: 100%;
    height: 100%;
}
.header-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.mylogo{
    font-size: 60px;
    color: rgba(255, 255, 255, 0.29);
}
.logout{
    height: 40px;
}
.el-menu{
    border: 0;
}
.toggle-botton{
    background: #4a5046;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: white;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
