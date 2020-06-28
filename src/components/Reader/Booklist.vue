<template>
    <div class="container">
        <div class="header-nav-box">
            <div class="header-nav">
                <div class="header-nav-menu">
                    <ul>
                        <a href="" v-on:click.prevent="nowaddress">凯阅中文网</a>
                        <span></span>
                        <a href="" @click.prevent="nowaddress">凯阅中文网</a>
                        <span></span>
                        <a href="" @click.prevent="nowaddress">凯阅中文网</a>
                        <span></span>
                        <a href="" @click.prevent="nowaddress">凯阅中文网</a>
                        <span></span>
                        <a href="" @click.prevent="nowaddress">繁体版</a>
                    </ul>
                </div>
            </div>
        </div>
        <div class="serch-dabox">
        <div class="serch">
            <div class="logo"><a href=""  v-on:click.prevent="nowaddress"><img src="../../assets/images/logo.png" alt=""></a></div>
            <div class="serch-box  myinput">
              <el-autocomplete
                class="inline-input"
                v-model="selectdata.value"
                :fetch-suggestions="querySearch"
                placeholder="斗破苍穹"
                :trigger-on-focus="true"
              ></el-autocomplete><span class="iconfont iconsousuo" @click="serchbook"></span>
            </div>
            <div class="serch-book">
                <span class="iconfont iconmanage-the-return-of-books"></span>我的书架
            </div>
        </div>
        </div>
        <div class="info-tab">
            <div class="info-tab-box">
                <ul>
                    <li><i class="iconfont iconcaidan"></i>作品分类</li>
                    <li :class="[bookqueryinfo.lilist=='全部作品' ? 'licolor' : '']" @click="selectmenutype('全部作品')">全部作品</li>
                    <li :class="[bookqueryinfo.lilist=='完本' ? 'licolor' : '']" @click="selectmenutype('完本')">完本</li>
                    <li :class="[bookqueryinfo.lilist=='免费' ? 'licolor' : '']" @click="selectmenutype('免费')">免费</li>
                    <li :class="[bookqueryinfo.lilist=='作家专区' ? 'licolor' : '']" @click="selectmenutype('作家专区')">作家专区</li>
                    <li :class="[bookqueryinfo.lilist=='客户端' ? 'licolor' : '']" @click="selectmenutype('客户端')"><i class="iconfont iconshoujihao"></i>客户端</li>
                    <li :class="[bookqueryinfo.lilist=='手游' ? 'licolor' : '']" @click="selectmenutype('手游')"><i class="iconfont iconyouxishoubing"></i>手游</li>
                    <li :class="[bookqueryinfo.lilist=='页游' ? 'licolor' : '']" @click="selectmenutype('页游')"><i class="iconfont iconshubiao"></i>页游</li>
                </ul>
            </div>
        </div>
        <div class="tab-call-box">
        <div class="tab-class">
            <div class="tab-class-info">
                <ul>
                    <li>
                        <div @click="getallbooklist('玄幻')">
                            <span><i class="iconfont icon1"></i></span>
                            <span>玄幻</span><br>
                            <span>{{categorylist[0]}}</span>

                        </div>
                        <div @click="getallbooklist('奇幻')">
                            <span><i class="iconfont iconqihuan"></i></span>
                            <span>奇幻</span><br>
                            <span>{{categorylist[1]}}</span>
                        </div>
                    </li>
                    <li>
                        <div @click="getallbooklist('武侠')">
                            <span><i class="iconfont iconwuxia"></i></span>
                            <span>武侠</span><br>
                            <span>{{categorylist[2]}}</span>
                        </div>
                        <div @click="getallbooklist('仙侠')">
                            <span><i class="iconfont iconxianxia"></i></span>
                            <span>仙侠</span><br>
                            <span>{{categorylist[3]}}</span>
                        </div>
                    </li>
                    <li>
                        <div @click="getallbooklist('都市')">
                            <span><i class="iconfont icondushi"></i></span>
                            <span>都市</span><br>
                            <span>{{categorylist[4]}}</span>
                        </div>
                        <div @click="getallbooklist('现实')">
                            <span><i class="iconfont iconxianshi"></i></span>
                            <span>现实</span><br>
                            <span>{{categorylist[5]}}</span>
                        </div>
                    </li>
                    <li>
                        <div @click="getallbooklist('军事')">
                            <span><i class="iconfont iconjunshi"></i></span>
                            <span>军事</span><br>
                            <span>{{categorylist[6]}}</span>
                        </div>
                        <div @click="getallbooklist('历史')">
                            <span><i class="iconfont iconlishi"></i></span>
                            <span>历史</span><br>
                            <span>{{categorylist[7]}}</span>
                        </div>
                    </li>
                    <li>
                        <div @click="getallbooklist('游戏')">
                            <span><i class="iconfont iconyouxi"></i></span>
                            <span>游戏</span><br>
                            <span>{{categorylist[8]}}</span>
                        </div>
                        <div @click="getallbooklist('体育')">
                            <span><i class="iconfont iconchengjiu"></i></span>
                            <span>体育</span><br>
                            <span>{{categorylist[9]}}</span>
                        </div>
                    </li>
                    <li>
                        <div @click="getallbooklist('科幻')">
                            <span><i class="iconfont iconkehuan"></i></span>
                            <span>科幻</span><br>
                            <span>{{categorylist[10]}}</span>
                        </div>
                        <div @click="getallbooklist('悬疑')">
                            <span><i class="iconfont iconxuanyilingyi"></i></span>
                            <span>悬疑</span><br>
                            <span>{{categorylist[11]}}</span>
                        </div>
                    </li>
                    <li>
                        <div @click="getallbooklist('女生网')">
                            <span><i class="iconfont iconnvshengwang"></i></span>
                            <span>女生网</span><br>
                            <span>{{categorylist[12]}}</span>
                        </div>
                        <div @click="getallbooklist('轻小说')">
                            <span><i class="iconfont iconpc-qingxiaoshuo"></i></span>
                            <span>轻小说</span><br>
                            <span>{{categorylist[13]}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="tab-class-center">
                <div class="image-box">
                    <img src="https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/7a252584150962528ae3c5ebec79d879.jpeg" alt="">
                    <ul>
                        <li @click="serchbookbyname('斗破苍穹')">斗破苍穹</li>
                        <li @click="serchbookbyname('武动乾坤')">武动乾坤</li>
                        <li @click="serchbookbyname('武极天下')">武极天下</li>
                        <li @click="serchbookbyname('武炼巅峰')">武炼巅峰</li>
                        <li @click="serchbookbyname('大主宰')">大主宰</li>
                        <li><em></em><em></em><em></em></li>
                    </ul>
                </div>
                <div class="image-gg">
                    <div @click="serchbookbyname('斗破苍穹')"><img src="https://img1.qidian.com/upload/gamesy/2020/01/19/20200119151210cupzcesxs0.jpg" alt=""><span></span></div>
                    <div @click="serchbookbyname('斗破苍穹')"><img src="https://img0.qidian.com/upload/gamesy/2020/03/16/202003161334492cjgwgjp6e.png" alt=""><span></span></div>
                    <div @click="serchbookbyname('斗破苍穹')"><img src="https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/7d7754802103c7ba3d136846e112ba7f.png" alt=""><span></span></div>
                </div>
            </div>
            <div class="image-right">
                <div class="image-right-message">
                    <h3>越拼搏，越青春</h3>
                    <p><span>[公告]</span>全民国家安全教育日</p>
                    <p><span>[资讯]</span>我和浦东30年征文</p>
                    <p><span>[资讯]</span>仙侠神话征文大赛</p>
                    <p><span>[资讯]</span>百名网络作家接力发声</p>
                    <p><span><span>页游</span></span>五龙灭神魔</p>
                    <p><span><span>页游</span></span>四海第一舰队</p>
                    <p><i class="iconfont iconlaba"></i><marquee style="display: inline-block">恒沣打赏 我在盘丝洞养蜘蛛 100W点</marquee></p>
                </div>
                <div class="image-right-image">
                    <img @click="serchbookbyname('斗破苍穹')" src="https://img1.qidian.com/upload/gamesy/2020/01/19/20200119151210cupzcesxs0.jpg" alt="">
                    <span></span>
                </div>
            </div>
        </div>
        </div>
        <div class="type-box">
        <div class="type">
           <span class="firstspan">{{bookqueryinfo.type}}↓</span>
           <span class="lastspan">共 <span>{{booktotal}}本相关作品</span><span></span><i class="el-icon-menu"></i><span></span><i class="el-icon-s-unfold"></i> </span>
        </div>
        </div>
        <div style="min-width: 1120px;margin-top: 15px" class="booklisttableclass">
        <el-table :data="tableData" stripe style="width: 95%;margin: 0 auto;font-family: '华文细黑';font-size: 15px" @row-click="tabletoread">
            <el-table-column prop="bookid.category"label="类型"></el-table-column>
            <el-table-column prop="bookname"label="书名"></el-table-column>
            <el-table-column label="最新章节">
            <template slot-scope="scope">
              {{scope.row.chaptersnum ? scope.row.chaptersnum + ' ' : '无最新章节'}} {{scope.row.chaptersname ? scope.row.chaptersname : ''}}
            </template>
            </el-table-column>
            <el-table-column prop="bookid.authname"label="作者"></el-table-column>
            <el-table-column prop="bookid.Introduction"label="简介"></el-table-column>
            <el-table-column prop="bookid.status"label="状态"></el-table-column>

        </el-table>
        </div>
        <el-pagination
                @size-change="BookhandleSizeChange"
                @current-change="BookhandleCurrentChange"
                :current-page="bookqueryinfo.pagenum"
                :page-sizes="[1, 3, 5, 10]"
                :page-size="bookqueryinfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="booktotal">
        </el-pagination>
        <!--<div class="footer">-->
            <!--已经到底了~~~-->
        <!--</div>-->
    </div>
</template>

<script>
import bus from '../../center'
export default {
  created () {
      this.getstatuslength()
      this.getallbooklist('玄幻')
  },

  data () {
     return {
      serchbookname: '',
      tableData: [],
      selectdata:{
      value:""
      },
      authorlist:[],
      categorylist:[],
      booktotal:0,
      bookqueryinfo:{
        pagenum:1,
        pagesize:5,
        lilist:'全部作品',
        type:''
      }
    }
  },
  watch: {
    'bookqueryinfo.type': {
      handler(cval, oval) {
        if(cval!=oval)
        {
          this.bookqueryinfo.pagenum=1
          this.bookqueryinfo.pagesize=5
        }
      },
      deep: true
    },
    'bookqueryinfo.lilist': {
      handler(cval, oval) {
        if(cval!=oval)
        {
          this.bookqueryinfo.pagenum=1
          this.bookqueryinfo.pagesize=5
        }
      },
      deep: true
    }
  },
  methods: {
    BookhandleSizeChange(val){
      const nowtype=this.bookqueryinfo.type
      this.bookqueryinfo.pagesize=val
      this.getallbooklist(nowtype)
    },
    BookhandleCurrentChange(val){
      const nowtype=this.bookqueryinfo.type
      this.bookqueryinfo.pagenum=val
      this.getallbooklist(nowtype)
    },
    async tabletoread (book) {
      const { data: res } = await this.$http.post('/GetbookinfoByBookname', { nowbookname: book.bookname })
      const { data: resdata } = await this.$http.post('/Getbookallcapterslist', { bookname: book.bookname })
      if (res.status == '200'&& resdata.status=='200') {
        this.$store.state.bookinfo = res.data
        this.$store.state.bookcapterslist = resdata.data
        this.$router.push('/Bookdetailed')
      } else if (res.status == '201') {
        return this.$message.warning('没有这本小说哦')
      } else {
        return this.$message.warning('登录过期，请重新登录...')
      }
    },
    nowaddress () {
      this.$router.push('/Booklist')
    },
    async serchbook () {
      if (!this.selectdata.value.trim()) {
        this.selectdata.value = '斗破苍穹'
      }
      const { data: res } = await this.$http.post('/GetbookinfoByBookname', { nowbookname: this.selectdata.value })
      const { data: resdata } = await this.$http.post('/Getbookallcapterslist', { bookname: this.selectdata.value })
      if (res.status == '200'&& resdata.status=='200') {
        this.$store.state.bookinfo = res.data
        this.$store.state.bookcapterslist = resdata.data
        this.$router.push('/Bookdetailed')
      } else if (res.status == '201') {
        return this.$message.warning('没有这本小说哦')
      } else {
        return this.$message.warning('登录过期，请重新登录...')
      }
    },
     async querySearch(querystring,cb)
    {
       var result=[]
        const {data:res}=await this.$http.post('/getbooknamelistbyquerystring',{"bookname":querystring})
        for(var i=0;i<res.data.length;i++)
        {
          result.push({value:res.data[i]})
        }
        if(result[0])
        {
          result=result
        }
        else
        {
          result=[{"value":"无符合条件数据"}]
        }
      cb(result)
    },
    async selectmenutype(text){
      this.bookqueryinfo.lilist=text
      if(this.bookqueryinfo.lilist=='全部作品'|| this.bookqueryinfo.lilist=='免费'||this.bookqueryinfo.lilist=='完本')
      {
        const nowtype=this.bookqueryinfo.type
        this.getallbooklist(nowtype)
        this.getstatuslength()

      }
      else if(this.bookqueryinfo.lilist=='作家专区')
      {
          const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'我的作品'})
          if(reslist.status=='200')
          {
            this.$router.push('/Mybooktodo')
          }
          else if(reslist.status=='201')
          {
              return this.$message.warning("您当前没有查看我的作品列表权限，如需请联系管理员")
          }
          else
          {
              return this.$message.error("登录过期，请重新登录...")
          }
      }
      else
      {
          return this.$message.warning("尚未开放  敬请期待~")
      }

    },
    async getstatuslength(){
    const {data:res}=await this.$http.post('/getallstatuslength',{status:this.bookqueryinfo.lilist})
    if(res.status=='200')
    {
      this.categorylist=res.data
    }
    else
    {
      return this.$message.error("登录过期，请重新登录...")
    }
    },
    async serchbookbyname (name) {
      if (!this.selectdata.value.trim()) {
        this.selectdata.value = '斗破苍穹'
      }
      const { data: res } = await this.$http.post('/GetbookinfoByBookname', { nowbookname: name })
      const { data: resdata } = await this.$http.post('/Getbookallcapterslist', { bookname: name })
      if (res.status == '200'&& resdata.status=='200') {
        this.$store.state.bookinfo = res.data
        this.$store.state.bookcapterslist = resdata.data
        this.$router.push('/Bookdetailed')
      } else if (res.status == '201') {
        return this.$message.warning('没有这本小说哦')
      } else {
        return this.$message.warning('登录过期，请重新登录...')
      }
    },
    async getallbooklist(nowtype)
    {

      this.bookqueryinfo.type=nowtype
      const {data:res}=await this.$http.post('/Getbookinfolistbyquerystring',this.bookqueryinfo)
      if(res.status=='200')
      {
        this.tableData=res.data
        this.booktotal=res.total
      }
      else
      {
        return this.$message.error("登录过期，请重新登录...")
      }

    }
  }
}
</script>

<style lang="less" >
.myinput .el-input__inner
{
  border: transparent!important;
  height: 38px!important;
}
.container
{
    padding: 0;
    width: 100%;
    height:calc(100vh - 60px)!important;
    overflow: auto!important;
    background: white;
}

.el-pagination
{
    margin: 20px auto 0!important;
    width: 95%!important;
    color: black;
}
.el-table .cell
{
  white-space: nowrap!important;
  overflow: hidden!important;
  text-overflow: ellipsis!important;
}
/*.el-table td, .el-table th*/
/*{*/
  /*text-align: center!important;*/
/*}*/
.booklisttableclass .el-table td:hover
{
    color: #ed4259;
    cursor: pointer;
}
</style>
