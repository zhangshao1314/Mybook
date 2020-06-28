<template>
    <div class="Rolecontainer">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="min-width: 1100px;">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card style="min-width: 1100px;">
            <el-button type="primary" @click="addrole">添加角色</el-button>
            <el-table :data="Rolelist" stripe border>
                <el-table-column  type="expand" width="50px" align='center'>
                    <template slot-scope="scope">
                        <el-row  v-for="item,index in scope.row.levelone" :class="['xia','vcenter',index==0 ? 'top' :'']">
                            <el-col :span="5">
                                <el-tag>{{item.authnname}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row  v-for="item2,index2 in item.children" :class="[index2==0 ? '' : 'top','vcenter']">
                                    <el-col :span="6">
                                        <el-tag type="success">{{item2.authnname}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag type="warning" closable v-for="item3,index3 in item2.children"  @close="closetag(scope.row,scope.row.levelone,item2.authnname,item3.authnname,scope.row._id)">{{item3.authnname}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="序号" type="index" width="50px" align='center'></el-table-column>
                <el-table-column label="角色名" prop="rolename"></el-table-column>
                <el-table-column label="角色描述" prop="descrection"></el-table-column>
                <el-table-column label="操作"  width="300px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="openeditdialog(scope.row._id,scope.row.rolename,scope.row.descrection)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleterole(scope.row._id,scope.row.rolename)">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="showdialog(scope.row._id,scope.row.rolename)">分配权限</el-button>
                    </template>

                </el-table-column>
            </el-table>
            <el-dialog title="分配权限" :visible.sync="editdialog" width="600px" :before-close="handleCloseedit">
                <el-tree :data="Rights" :props="defaultProps" show-checkbox default-expand-all node-key="authnname"
                         :default-checked-keys="selectkey" ref="treeref"></el-tree>
            <span slot="footer" class="dialog-footer">
            <el-button @click="ClosedialogVisibleeit">取 消</el-button>
            <el-button type="primary" @click="TruedialogVisibleedit">确 定</el-button>
  </span>
            </el-dialog>
            <el-dialog title="添加角色" :visible.sync="dialogadd" width="600px" :before-close="handleCloseadd">
                <el-form :model="addinfo" :rules="addinforule" ref="addformred">
                    <el-form-item label="角色名" label-width="80px" prop="rolename">
                        <el-input v-model="addinfo.rolename"></el-input>
                    </el-form-item>
                    <el-form-item label="角色信息" label-width="80px" prop="rolemessage">
                        <el-input v-model="addinfo.rolemessage"></el-input>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="ClosedialogVisibleadd">取 消</el-button>
            <el-button type="primary" @click="TruedialogVisibleadd">确 定</el-button>
  </span>
            </el-dialog>
            <el-dialog title="编辑角色" :visible.sync="writedialog" width="600px" :before-close="closeeditroledialog">
                <el-form :model="editinfo" :rules="editinforule" ref="editformred">
                    <el-form-item label="角色名" label-width="80px" prop="editrolename">
                        <el-input v-model="editinfo.editrolename"></el-input>
                    </el-form-item>
                    <el-form-item label="角色信息" label-width="80px" prop="editrolemessage">
                        <el-input v-model="editinfo.editrolemessage"></el-input>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="CloseeditdialogVisible">取 消</el-button>
            <el-button type="primary" @click="TruedialogVisibleeditrole">确 定</el-button>
  </span>
            </el-dialog>
            <el-pagination
                    @size-change="RolesshandleSizeChange"
                    @current-change="RoleshandleCurrentChange"
                    :current-page="Rolesqueryinfo.pagenum"
                    :page-sizes="[1,5, 10, 20, 30]"
                    :page-size="Rolesqueryinfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="Rolestotal">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  created () {
    this.getrolelist()
  },
  data () {
    return {
        Rolestotal:0,
        Rolesqueryinfo:{
            pagenum:1,
            pagesize:5
        },
      Rolelist: [],
      editdialog: false,
      dialogadd: false,
      writedialog: false,
      Rights: [],
      defaultProps: {
        label: 'authnname',
        children: 'children'
      },
      selectkey: [],
      nowid: '',
      roleindex: 0,
      addinfo: {
        rolename: '',
        rolemessage: ''
      },
      editinfo: {
        id: '',
        editrolename: '',
        editrolemessage: ''
      },
      addinforule: {
        rolename: [{ required: true, message: '角色名不能为空', trigger: 'blur' }],
        rolemessage: [{ required: true, message: '角色信息不能为空', trigger: 'blur' },
          { max: 20, min: 5, message: '描述字符为5-20个字符', trigger: 'blur' }]
      },
      editinforule: {
        editrolename: [{ required: true, message: '角色名不能为空', trigger: 'blur' }],
        editrolemessage: [{ required: true, message: '角色信息不能为空', trigger: 'blur' },
          { max: 20, min: 5, message: '描述字符为5-20个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getrolelist() {

    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'角色列表'})
    if(reslist.status=='200')
    {
        const { data: res } = await this.$http.post('/Getrolelist',this.Rolesqueryinfo)
        if (res.status == '200') {
            this.Rolelist = res.data
            this.Rolestotal= res.total
            console.log(this.Rolelist)
        }
    }
    else if(reslist.status=='201')
    {
        this.$message.error("您当前没有角色列表权限，如需请联系管理员")
    }
    else
    {
        this.$message.error("登录过期，请重新登录...")
    }
    },
    async closetag (role, id, name2, name3, rolename) {
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'删除角色权限'})
    if(reslist.status=='200')
    {
        const { data: res } = await this.$http.post('/Deletepermission', { id: id, nametwo: name2, namethird: name3, rolename: rolename })
        if (res.status == '200')
        {
            this.getrolelist()
            return this.$message.success('删除权限成功')
        }
        else if (res.status == '201')
        {
            return this.$message.error('删除权限失败')
        }
    }
    else if(reslist.status=='201')
    {
        this.$message.error("您当前没有删除角色权限，如需请联系管理员")
    }
    else
    {
        this.$message.error("登录过期，请重新登录...")
    }
    },
    async showdialog (id,name) {
     if(name=='管理员')
     {
         if(window.sessionStorage.getItem('username')=='张光凯')
         {
             var { data: res } = await this.$http.post('/Getpermissionmorelist')
             if(res.status=='200')
             {
                 this.Rights = res.data[0].children
                 this.nowid = id
                 this.selectkey = []
                 for (var i = 0; i < this.Rolelist.length; i++) {
                     if (this.Rolelist[i]._id == id) {
                         for (var j = 0; j < this.Rolelist[i].levelone.length; j++) {
                             for (var c = 0; c < this.Rolelist[i].levelone[j].children.length; c++) {
                                 if (this.Rolelist[i].levelone[j].children[c].children.length == 0) {
                                     this.selectkey.push(this.Rolelist[i].levelone[j].children[c].authnname)
                                 } else {
                                     for (var d = 0; d < this.Rolelist[i].levelone[j].children[c].children.length; d++) {
                                         if (this.Rolelist[i].levelone[j].children[c].children[d].authnname) {
                                             this.selectkey.push(this.Rolelist[i].levelone[j].children[c].children[d].authnname)
                                         }
                                     }
                                 }
                             }
                         }
                     }
                 }
                 this.editdialog = true
             }
             else
             {
                 this.$message.error("登录过期，请重新登录...")
             }
         }
         else
         {
            return this.$message.warning("分配管理员权限只能由张光凯操作")
         }
     }
     else
     {
         var { data: res } = await this.$http.post('/Getpermissionmorelist')
         if(res.status=='200')
         {
             this.Rights = res.data[0].children
             this.nowid = id
             this.selectkey = []
             for (var i = 0; i < this.Rolelist.length; i++) {
                 if (this.Rolelist[i]._id == id) {
                     for (var j = 0; j < this.Rolelist[i].levelone.length; j++) {
                         for (var c = 0; c < this.Rolelist[i].levelone[j].children.length; c++) {
                             if (this.Rolelist[i].levelone[j].children[c].children.length == 0) {
                                 this.selectkey.push(this.Rolelist[i].levelone[j].children[c].authnname)
                             } else {
                                 for (var d = 0; d < this.Rolelist[i].levelone[j].children[c].children.length; d++) {
                                     if (this.Rolelist[i].levelone[j].children[c].children[d].authnname) {
                                         this.selectkey.push(this.Rolelist[i].levelone[j].children[c].children[d].authnname)
                                     }
                                 }
                             }
                         }
                     }
                 }
             }
             this.editdialog = true
         }
         else
         {
             this.$message.error("登录过期，请重新登录...")
         }
     }


    },
    handleCloseedit () {
      this.selectkey = []
      this.editdialog = false
    },
    ClosedialogVisibleeit () {
      this.editdialog = false
    },
    async TruedialogVisibleedit () {
      const result2 = this.$refs.treeref.getCheckedKeys()
      const result = this.$refs.treeref.getHalfCheckedKeys()
      for (var i = 0; i < result2.length; i++) {
        console.log(result2[i])
      }
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'分配权限'})
    if(reslist.status=='200')
    {
        const { data: res } = await this.$http.post('/Updatepermission', { data: result2, data2: result, id: this.nowid })
        if (res.status == '200')
        {
            this.getrolelist()
            this.editdialog = false
            return this.$message.success('分配权限成功')
        }
        else if (res.status == '201')
        {
            return this.$message.success('分配权限失败')
        }
    }
    else if(reslist.status=='201')
    {
        return this.$message.warning('您当前没有分配权限，如需请联系管理员')
    }
    else
    {
        this.$message.error("登录过期，请重新登录...")
    }

    },
    handleCloseadd () {
      this.dialogadd = false
      this.$refs.addformred.resetFields()
    },
    ClosedialogVisibleadd () {
      this.dialogadd = false
      this.$refs.addformred.resetFields()
    },
    TruedialogVisibleadd () {
      this.$refs.addformred.validate(async val => {
        if (val) {
            const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'添加角色'})
            if(reslist.status=='200')
            {
                const { data: res } = await this.$http.post('/Addrole', this.addinfo)
                if (res.status == '200')
                {
                    this.getrolelist()
                    this.dialogadd = false
                    this.$refs.addformred.resetFields()
                    return this.$message.success('添加角色成功')
                }
                else if (res.status == '201')
                {
                    return this.$message.success('添加角色失败')
                }
                else if (res.status == '202')
                {
                    return this.$message.success('此角色已存在')
                }
            }
            else if(reslist.status=='201')
            {
                return this.$message.success('您当前没有添加角色权限，如需请联系管理员')
            }
            else
            {
                this.$message.error("登录过期，请重新登录...")
            }


        }
      })
    },
    addrole () {
      this.dialogadd = true
    },
    closeeditroledialog () {
      this.writedialog = false
      this.$refs.editformred.resetFields()
      this.getrolelist()
    },
    CloseeditdialogVisible () {
      this.writedialog = false
      this.$refs.editformred.resetFields()
    },
    async openeditdialog (id, name, desc) {
    if(name!='管理员')
    {
        this.editinfo.editrolename = name
        this.editinfo.editrolemessage = desc
        this.editinfo.id = id
        this.writedialog = true
    }
    else
    {
        return this.$message.error('不能修改管理员信息')
    }

    },
    async TruedialogVisibleeditrole () {
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'修改角色'})
    if(reslist.status=='200')
    {
        const { data: res } = await this.$http.post('/Editroleinfo', this.editinfo)
        if (res.status == '200')
        {
            this.getrolelist()
            this.writedialog = false
            return this.$message.success('修改角色信息成功')
        }
        else if (res.status == '201')
        {
            return this.$message.error('修改角色信息失败')
        }
    }
    else if(reslist.status=='201')
    {
        return this.$message.warning('您当前没有修改角色信息权限，如需请联系管理员')
    }
    else
    {
        this.$message.error("登录过期，请重新登录...")
    }


    },
    async deleterole (id,name) {
    if(name=='管理员')
    {
        return this.$message.error('不能删除管理员角色')
    }
    else
    {

        const result = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).catch(function(err){
        console.log(err)
    })
        console.log(result)
        if (result == 'confirm') {
            const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'删除角色'})
            if(reslist.status=='200')
            {
                const { data: res } = await this.$http.post('/Deleterole', { id: id })
                if (res.status == '200')
                {
                    this.getrolelist()
                    this.writedialog = false
                    return this.$message.success('删除角色成功')
                }
                else if (res.status == '201')
                {
                    return this.$message.error('删除角色失败')
                }
            }
            else if(reslist.status=='201')
            {
                return this.$message.warning('您当前没有删除角色信息权限，如需请联系管理员')
            }
            else
            {
                this.$message.error("登录过期，请重新登录...")
            }

        }
    }
    },
    RolesshandleSizeChange(val){
        this.Rolesqueryinfo.pagesize=val
        this.getrolelist()
    },
    RoleshandleCurrentChange(val){
        this.Rolesqueryinfo.pagenum=val
        this.getrolelist()
    }
  }
}
</script>

<style lang="less" scoped>
.Rolecontainer
{
    width: 100%;
    height: calc(100vh - 60px);
    overflow: auto;
    padding: 20px;
}
.el-card
{
    margin-top: 15px;
}
.el-table
{
    margin-top: 15px;
}
.top
{
    border-top: 1px solid #eee;
}
.xia
{
    border-bottom: 1px solid #eee;
}

.el-tag
{
   margin: 7px;
}
.vcenter
{
    display: flex;
    flex-wrap: nowrap;
    align-items:center;
}
</style>
