<template>
    <div class="usercontainer">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input v-model="queryinfo.query" clearable @clear="clearserch">
                    <el-button slot="append" icon="el-icon-search" @click="serchuser"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="Openadd">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userlist" style="width: 100%; margin-top: 15px" stripe border>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="userid.username" label="姓名"></el-table-column>
                <el-table-column prop="userid.email" label="邮箱"></el-table-column>
                <el-table-column prop="userid.mobile" label="手机号"></el-table-column>
                <el-table-column prop="roleid.rolename" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch :disabled="switchbool" v-model="scope.row.userid.isword" @change="changestatus(scope.row.userid)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="Openedit(scope.row.userid.username)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click='Deleteuser(scope.row.userid.username)'></el-button>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="openrole(scope.row.userid.username)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryinfo.pagenum"
                    :page-sizes="[1, 2, 3, 4]"
                    :page-size="queryinfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
            <el-dialog
                    title="添加用户"
                    :visible.sync="dialogVisible"
                    width="600px"
                    :before-close="handleClose">
                <el-form :model="addform" :rules="addformrules" ref="addformref" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addform.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addform.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addform.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="addform.mobile"></el-input>
                    </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="ClosedialogVisible">取 消</el-button>
                <el-button type="primary" @click="TruedialogVisible">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="修改用户" :visible.sync="dialogVisibleedit" width="600px" :before-close="handleCloseedit">
                <el-form :model="editform" :rules="addformrules" ref="editformref" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="editform.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editform.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="editform.mobile"></el-input>
                    </el-form-item>
                </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="ClosedialogVisibleeit">取 消</el-button>
    <el-button type="primary" @click="TruedialogVisibleedit">确 定</el-button>
  </span>
            </el-dialog>
            <el-dialog title="分配角色" :visible.sync="dialogVisiblerole" width="600px" :before-close="handleCloserole">
            <div class="settingrole">
                <p>当前的用户：{{userinfo.username}}</p>
                <p>当前的角色：{{userinfo.rolename}}</p>
                <p>分配新角色：<el-select v-model="selectval"  clearable placeholder="请选择">
                    <el-option
                            v-for="item in rolelist"
                            :key="item.rolename"
                            :label="item.rolename"
                            :value="item.rolename+' '+item._id">
                    </el-option>
                </el-select></p>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="ClosedialogVisiblerole">取 消</el-button>
            <el-button type="primary" @click="TruedialogVisiblerole">确 定</el-button>
  </span>
            </el-dialog>
        </el-card>

    </div>
</template>
<script>
export default {
  created () {
    this.getuserlist()
  },
  data () {
    var checkeamil = function (rules, value, cb) {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (reg.test(value)) {
        return cb()
      } else {
        cb(new Error('邮箱格式不正确！'))
      }
    }
    var checkemobile = function (rules, value, cb) {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value)) {
        return cb()
      } else {
        cb(new Error('手机号格式不正确！'))
      }
    }
    return {
        switchbool:false,
      userlist: [],
      queryinfo: {
        query: '',
        pagesize: 2,
        pagenum: 1
      },
      total: 0,
      dialogVisible: false,
      dialogVisibleedit: false,
      dialogVisiblerole: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editform: {
        username: '',
        email: '',
        mobile: ''
      },
      addformrules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { max: 20, min: 2, message: '最长不能超过20字符，最短不能小于2个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { max: 20, min: 8, message: '最长不能超过20字符，最短不能小于8个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: checkeamil, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkemobile, trigger: 'blur' }
        ]
      },
      userinfo: '',
      rolelist: [],
      selectval: ''
    }
  },
  methods: {
    async getuserlist () {
//    判断有没有修改用户权限，如果没有就把开关禁用
    const {data:myres}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'修改用户状态'})
    if(myres.status=='201')
    {
        this.switchbool=true
    }
    else if(myres.status=='204')
    {
        return this.$message.error("登录过期，请重新登录...")
    }
//    判断是否用户列表权限
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'用户列表'})
    if(reslist.status=='200')
    {
        const { data: res } = await this.$http.post('/GetUserlist ', JSON.stringify(this.queryinfo))
        if(res.status=='200')
        {
            this.userlist = res.data
            this.total = res.total
        }
    }
    else if(reslist.status=='201')
    {
        this.$router.push('/Login')
        return this.$message.error("您当前没有用户列表界面权限，如需请联系管理员")
    }

    },
    handleSizeChange (newsize) {
      this.queryinfo.pagesize = newsize
      this.getuserlist()
    },
    handleCurrentChange (size) {
      this.queryinfo.pagenum = size
      this.getuserlist()
    },
    async changestatus (val) {
            const { data: res } = await this.$http.post('/ChangeStatus', JSON.stringify(val))
            if (res.status == '200')
            {
                return this.$message.success('修改状态成功')
            }
            else if (res.status == '201')
            {
                return this.$message.warning('修改状态失败')
            }
    },
    serchuser () {
      this.queryinfo.pagenum = 1
      this.queryinfo.pagesize = 2
      this.getuserlist()
    },
    clearserch () {
      this.queryinfo.pagenum = 1
      this.queryinfo.pagesize = 2
      this.getuserlist()
      console.log(this.queryinfo)
    },
    handleClose () {
      this.dialogVisible = false
    },
    Openadd () {
      this.dialogVisible = true
    },
    ClosedialogVisible () {
      this.$refs.addformref.resetFields()
      this.dialogVisible = false
    },
    TruedialogVisible () {
      this.$refs.addformref.validate(async (val) => {
        if (val) {
            const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'添加用户'})
            if(reslist.status=='200')
            {
                var { data: res } = await this.$http.post('/Adduser', this.addform)
                if (res.status == '200') {
                    this.dialogVisible = false
                    this.getuserlist()
                    this.$refs.addformref.resetFields()
                    return this.$message.success('用户添加成功！')
                } else if (res.status == '201') {
                    return this.$message.success('用户添加失败！')
                } else if (res.status == '202') {
                    return this.$message.success('此用户名已存在，请重新输入')
                }
            }
            else if(reslist.status=='201')
            {
                return this.$message.warning('您当前没有添加用户权限，如需请联系管理员')
            }
            else
            {
                return this.$message.error("登录过期，请重新登录...")
            }
          }

      })
    },
    handleCloseedit () {
      this.dialogVisibleedit = false
      this.$refs.editformref.resetFields()
    },
    ClosedialogVisibleeit () {
      this.dialogVisibleedit = false
      this.$refs.editformref.resetFields()
    },
    TruedialogVisibleedit () {
      this.$refs.editformref.validate(async val => {
        if (val) {
            const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'修改用户'})
            if(reslist.status=='200')
            {
                this.dialogVisibleedit = false
                var { data: res } = await this.$http.post('/Updateuserinfo', this.editform)
                if (res.status == '200')
                {
                    this.getuserlist()
                    return this.$message.success('修改成功')
                }
                else if (res.status == '201')
                {
                    return this.$message.warning('修改失败')
                }
            }
            else if(reslist.status=='201')
            {
                return this.$message.error("您当前没有修改用户权限，如需请联系管理员")
            }
            else
            {
                return this.$message.error("登录过期，请重新登录...")
            }

        }
      })
    },
    async Openedit (index) {
    this.dialogVisibleedit = true
      var { data: res } = await this.$http.post('/Getuserinfo', { userid: index })
      if (res.status == 200)
      {
        this.editform.username = res.data.username
        this.editform.email = res.data.email
        this.editform.mobile = res.data.mobile
      }
      else if (res.status = 201)
      {
        return this.$message.error('接口异常')
      }
      else if (res.status == 204)
      {
        return this.$message.warning('登录过期,请重新登录...')
      }
    },
    async Deleteuser (index) {
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'删除用户'})
    if(reslist.status=='200')
    {
        const result = await this.$confirm('本次操作将会永久删除此用户，是否继续操作？', '提示', {}).catch(function(err){
        console.log(err)
    })
        if (result == 'confirm') {
            const { data: res } = await this.$http.post('/Deleteuser', { username: index })
            if (res.status == '200')
            {
                this.queryinfo.pagenum=1
                this.getuserlist()
                return this.$message.success('删除用户成功')
            }
            else if (res.status == '201')
            {
                return this.$message.success('删除用户失败')
            }
        }
    }
    else if(reslist.status=='201')
    {
        return this.$message.warning('您当前没有删除用户权限，如需请联系管理员')
    }
    else
    {
        return this.$message.success('登录过期，请重新登录...')
    }
    },
    handleCloserole () {
      this.dialogVisiblerole = false
    },
    ClosedialogVisiblerole () {
      this.dialogVisiblerole = false
    },
    async openrole (id) {
      console.log('id', id)
      this.dialogVisiblerole = true
      const { data: res } = await this.$http.post('/GetPermission', JSON.stringify(id))
      const { data: rolelist } = await this.$http.post('/Getrolelist',{pagenum:1,pagesize:5})
      if(res.status=='200' && rolelist.status=='200')
      {
          this.userinfo = res.data
          this.rolelist = rolelist.data
      }
      else
      {
          return this.$message.success('登录过期，请重新登录...')
      }
    },
    async TruedialogVisiblerole () {
      console.log('username', this.userinfo.username)
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'分配角色'})
    if(reslist.status=='200')
    {
        const updateresult = await this.$http.post('/Updateuser', { username: this.userinfo.username, rolename: this.selectval })
        if (updateresult.status == '200')
        {
            this.getuserlist()
            this.dialogVisiblerole = false
            return this.$message.success('分配角色成功！')
        }
        else if (updateresult.status == '201')
        {
            return this.$message.error('分配角色失败！')
        }
    }
    else if(reslist.status=='201')
    {
        return this.$message.error('您当前没有分配角色权限，如需请联系管理员')
    }
    else
    {
        return this.$message.warning('登录过期，请重新登录...')
    }
    }

  }
}

</script>
<style lang="less" scoped>
    .usercontainer
    {
        width: 100%;
        height: calc(100vh - 60px);
        overflow: auto;
        padding: 20px;
    }
    .settingrole p
    {
        margin-bottom: 10px;
    }
    .el-breadcrumb {
        min-width: 800px;
        margin-bottom: 15px;
        font-size: 14px;
    }
    .el-card {
        min-width: 800px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) !important;
    }
    .el-row{
        display: flex;
        align-items: flex-end;
    }
    .el-pagination{
        margin-top: 15px;
    }
</style>
