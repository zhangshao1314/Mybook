<template>
   <div class="Bookinfocontainer">
       <el-breadcrumb separator-class="el-icon-arrow-right" style="min-width: 800px;">
           <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>权限管理</el-breadcrumb-item>
           <el-breadcrumb-item>角色列表</el-breadcrumb-item>
       </el-breadcrumb>
     <el-card style="min-width: 800px;">
       <el-table :data="tableData" border stripe style="width: 100%" >
         <el-table-column prop="bookname"label="书名"></el-table-column>
         <el-table-column prop="bookid.authname"label="作者"></el-table-column>
         <el-table-column prop="bookid.category"label="分类"></el-table-column>
         <el-table-column prop="bookid.status"label="状态"></el-table-column>
         <el-table-column label="操作" width="120px">
             <template slot-scope="scope">
                 <el-button type="primary" icon="el-icon-edit" size="mini" @click="toeditbook(scope.row.bookid.bookname,scope.row.bookid.category,scope.row.bookid.status,scope.row.bookid.Introduction)"></el-button>
                 <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteBookinfo(scope.row.bookid.bookname)"></el-button>
             </template>
         </el-table-column>
       </el-table>
         <el-pagination
                 @size-change="BookinfohandleSizeChange"
                 @current-change="BookinfohandleCurrentChange"
                 :current-page="bookinfoqueryinfo.pagenum"
                 :page-sizes="[1, 3, 5, 10]"
                 :page-size="bookinfoqueryinfo.pagesize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="bookinfototal">
         </el-pagination>


         <el-dialog title="修改作品" :visible.sync="bookinfodialogVisible" width="600px" :before-close="BookinfohandleCloseAddpro">
             <el-form :model="BookinfoAddproform" ref="BookinfoAddproformref" :rules="BookinfoAddproformrules">
                 <el-form-item label="作品类型" label-width="80px" prop="booktype">
                     <el-select v-model="BookinfoAddproform.booktype" placeholder="请选择">
                         <el-option v-for="item in optionslist":key="item.value":label="item.label":value="item.value">
                         </el-option>
                     </el-select>
                 </el-form-item>
                 <el-form-item label="作品状态" label-width="80px" prop="status">
                     <el-select v-model="BookinfoAddproform.status" placeholder="请选择">
                         <el-option v-for="item in statuslist":key="item.value":label="item.label":value="item.value">
                         </el-option>
                     </el-select>
                 </el-form-item>
                 <el-form-item label="作品简介" label-width="80px" prop="Introduction" height="200px">
                     <el-input type="textarea" :rows="3" resize="none" v-model="BookinfoAddproform.Introduction"></el-input>
                 </el-form-item>
             </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="BookinfoCancleAddpro">取 消</el-button>
                    <el-button type="primary" @click="BookinfoTrueAddpro">确 定</el-button>
                  </span>
         </el-dialog>
     </el-card>
   </div>
</template>
<script>
    export default {
        created(){
            this.Bookinfogetallbooklist()
        },
        data(){
             return {
                 bookinfoqueryinfo:{
                 pagenum:1,
                 pagesize:5
                 },
                 tableData:[],
                 bookinfototal:0,
                 bookinfodialogVisible: false,
                 optionslist: [
                     {
                         value: '玄幻',
                         label: '玄幻'
                     },
                     {
                         value: '奇幻',
                         label: '奇幻'
                     },
                     {
                         value: '仙侠',
                         label: '仙侠'
                     },
                     {
                         value: '武侠',
                         label: '武侠'
                     },
                     {
                         value: '现实',
                         label: '现实'
                     }, {
                         value: '都市',
                         label: '都市'
                     }, {
                         value: '历史',
                         label: '历史'
                     },
                     {
                         value: '军事',
                         label: '军事'
                     }, {
                         value: '体育',
                         label: '体育'
                     }, {
                         value: '悬疑',
                         label: '悬疑'
                     },
                     {
                         value: '科幻',
                         label: '科幻'
                     }, {
                         value: '游戏',
                         label: '游戏'
                     },
                     {
                         value: '女生网',
                         label: '女生网'
                     },
                     {
                         value: '轻小说',
                         label: '轻小说'
                     }
                 ],
                 statuslist:[{"value":"正在连载",label:"正在连载"},{"value":"完本",label:"完本"}],
                 BookinfoAddproform: {
                     authorname: window.sessionStorage.getItem('username'),
                     bookname: '',
                     booktype: '',
                     status: '',
                     Introduction: ''
                 },
                 BookinfoAddproformrules: {
                     status: [{ required: true, message: '状态不能为空', trigger: 'change' },
                         { max: 15, min: 2, message: '4-15个字符之间', trigger: 'change' }],
                     booktype: [{ required: true, message: '作品类型不能为空', trigger: 'blur' },
                         { max: 15, min: 2, message: '2-15个字符之间', trigger: 'blur' }],
                     Introduction: [{ required: true, message: '简介不能为空', trigger: 'blur' },
                         { max: 300, min: 10, message: '简介需要10-300个字符之间，请给人耳目一新的感觉', trigger: 'blur' }]
                 }
        }
        },
        methods:{
            async Bookinfogetallbooklist()
            {
                const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'图书列表'})
                if(reslist.status=='200')
                {
                    const {data:res}=await this.$http.post('/Getbookinfolistbybookinfoqueryinfo',this.bookinfoqueryinfo)
                    if(res.status=='200')
                    {
                        this.tableData=res.data
                        this.bookinfototal=res.total
                    }

                }
                else if(reslist.status=='201')
                {
                    return this.$message.warning("您当前没有查看图书列表权限，如需请联系管理员")
                }
                else
                {
                    return this.$message.error("登录过期，请重新登录...")
                }

        },
        BookinfohandleSizeChange(val)
        {
            this.bookinfoqueryinfo.pagesize=val
            this.Bookinfogetallbooklist()
        },
        BookinfohandleCurrentChange(val)
        {
            this.bookinfoqueryinfo.pagenum=val
            this.Bookinfogetallbooklist()
        },
        toeditbook (bookname,type,status,intr) {
            this.BookinfoAddproform.bookname=bookname
            this.BookinfoAddproform.booktype=type
            this.BookinfoAddproform.status=status
            this.BookinfoAddproform.Introduction=intr
            this.bookinfodialogVisible = true
        },
        BookinfohandleCloseAddpro () {
            this.$refs.BookinfoAddproformref.resetFields()
            this.bookinfodialogVisible = false
        },
    BookinfoCancleAddpro () {
            this.$refs.BookinfoAddproformref.resetFields()
            this.bookinfodialogVisible = false
        },
    BookinfoTrueAddpro () {
            this.$refs.BookinfoAddproformref.validate(async val => {
                if (val) {
                    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'修改图书'})
                    if(reslist.status=='200')
                    {
                        const { data: res } = await this.$http.post('/editbook', this.BookinfoAddproform)
                        if (res.status == '200') {
                            this.bookinfodialogVisible = false
                            this.Bookinfogetallbooklist()
                            return this.$message.success('修改成功')
                        } else if (res.status == '201') {
                            return this.$message.error('修改失败')
                        }  else {
                            return this.$message.warning('登录身份过期，请重新登录...')
                        }
                    }
                    else if(reslist.status=='201')
                    {
                        return this.$message.warning("您当前没有修改图书权限，如需请联系管理员")
                    }
                    else
                    {
                        return this.$message.error("登录过期，请重新登录...")
                    }

                }
            })
        },
        async deleteBookinfo(bookname){
        const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'删除图书'})
        if(reslist.status=='200')
        {
            const result=await this.$confirm("此操作将永久删除这本小说，是否继续？" ,'提示',{}).catch(function(val){
            console.log(val)
        })
            if(result=='confirm')
            {
                this.BookinfoAddproform.bookname=bookname
                const { data: res } = await this.$http.post('/Deletebook', this.BookinfoAddproform)
                if (res.status == '200')
                {
                    this.bookinfodialogVisible = false
                    this.bookinfoqueryinfo.pagenum=1
                    this.Bookinfogetallbooklist()
                    return this.$message.success('删除成功')
                }
                else if (res.status == '201')
                {
                    return this.$message.error('删除失败')
                }
            }
        }
        else if(reslist.status=='201')
        {
            return this.$message.warning("您当前没有删除图书权限，如需请联系管理员")
        }
        else
        {
            return this.$message.error("登录过期，请重新登录...")
        }

        }
    }
  }
</script>

<style lang="less" scoped>
.Bookinfocontainer
{
    width: 100%;
    height:calc(100vh - 60px);
    overflow: auto;
    padding: 20px;
}
.el-breadcrumb
{
    margin: 0 0 15px!important;
}

</style>
