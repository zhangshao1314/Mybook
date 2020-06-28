<template>
    <div class="bookdetailcontainer">
        <div class="backimage"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="min-width: 900px;padding: 0 20px;height: 25px;line-height: 25px;position: relative;z-index:2;background: rgba(255, 255, 255, 0.59)">
            <el-breadcrumb-item :to="{ path: '/Booklist' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>读者专区</el-breadcrumb-item>
            <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="bookinfobox">
            <div class="bookinfo">
                 <div class="bookimage-box-detail"><div><div><img src="../../assets/images/book.png" alt="123" title=""><span>{{bookinfo.bookid.bookname}}</span></div></div></div>
                 <div class="centerbox">
                    <p><span>{{bookinfo.bookname}}</span><span>{{bookinfo.bookid.authname}} 著</span></p>
                    <p><el-tag type="info">{{bookinfo.bookid.status}}</el-tag><el-tag type="warning">{{bookinfo.bookid.category}}</el-tag></p>
                    <p>心潮澎湃，无限幻想，迎风挥击千层浪，少年不败热血！</p>
                    <p>字数不详</p>
                    <p><button @click="toread">正文阅读</button><button>加入书架</button></p>
                 </div>
                 <div class="rightbox">
                     <p><span>0</span>.0</p>
                     <p>评价</p>
                 </div>
            </div>
            <div class="tabmenu">
                <span :class="{redcolor:redcolor1}" @click="togglemenu1">作品信息</span>
                <span :class="{redcolor:redcolor2}" @click="togglemenu12">作品目录</span>
            </div>
            <div class="bookmessage" :class="{isplay:isplay1}">
                <p class="bookintroduce">
                    {{this.$store.state.bookinfo.bookid.Introduction}}
                </p>
                <div>
                    <img src="https://facepic.qidian.com/qd_face/349573/a401199896/0" alt="">
                    <p>{{bookinfo.bookid.authname}}</p>
                    <p>大神作家</p>
                </div>
            </div>
            <div class="capterslist" :class="{isplay:isplay2}">
                <h4>正文卷·共{{this.$store.state.bookcapterslist.length}}章</h4>
                <ul>
                    <li v-for="item,index in this.$store.state.bookcapterslist" @click="readcontent(item.bookname,item.chaptersnum,item.chaptersname,index+1)">{{item.chaptersnum}} {{item.chaptersname}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '../../center'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      redcolor1:true,
      redcolor2:false,
      isplay1:false,
      isplay2:true,
    }
  },
  methods: {
   async toread () {
      if(this.$store.state.bookcapterslist[0])
      {
        const {data:res}=await this.$http.post('/Getbookcapterslistbyname',
        {bookname:this.$store.state.bookinfo.bookname,sum:this.$store.state.bookcapterslist[0].chaptersnum,name:this.$store.state.bookcapterslist[0].chaptersname})
        this.$store.state.startbookname=res.data.bookname
        this.$store.state.startauthname=this.$store.state.bookinfo.bookid.authname
        this.$store.state.startcaptersnum=res.data.chaptersnum
        this.$store.state.startchaptersname=res.data.chaptersname
        this.$store.state.startchapterscontent=res.data.chapterscontent
        this.$store.state.currenindex=1
        this.$router.push('/Readbook')
      }

      else
      {
        return this.$message.warning('阿欧~  作者太懒，还啥都没写哦')
      }

    },
    togglemenu1(){
        this.redcolor1=true
        this.redcolor2=false
        this.isplay1=false
        this.isplay2=true
    },
    togglemenu12(){
        this.redcolor1=false
        this.redcolor2=true
        this.isplay1=true
        this.isplay2=false
    },
    async readcontent(bookname,num,name,index){
    const {data:res}=await this.$http.post('/Getbookcapterslistbyname',{bookname:bookname,sum:num,name:name})
         this.$store.state.startbookname=res.data.bookname
         this.$store.state.startauthname=this.$store.state.bookinfo.bookid.authname
         this.$store.state.startcaptersnum=res.data.chaptersnum
         this.$store.state.startchaptersname=res.data.chaptersname
         this.$store.state.startchapterscontent=res.data.chapterscontent
         this.$store.state.currenindex=index
         this.$router.push('/Readbook')
    }
  },
  computed: {
    ...mapState(['bookinfo'])
  },
  created () {

  }

}
</script>

<style lang="less" scopde>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.bookdetailcontainer
{
    position: relative;
    padding: 0;
    width: 100%;
    height:calc(100vh - 60px)!important;
    overflow: auto!important;
    background: white;
}
.backimage
{
    position: absolute;
    z-index: 1;
    width: 100%;
    min-width: 900px;
    height: 210px;
    background:url('https://img2.qidian.com/upload/gamesy/2020/03/16/20200316133505i25re73vqz.jpg') no-repeat;
    background-position:center;
    background-size: 100% 100%;
}

.bookinfobox
{
    position: relative;
    z-index: 2;
    margin-top: 90px;
    width: 100%;
    min-width: 900px;
}
.bookinfo
{
    padding: 15px;
    width: 80%;
    margin: 0 auto;
    max-width: 900px;
    height: 210px;
    border-right: 1px solid rgba(128, 128, 128, 0.24);
    border-left: 1px solid rgba(128, 128, 128, 0.24);
    background:white;
}
.bookinfo div
{
    float: left;
}
.bookimage-box-detail
{
    position: relative;
    width: 130px;
    height: 180px;
    padding: 3px;
    background: rgb(236,239,243);
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.25);
}
.bookimage-box-detail div
{
      height: 100%;
      width: 100%;
      overflow: hidden;
      border: 1px solid rgba(128, 128, 128, 0.25);
}
.bookimage-box-detail div:hover div
{
    transform: scale(1.1);
}
.bookimage-box-detail div div
{
    position: relative;
    height: 100%;
    width: 100%;
    transition: all 0.2s;
    border: transparent;
}
.bookimage-box-detail div div img
{
    width: 100%;
    height: 100%;
    border: transparent;
}
.bookimage-box-detail span
{
    position: absolute;
    width: 80%;
    height: 37px;
    font-size: 15px;
    color: gray;
    font-family: '华文细黑';
    overflow: hidden;
    left: 10%;
    bottom: 10px;
    text-align: center;
}
.centerbox
{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    margin-left: 3%;
    font-family: '正楷';
}
.centerbox p
{
    margin: 0;
    padding: 0;
}
.centerbox p:nth-of-type(1) span:nth-of-type(1)
{
    font-size: 28px;
    font-weight: 600;
}
.centerbox p:nth-of-type(1) span:nth-of-type(2)
{
    padding-left: 30px;
    font-size: 14px;
    color: rgba(128, 128, 128, 0.75);
}
.centerbox p:nth-of-type(2) .el-tag
{
    width: 70px!important;
    height: 24px!important;
    line-height: 24px;
    text-align: center;
    border-radius: 10px;
    border:1px solid rgba(30, 144, 255, 0.75);
    background: white;

}
.centerbox p:nth-of-type(2) .el-tag:last-child
{
    margin-left: 3%;
}
.centerbox p:nth-of-type(3)
{
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.centerbox p:nth-of-type(4)
{
    font-size: 14px;
    color: rgba(128, 128, 128, 0.55);
}
.centerbox p:nth-of-type(5) button
{
    width: 22%;
    height: 36px;
    background: #BF2C24;
    border: none;
    color: white;
}
.centerbox p:nth-of-type(5) button:last-child
{
    margin-left: 3%;
    color: #3F5A93;
    background: white;
    border: 1px solid rgba(0, 0, 255, 0.58);
}
.rightbox
{
    float: right;
    width: 20%;
    height: 180px;
    text-align: right;
}
.rightbox p:nth-of-type(1)
{
    font-size:24px;
    font-weight: 600;
}
.rightbox p:nth-of-type(1) span
{
    font-size:32px;
    font-weight: 600;
}
.rightbox p:nth-of-type(2)
{
    margin-top: 10px;
    font-size:12px;
    color: rgba(128, 128, 128, 0.56);
}
.tabmenu
{
    width: 80%;
    margin: 30px auto 0;
    max-width: 900px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: rgba(128, 128, 128, 0.68);
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
}
.tabmenu span
{
    display: inline-block;
    width: 110px;
    text-align: center;
    height: 100%;
    font-weight: 600;
}
.tabmenu  span:hover
{
  color: rgba(237, 66, 89, 0.58);
  cursor: pointer;
}
.redcolor
{
    color: #ed4259;
    border-bottom: 2px solid #ed4259;
}
.bookmessage
{
    width: 80%;
    margin: 0 auto;
    max-width: 900px;
    height: 250px;

}
.isplay
{
  display: none;
}
.bookintroduce
{
    float: left;
    width: 70%;
    height: 250px;
    padding: 5px;
    padding-top: 30px;
   overflow: hidden;
}
.bookmessage div
{
    float: left;
    width: 30%;
    height: 250px;
    background: rgb(247,246,242);
}

.bookmessage div img
{
    width: 40%;
    border-radius: 50%;
    margin-top: 35px;
    margin-left: 30%;
}
.bookmessage div p
{
    width: 100%;
    height: 20px;
    font-family: '正楷';
    text-align: center;
}
.bookmessage div p:nth-of-type(1)
{
    margin-top: 10px;
    font-size: 18px;
}
.bookmessage div p:nth-of-type(2)
{
    margin-top: 10px;
    font-size: 12px;
    color: rgba(128, 128, 128, 0.74);
}
.capterslist
{
    width: 80%;
    margin: 0 auto;
    max-width: 900px;
    min-height: 250px;
}
.capterslist h4
{
    height: 50px;
    line-height: 50px;
    font-family: '正楷';
    font-size: 18px;
    font-weight: 800;
    border-bottom: 1px solid black;
}
.capterslist ul
{
    margin: 0;
    width: 100%;
}
.capterslist ul li
{
    float: left;
    line-height: 40px;
    width: 33.33%;
    font-size: 14px;
    color: #262626;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: white;
    border-bottom: 1px solid rgba(128, 128, 128, 0.22);
}
.capterslist ul li:hover
{
  cursor: pointer;
  color: #ed4259;
}
</style>
