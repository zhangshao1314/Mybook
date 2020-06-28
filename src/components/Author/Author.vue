<template>
    <div class="authcontainer">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Mybooktodo' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>作者专区</el-breadcrumb-item>
            <el-breadcrumb-item>我的作品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--<div class="authorarea"><i class="iconfont iconxieboke"></i>作家专区</div>-->
            <div class="mybookmenu"><span>我的作品</span><span @click="toaddbook"><i class="el-icon-circle-plus-outline"></i>新建作品</span></div>
            <div class="mybookinfo" v-for="item in booklist">
                <div class="bookimage-box"><div><div><img src="../../assets/images/book.png" alt=""><span>{{item.bookname}}</span></div></div></div>
                <div class="booknamebox">
                    <p>{{item.bookname}}</p>
                    <p>{{item.chaptersnum}} {{item.chaptersname ? item.chaptersname : '无最新章节' }}</p>
                    <p>收藏0</p>
                </div>
                <div class="btnmenu">
                    <el-tag type="warning">{{item.bookid.category}}</el-tag>
                    <button>已发布</button>
                    <button @click="towrite(item.bookname,item.chaptersname ? item.chaptersname : '无最新章节',item.bookid._id,item.chaptersnum)">去写作</button>
                </div>
            </div>
            <el-dialog title="创建作品" :visible.sync="dialogVisible" width="600px" :before-close="handleCloseAddpro">
                <el-form :model="Addproform" ref="Addproformref" :rules="Addproformrules">
                    <el-form-item label="作者" label-width="80px">
                        <el-input v-model="Addproform.authorname" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="作品名称" label-width="80px" prop="bookname">
                        <el-input v-model="Addproform.bookname"></el-input>
                    </el-form-item>
                    <el-form-item label="作品类型" label-width="80px" prop="type">
                        <el-select v-model="Addproform.type" placeholder="请选择">
                            <el-option v-for="item in optionslist":key="item.value":label="item.label":value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作品状态" label-width="80px" prop="status">
                        <el-input v-model="Addproform.status" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="作品简介" label-width="80px" prop="Introduction" height="200px">
                        <el-input type="textarea" :rows="3" resize="none" v-model="Addproform.Introduction"></el-input>
                    </el-form-item>
                </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="CancleAddpro">取 消</el-button>
                    <el-button type="primary" @click="TrueAddpro">确 定</el-button>
                  </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
  created () {
    this.getbooinfolist()
  },
  data () {
    return {
      dialogVisible: false,
      selectval: '',
      booklist: [],
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
      Addproform: {
        authorname: window.sessionStorage.getItem('username'),
        bookname: '',
        type: '',
        status: '正在连载',
        Introduction: ''
      },
      Addproformrules: {
        bookname: [{ required: true, message: '书名不能为空', trigger: 'blur' },
          { max: 15, min: 4, message: '4-15个字符之间', trigger: 'blur' }],
        status: [{ required: true, message: '状态不能为空', trigger: 'blur' },
          { max: 15, min: 4, message: '4-15个字符之间', trigger: 'blur' }],
        type: [{ required: true, message: '作品类型不能为空', trigger: 'blur' },
          { max: 15, min: 2, message: '2-15个字符之间', trigger: 'blur' }],
        Introduction: [{ required: true, message: '简介不能为空', trigger: 'blur' },
          { max: 300, min: 10, message: '简介需要10-300个字符之间，请给人耳目一新的感觉', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getbooinfolist () {
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'我的作品'})
    if(reslist.status=='200')
    {
        const { data: res } = await this.$http.post('/Getbookinfolist')
        if (res.status == '200') {
            this.booklist = res.data
        }
    }
    else if(reslist.status=='201')
    {
        return this.$message.warning("您当前没有查看我的作品列表权限，如需请联系管理员")
    }
    else
    {
        return this.$message.error("登录过期，请重新登录...")
    }

    },
    towrite (bookname, captersname, bookid,captersnum) {
      this.$router.push('/Writebook')
      window.sessionStorage.setItem('nowbookname', bookname)
      window.sessionStorage.setItem('nowcaptersnum', captersnum)
      window.sessionStorage.setItem('nowcaptersname', captersname)
      window.sessionStorage.setItem('bookid', bookid)
    },
    toaddbook () {
      this.dialogVisible = true
    },
    handleCloseAddpro () {
      this.$refs.Addproformref.resetFields()
      this.dialogVisible = false
    },
    CancleAddpro () {
      this.$refs.Addproformref.resetFields()
      this.dialogVisible = false
    },
    TrueAddpro () {
      console.log(this.Addproform.type)
      this.$refs.Addproformref.validate(async val => {
        if (val) {
            const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'创建作品'})
            if(reslist.status=='200')
            {
                const { data: res } = await this.$http.post('/Addbook', this.Addproform)
                if (res.status == '200') {
                    this.dialogVisible = false
                    this.getbooinfolist()
                    return this.$message.success('创建成功')
                } else if (res.status == '201') {
                    return this.$message.error('创建失败')
                } else if (res.status == '203') {
                    return this.$message.warning('此作品已存在')
                }
            }
            else if(reslist.status=='201')
            {
                return this.$message.warning("您当前没有创建作品权限，如需请联系管理员")
            }
            else
            {
                return this.$message.error("登录过期，请重新登录...")
            }

        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.authcontainer
{
    height: calc(100vh - 60px);
    overflow: auto;
}
.el-breadcrumb
{
    min-width: 900px;
    padding: 20px 20px 15px;
}
.el-card
{
    min-width: 900px;
    max-width: 1200px!important;
    margin: 0 20px 0;
}
.authorarea
{
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 20px;
    font-family: '华文黑体';
}
.authorarea i
{
    font-size: 30px;
    color: blue;
}
.mybookmenu
{
    width: 90%;
    margin: 0 auto;
    max-width: 900px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-family: '华文黑体';
    border-bottom: 1px solid rgba(128, 128, 128, 0.45);
}
.mybookmenu span
{
    display: inline-block;
}
.mybookmenu span:first-child
{
    width: 100px;
    height: 60px;
    font-size: 23px;
    font-weight: 600;
    line-height: 60px;
    border-bottom: 2px solid ;
}
.mybookmenu span:last-child
{
    cursor: pointer;
    color: blue;
}
.mybookmenu span:last-child:hover
{
    color: rgba(0, 0, 255, 0.8);
}
.mybookmenu span:last-child i
{
    position: relative;
    top: 1px;
    font-weight: 600;
    padding-right: 5px;
}
.mybookinfo
{
    width: 90%;
    max-width: 900px;
    margin: 0 auto;
    height: 200px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.58);
}
.mybookinfo div
{
    float: left;
}
.bookimage-box
{
    position: relative;
    top: 27px;
    width: 110px;
    height: 145px;
    padding: 3px;
    background: rgb(236,239,243);
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.25);
}
.bookimage-box div
{
    height: 100%;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(128, 128, 128, 0.25);
}
.bookimage-box div:hover div
{
    transform: scale(1.1);
}
.bookimage-box div div
{
    position: relative;
    height: 100%;
    width: 100%;
    transition: all 0.2s;
    border: transparent;
}
.bookimage-box div div img
{
    width: 100%;
    height: 100%;
    border: transparent;
}
.bookimage-box span
{
    position: absolute;
    width: 80%;
    height: 37px;
    font-size: 14px;
    color: gray;
    font-family: '华文细黑';
    overflow: hidden;
    left: 10%;
    bottom: 10px;
    text-align: center;
}
.booknamebox
{
    position: relative;
    top: 27.5px;
    left: 20px;
    width: 300px;
    height: 145px;
}
.booknamebox p
{
    margin: 0;
}
.booknamebox p:nth-child(1)
{
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    font-weight: 600;
}
.booknamebox p:nth-child(2)
{
    margin: 30px 0;
    font-size: 13px;
    color: rgba(128, 128, 128, 0.51);
}
.mybookinfo .btnmenu
{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    float: right;
    position: relative;
    top: 27.5px;
    width:285px;
    height: 145px;
}
.btnmenu .el-tag
{
    width: 80px;
    height: 30px;
    text-align: center;
}
.btnmenu button
{
    width: 80px;
    height: 30px;
    background: white;
    border-radius: 5px;
    outline: none;
    border: 1px solid gray;
}
.btnmenu button:last-child
{
   background: rgba(0,103,230);
   color: white;
   border: transparent;
}
.btnmenu  .el-tag
{
    font-size: 14px;
}
.btnmenu button:nth-of-type(1):hover
{
    color: rgba(0,103,230);
    border: 1px solid rgba(0, 0, 255, 0.56);
}
.btnmenu button:last-child:hover
{
    background:rgba(0,103,180);
}

</style>
