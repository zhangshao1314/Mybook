<template>
  <div class="readbookcontainer">
      <div class="navbox">
      <el-breadcrumb class="mycsstest" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item  :to="{ path: '/Booklist' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$store.state.bookinfo.bookid.bookname}}</el-breadcrumb-item>
          <el-breadcrumb-item>章节阅读</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="bookspace">
          <div class="bookspace-left">
              <div @click="opendrawer"><i class="el-icon-s-grid"></i>目录</div>
              <div><i class="el-icon-setting"></i><el-popover placement="right-start"trigger="click" class="mybuttoncss">
                  <div class="mysetttings">
                      <p>设置</p>
                      <div><i>阅读主题</i>
                      <span class="firstcolor" @click="changecolor('rgba(248,243,233)')" :class="[backcolor=='rgba(248,243,233)' ? 'clickbordercolor' : '']"><i class="el-icon-check" :class="[backcolor=='rgba(248,243,233)' ? 'toplay' : '']"></i></span>
                      <span class="seconedcolor" @click="changecolor('rgba(243,234,201)')" :class="[backcolor=='rgba(243,234,201)' ? 'clickbordercolor' : '']"><i class="el-icon-check" :class="[backcolor=='rgba(243,234,201)' ? 'toplay' : '']"></i></span>
                      <span class="thirdcolor" @click="changecolor('rgba(225,237,225)')" :class="[backcolor=='rgba(225,237,225)' ? 'clickbordercolor' : '']"><i class="el-icon-check" :class="[backcolor=='rgba(225,237,225)' ? 'toplay' : '']"></i></span>
                      <span class="fourtcolor" @click="changecolor('rgba(227,240,244)')" :class="[backcolor=='rgba(227,240,244)' ? 'clickbordercolor' : '']"><i class="el-icon-check" :class="[backcolor=='rgba(227,240,244)' ? 'toplay' : '']"></i></span>
                      <span class="fivecolor" @click="changecolor('rgba(245,228,228)')" :class="[backcolor=='rgba(245,228,228)' ? 'clickbordercolor' : '']"><i class="el-icon-check" :class="[backcolor=='rgba(245,228,228)' ? 'toplay' : '']"></i></span>
                      </div>
                      <div><i>正文字体</i><span @click="fontstyle('华文细黑')" :class="[fontfamily=='华文细黑' ? 'zitiborder' : '']">雅黑</span><span  @click="fontstyle('宋体')" :class="[fontfamily=='宋体' ? 'zitiborder' : '']">宋体</span><span  @click="fontstyle('行楷')" :class="[fontfamily=='行楷' ? 'zitiborder' : '']">行楷</span></div>
                      <div><i>正文大小</i><span class="spanbox"><span @click="fontsizedown">A-</span><span>{{fontsize + 'px'}}</span><span @click="fontsizeup">A+</span></span></div>
                  </div>
                <span slot="reference">设置</span>
              </el-popover></div>
              <div  @click="backaddr" style="cursor: pointer"><i class="el-icon-refresh-left"></i>返回</div>
          </div>
          <div class="bookspace-right">
              <div class="introduce" :style="{background:backcolor,fontFamily:fontfamily}">
                 <div class="introducebox" >
                    <div class="bookimage-box2" :style="{fontFamily:fontfamily}"><div><div><img src="../../assets/images/book.png" alt="123" title=""><span>{{this.$store.state.startbookname}}</span></div></div></div>
                    <p :style="{fontFamily:fontfamily}">{{this.$store.state.startbookname}}</p>
                    <p :style="{fontFamily:fontfamily}">{{this.$store.state.startauthname}} 著</p>
                    <p :style="{fontFamily:fontfamily}"><span>{{this.$store.state.bookinfo.bookid.category}}</span><span>{{this.$store.state.bookinfo.bookid.status}}</span></p>
                    <p :style="{fontFamily:fontfamily}"><span>类型</span><span>状态</span></p>
                    <p :style="{fontFamily:fontfamily}">{{this.$store.state.bookinfo.bookid.Introduction}}</p>
                    <p :style="{fontFamily:fontfamily}">本书由光凯中文网发起</p>
                    <p :style="{fontFamily:fontfamily}"><i class="el-icon-view"></i>如有侵权，违者必究</p>
                 </div>
           </div>
           <div class="capterscontent" :style="{background:backcolor}">
             <p  :style="{fontFamily:fontfamily}">{{this.$store.state.startcaptersnum}} {{this.$store.state.startchaptersname}} <p><i class="el-icon-notebook-2"></i><span  :style="{fontFamily:fontfamily}">{{this.$store.state.startbookname}}</span><i class="el-icon-s-custom"></i><span  :style="{fontFamily:fontfamily}">{{this.$store.state.startauthname}}</span></p></p>
              <div class="content" :style="{fontFamily:fontfamily,fontSize:fontsize+'px'}">
                {{this.$store.state.startchapterscontent}}
              </div>
           </div>
           <div  class="nextcontent" :style="{background:backcolor}">
             <span @click="Backcontent">上一章</span>
             <span @click="opendrawer">目录</span>
             <span @click="Nextcontent">下一章</span>
           </div>
          </div>
      </div>
    <el-drawer title="章节目录" :with-header="false" :visible.sync="drawer" :direction="direction" :before-close="handleClosedrawer">
        <h1 class="drawerh1">{{this.$store.state.bookinfo.bookid.bookname}}·章节目录</h1>
        <div class="drawercapterslist">
            <h4>共{{this.$store.state.bookcapterslist.length}}章</h4>
            <ul>
              <li v-for="item,index in this.$store.state.bookcapterslist" @click="drawereadcontent(item.bookname,item.chaptersnum,item.chaptersname,index+2)">{{item.chaptersnum}} {{item.chaptersname}}</li>
            </ul>
        </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
      data(){
          return {
            backcolor:'rgba(248,243,233)',
            fontfamily:'华文细黑',
            fontsize:16,
            drawer: false,
            direction: 'rtl',
          }
      },
      methods:{
          backaddr(){
            this.$router.go(-1)
          },
         async Nextcontent(){
            this.$store.state.currenindex++
            const {data:res}=await this.$http.post('Nextbookcapterslistbyname',{bookname:this.$store.state.bookinfo.bookname,sum:this.$store.state.currenindex})
           if(res.data[0])
           {
               this.$store.state.startbookname=res.data[0].bookname
               this.$store.state.startauthname=this.$store.state.bookinfo.bookid.authname
               this.$store.state.startcaptersnum=res.data[0].chaptersnum
               this.$store.state.startchaptersname=res.data[0].chaptersname
               this.$store.state.startchapterscontent=res.data[0].chapterscontent
           }
           else
           {
                this.$store.state.currenindex--
                return this.$message.warning("已经是最后一章了，亲~")
           }

          } ,
          async Backcontent(){
         if(this.$store.state.currenindex>1)
         {
              this.$store.state.currenindex--
             const {data:res}=await this.$http.post('Nextbookcapterslistbyname',{bookname:this.$store.state.bookinfo.bookname,sum:this.$store.state.currenindex})
             this.$store.state.startbookname=res.data[0].bookname
             this.$store.state.startauthname=this.$store.state.bookinfo.bookid.authname
             this.$store.state.startcaptersnum=res.data[0].chaptersnum
             this.$store.state.startchaptersname=res.data[0].chaptersname
             this.$store.state.startchapterscontent=res.data[0].chapterscontent
         }
         else
         {
            return this.$message.error("已经是第一章了！亲")
         }

          },
          changecolor(color){
              this.backcolor=color
          },
          fontstyle(size){
              this.fontfamily=size
          },
          fontsizeup(){
              this.fontsize+=2
          },
          fontsizedown(){
              this.fontsize-=2
          },
          opendrawer(){
              this.drawer=true
          },
          handleClosedrawer(){
            this.drawer=false
          },
          async drawereadcontent(bookname,num,name,index){
            const {data:res}=await this.$http.post('/Getbookcapterslistbyname',{bookname:bookname,sum:num,name:name})
            this.$store.state.startbookname=res.data.bookname
            this.$store.state.startauthname=this.$store.state.bookinfo.bookid.authname
            this.$store.state.startcaptersnum=res.data.chaptersnum
            this.$store.state.startchaptersname=res.data.chaptersname
            this.$store.state.startchapterscontent=res.data.chapterscontent
            this.$store.state.currenindex=index
            this.$router.push('/Readbook')
          }
      }
}
</script>
<style lang="less">
*
{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.readbookcontainer
{
  width: 100%;
  height:calc(100vh - 60px);
  overflow: auto;
  background: url(https://img1.qidian.com/upload/gamesy/2020/03/16/20200316133504e2pmmjttz2.jpg) no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.navbox
{
  padding: 20px 20% 0;
}
.mycsstest .el-breadcrumb__inner
{
  color: black!important;
}
.bookspace
{
  padding-top: 20px;
  width: 77%;
  min-width: 855px;
  max-width: 880px;
  margin-left: 10%;
  height: 500px;
}

.bookspace-left
{
  float: left;
  width: 60px;
  background: rgba(248,243,233);
}
.bookspace-left div
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60px;
  font-size: 14px;
  color: rgba(128, 128, 128, 0.51);
  text-align: center;
}
.bookspace-left div:hover
{
  cursor: pointer;
  color: black;
}
.bookspace-left div i
{
  color: black;
  font-size: 23px;
  font-weight: 600;
}
.bookspace-right
{
  float: right;
  width: 782px;
}

.introduce
{
  width: 100%;
  height: 664px;
  padding: 8px;
  /*background:rgba(248,243,233) ;*/
}
 .introducebox
{
  width: 100%;
  height: 100%;
  font-family: '正楷';
  border: 1px solid rgba(128, 128, 128, 0.15);
}
.introducebox p:nth-of-type(1)
{
  margin-top: 24px;
  text-align: center;
  font-size: 32px;
  color: #262626;
  font-family: '正楷';
}
.introducebox p:nth-of-type(2)
{
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: rgba(128, 128, 128, 0.71);
}
.introducebox p:nth-of-type(3)
{
    margin-top: 20px;
    text-align: center;
    height: 24px;
    color: #262626;
    font-size: 18px;
}
.introducebox p:nth-of-type(3) span
{
  display: inline-block;
  width: 15%;
  height: 24px;
  line-height: 24px;
}
.introducebox p:nth-of-type(4)
{
    text-align: center;
    height: 24px;
    font-size: 12px;
    color: rgba(128, 128, 128, 0.58);
}
.introducebox p:nth-of-type(4) span
{
  display: inline-block;
  width: 15%;
  height: 24px;
  line-height: 24px;
}
.introducebox p:nth-of-type(5)
{
  margin: 40px auto 0;
  width: 300px;
  max-height: 100px;
  height: 100px;
  text-align: center;
  font-size: 15px;
  color: gray;
  word-wrap:break-word;
}
.introducebox p:nth-of-type(6)
{
  text-align: center;
  color: gray;
}
.introducebox p:nth-of-type(7)
{
  margin-top: 5px;
  text-align: center;
  color: gray;
}

.capterscontent
{
  padding: 64px;
  margin-top: 20px;
  color: #262626;
  width: 100%;
  min-height: 800px;
  /*background:rgba(248,243,233) ;*/
}
.capterscontent p
{
  font-size: 24px;
}
.capterscontent p span
{
  font-size: 13px;
  color: rgba(128, 128, 128, 0.62);
}
.capterscontent p i
{
  padding-right: 2px;
  font-size: 13px;
  color: rgba(128, 128, 128, 0.62);
}
.capterscontent p span:nth-of-type(1)
{
  padding-right: 20px;
}
.content
{
  padding-top: 20px;
  height: calc(100% - 64px - 64px);
  word-wrap:break-word;
}
.nextcontent
{
  margin-top: 20px;
  height: 50px;
  /*background:rgba(248,243,233)*/
}
.nextcontent span
{
  display: inline-block;
  width: 33.33%;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
}
.nextcontent span:hover
{
  cursor: pointer;
  background: rgba(128, 128, 128, 0.11);
}
.bookimage-box2
{
  margin: 60px auto 0;
  position: relative;
  width: 130px;
  height: 180px;
  background: rgba(128, 128, 128, 0.24);
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.25);
}
.bookimage-box2 div
{
    height: 100%;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(128, 128, 128, 0.25);
}
.bookimage-box2 div div
{
    position: relative;
    height: 100%;
    width: 100%;
    transition: all 0.2s;
    border: transparent;
}
.bookimage-box2 div div img
{
    width: 100%;
    height: 100%;
    border: transparent;
}
.bookimage-box2 div:hover div
{
    transform: scale(1.1);
}
.bookimage-box2 span
{
    position: absolute;
    width: 80%;
    height: 37px;
    font-size: 16px;
    color: gray;
    font-family: '华文细黑';
    overflow: hidden;
    left: 10%;
    bottom: 10px;
    text-align: center;
}

.mybuttoncss .el-button
{
  padding: 0!important;
}

.mysetttings
{
  width: 400px;
  height:250px;
}
.mysetttings p
{
  font-size: 25px;
  font-weight: 600;
}
.mysetttings div:nth-of-type(1)
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
.mysetttings div i
{
 font-style: normal;
}
.mysetttings div:nth-of-type(1) span
{
  display: inline-block;
  width:40px ;
  height:40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #ed4259;
  border-radius: 50%;
  border: 1px solid gray;
}
.mysetttings div:nth-of-type(1) span i
{
  display: none;
  font-weight: 800;
}

.mysetttings div:nth-of-type(1) span:nth-of-type(1)
{
  display: inline;
}
.mysetttings div:nth-of-type(2) span
{
  display: inline-block;
  height: 35px;
  margin-left: 30px;
  width: 80px;
  line-height: 35px;
  text-align: center;
  border: 1px solid rgba(0, 0, 255, 0.34);
}
.mysetttings div:nth-of-type(1) span:hover
{
  cursor: pointer;
}
.mysetttings div:nth-of-type(2) span:hover
{
  color: #ed4259;
  cursor: pointer;
}
.mysetttings div:nth-of-type(3)
{
  height: 40px;
  margin-top: 20px;
}
.mysetttings div:nth-of-type(3) .spanbox
{
  margin-left: 30px;
  display: inline-block;
  width: 300px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid rgba(128, 128, 128, 0.35);
}
.spanbox span
{
  font-size: 16px;
  font-weight: 600;
}
.spanbox span:nth-of-type(2)
{
  display: inline-block;
  margin: 0 30px;
}
.spanbox  span:hover
{
  cursor: pointer;
  color: #ed4259;
}
.firstcolor
{
  background: rgba(248,243,233);
}
.seconedcolor
{
  background: rgba(243,234,201);
}
.thirdcolor
{
  background: rgba(225,237,225);

}.fourtcolor
{
  background: rgba(227,240,244);
}
.fivecolor
{
  background: rgba(245,228,228);
}
.clickbordercolor
{
  border: 1px solid #ed4259!important;
}
.toplay
{
  line-height: 40px!important;
  font-weight: 800;
  display: block!important;
}
.zitiborder
{
  border: 1px solid #ed4259!important;
  color: #ed4259;
}
.drawerh1
{
  font-size: 20px;
  padding:20px;
}
.drawercapterslist
{
  width: 100%;
  max-height: 100%;
  overflow: auto;
  padding: 20px;
}
.drawercapterslist ul
{
  margin: 0;
  width: 100%;
  height: 100%;
}
.drawercapterslist ul li
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
.drawercapterslist ul li:hover
{
  cursor: pointer;
  color: #ed4259;
}

</style>
