<template>
    <div class="Rightcontainer">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="min-width: 800px">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card style="min-width: 800px">
            <el-button type="primary" style="margin-bottom: 15px" @click="openaddper">添加权限</el-button>
            <el-table :data="Rightslist" stripe border>
                <el-table-column label="序号" type="index" width="50px"></el-table-column>
                <el-table-column label="权限名称" prop="permissionname"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="级别" prop="level">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.level==1">一级</el-tag>
                        <el-tag type="info" v-else-if="scope.row.level==2">二级</el-tag>
                        <el-tag type="warning" v-else="scope.row.level==3">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="RightshandleSizeChange"
                    @current-change="RightshandleCurrentChange"
                    :current-page="Rightqueryinfo.pagenum"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="Rightqueryinfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="Righttotal">
            </el-pagination>
                <el-dialog
                    title="添加三级权限"
                    :visible.sync="addperdialogVisible"
                    width="600px"
                    :before-close="addperhandleClose">
                    <el-form ref="addperformref" :model="addperforminfo" :rules="addperformrules">
                        <el-form-item label="权限名称" label-width="80px" prop="permissonname">
                            <el-input v-model="addperforminfo.permissonname"></el-input>
                        </el-form-item>
                        <el-form-item label="权限路径" label-width="80px" prop="permissonpath">
                            <el-input v-model="addperforminfo.permissonpath"></el-input>
                        </el-form-item>
                        <el-form-item label="父级分类" label-width="80px">
                            <el-cascader
                                    v-model="cascadervalue"
                                    :options="options"
                                    :props="{ expandTrigger: 'hover'}"
                                    @change="handleChange"
                                    style="width: 100%">
                            </el-cascader>
                        </el-form-item>
                    </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cacleaddperdialogVisible">取 消</el-button>
                <el-button type="primary" @click="TrueaddperdialogVisible">确 定</el-button>
              </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
  created () {
    this.getpermissionlist()
  },
  data () {
    return {
      cascadervalue:'',
      addperdialogVisible:false,
      Righttotal:0,
      Rightslist: [],
      Rightqueryinfo:{
        pagenum:1,
        pagesize:5
      },
       options:[],
        addperforminfo:{
            permissonname:'',
            permissonpath:''
        },
        addperformrules:{
            permissonname:[{required:true,message:'权限名称不能为空',trigger:'blur'},
            {max:10,min:2,message:'2-10个字符之间',trigger:'blur'}],
            permissonpath:[{required:true,message:'权限路径不能为空',trigger:'blur'},
                {max:20,min:5,message:'5-10个字符之间',trigger:'blur'}]
        }
    }
  },
  methods: {
    async getpermissionlist () {

    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'权限列表'})
    if(reslist.status=='200')
    {
        const { data: res } = await this.$http.post('/Getpermissionlist',this.Rightqueryinfo)
        if (res.status == '200') {
            this.Rightslist = res.data
            this.Righttotal=res.total
        }
    }
    else if(reslist.status=='201')
    {
        this.$message.warning("您当前没有权限列表权限，如需请联系管理员")
    }
    else
    {
        this.$message.warning("登录过期，请重新登录...")
    }

    },
    RightshandleSizeChange(val){
        this.Rightqueryinfo.pagesize=val
        this.getpermissionlist ()
    },
    RightshandleCurrentChange(val){
        this.Rightqueryinfo.pagenum=val
        this.getpermissionlist ()
    },
    addperhandleClose(){
    this.addperdialogVisible=false
    this.$refs.addperformref.resetFields()
    },
    cacleaddperdialogVisible(){
    this.addperdialogVisible=false
    this.$refs.addperformref.resetFields()
    },
    async openaddper(){
    this.addperdialogVisible=true
    const {data:res}=await this.$http.post('/Getallpermissonmore')
    if(res.status=='200')
    {
        for(var i=0;i<res.data[0].children.length;i++)
        {
            const value=res.data[0].children[i].authnname
            delete res.data[0].children[i].authnname
            delete res.data[0].children[i].path
            res.data[0].children[i]['value']=value
            res.data[0].children[i]['label']=value
            for(var j=0;j<res.data[0].children[i].children.length;j++)
            {
                const value2=res.data[0].children[i].children[j].authnname
                delete res.data[0].children[i].children[j].authnname
                delete res.data[0].children[i].children[j].path
                delete res.data[0].children[i].children[j].children
                res.data[0].children[i].children[j]['value']=value2
                res.data[0].children[i].children[j]['label']=value2
            }
        }
        this.options=res.data[0].children
        console.log(res.data[0].children)
    }
    else
    {
        return this.$message.error("登录过期，请重新登录")
    }

    },
    TrueaddperdialogVisible(){
        this.$refs.addperformref.validate(async val => {
        if(val)
        {
            const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'添加三级权限'})
            if(reslist.status=='200')
            {
                if(this.cascadervalue)
                {
                    const {data:res} =await this.$http.post('/Updatepermissonmore',{father:this.cascadervalue,addinfo:this.addperforminfo})
                    if(res.status=='200')
                    {
                        this.addperdialogVisible=false
                        return this.$message.success("添加成功")
                    }
                    else if(res.status=='201')
                    {
                        return this.$message.success("服务器异常，添加失败")
                    }
                    else
                    {
                        return this.$message.success("已存在此三级权限名，请勿重复添加")
                    }
                }
                else
                {
                    return this.$message.error("请选择父级分类")
                }
            }
            else if(reslist.status=='201')
            {
                return this.$message.warning("您当前没有添加三级权限，如需请联系管理员")
            }
            else
            {
                return this.$message.error("登录过期，请重新登录...")
            }

        }


        })

    },
    handleChange(val){
        console.log(this.cascadervalue)
    }
  }
}
</script>

<style lang="less" scoped>
.Rightcontainer
{
    width: 100%;
    height: calc(100vh - 60px);
    overflow: auto;
    padding: 20px;
}
.el-card
{
    margin-top: 15px;
    box-shadow: 0 0 1px gray !important;
}
</style>
