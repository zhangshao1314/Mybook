<template>

        <div class="container">
            <div class="header">
                <div class="header-left">
                    <i class="iconfont iconxieboke"></i><span></span><span>{{releaseinfo.nowbookname}}</span>
                </div>
                <div class="capters">最新章节·{{nowcaptersnum}} {{nowcaptersname}}</div>
                <div class="btnoperator">
                    <button @click="Createdraft">保存</button>
                    <button @click="release">{{btntext}}</button>
                </div>
            </div>
            <div class="operatormenu">
                <ul>
                    <li>
                        <i class="el-icon-document-add"></i><span @click="toaddcapters">新建章节</span>
                    </li>
                    <li>
                        <i class="el-icon-position"></i><span>已发布(共{{capterslistcount}}章)</span><i :class="iconlist" @click="toggleicon"></i>
                    </li>
                    <div class="cao">
                    <div>
                        <li v-for="item in capterslist" :title="item.chaptersnum+' '+item.chaptersname" :class="{showtime:isshow}" @click="editcapters(item.chaptersnum,item.bookid,item.chaptersname)"><el-tag>{{item.chaptersnum}} {{item.chaptersname}}</el-tag></li>
                    </div>
                    </div>
                    <li>
                        <i class="el-icon-edit-outline"></i><span>草稿箱(共{{draftcapterslistcount}}章)</span><i :class="iconlist2" @click="toggleicon2"></i>
                    </li>
                   <div class="cao">
                    <div>
                        <li v-for="item in draftcapterslist" :title="item.chaptersnum+' '+item.chaptersname" :class="{showtime2:isshow2}" @click="editcaptersdraft(item.chaptersnum,item.bookid,item.chaptersname)"><el-tag closable @close="deletedarft(item.chaptersname)">{{item.chaptersnum}} {{item.chaptersname}}</el-tag></li>
                    </div>
                 </div>
                </ul>
            </div>
            <div class="writespace">
               <p><i class="el-icon-warning-outline"></i>请注意：严禁上传任何情色、低俗、涉政等违法违规内容。一旦查实，视情节严重程度全书屏蔽整改起步并取消福利，直至报警处理。</p>
               <div class="editspace">
                   <input type="text"  v-model="releaseinfo.captersnumandname" placeholder="请输入章节号与章节名。示例：“第一章 陨落的天才”">
                   <textarea v-model="releaseinfo.capterscontent" placeholder="请输入正文"></textarea>
               </div>
            </div>
        </div>
</template>
<script>
export default {
  created () {
    this.getbooknameandcaptersname()
    document.onselectstart = new Function('event.returnValue=false')
  },
  data () {
    return {
      btntext: '发布',
      nowcaptersname: '',
      nowcaptersnum: '',
      releaseinfo: {
        oldcaptersnum: '',
        oldcaptersname: '',
        nowbookname: '',
        bookid: '',
        captersnumandname: '',
        capterscontent: ''
      },
      isshow: true,
      isshow2: true,
      capterslist: [],
      capterslistcount: 0,
      draftcapterslist: [],
      draftcapterslistcount: 0,
      iconlist: {
        'el-icon-caret-right': true,
        'el-icon-caret-bottom': false
      },
      iconlist2: {
        'el-icon-caret-right': true,
        'el-icon-caret-bottom': false
      }

    }
  },
  methods: {
    async getbooknameandcaptersname () {
      this.releaseinfo.nowbookname = window.sessionStorage.getItem('nowbookname')
      this.nowcaptersname = window.sessionStorage.getItem('nowcaptersname')
      this.nowcaptersnum = window.sessionStorage.getItem('nowcaptersnum')
      this.releaseinfo.bookid = window.sessionStorage.getItem('bookid')
      const { data: res } = await this.$http.post('/GetbookCapters', { bookname: this.releaseinfo.nowbookname })
      if(res.status=='200')
      {
          this.capterslist = res.data
          console.log('list', res.data)
          this.capterslistcount = res.data.length
      }
      else
      {
          return this.$message.warning('登录过期，请重新登录...')
      }

      const { data: resdata } = await this.$http.post('/GetbookCaptersdraft', { bookname: this.releaseinfo.nowbookname })
      this.draftcapterslist = resdata.data
      this.draftcapterslistcount = resdata.data.length
    },
    async release () {
      if (this.btntext == '发布') {
          const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'发布章节'})
          if(reslist.status=='200')
          {
              if (this.releaseinfo.captersnumandname.trim().indexOf(' ') != -1 && this.releaseinfo.capterscontent.length > 20) {
                  const { data: res } = await this.$http.post('/Release', this.releaseinfo)
                  if (res.status == '200') {
                      this.getbooknameandcaptersname()
                      this.releaseinfo.captersnumandname = ''
                      this.releaseinfo.capterscontent = ''
                      return this.$message.success('发布章节成功')
                  } else if (res.status == '201') {
                      return this.$message.error('发布章节失败')
                  }
              } else {
                  return this.$message.error('请检查章节内容字数是否达标,以及章节数和章节名是否保留一个空格')
              }
          }
          else if(reslist.status=='201')
          {
              return this.$message.warning("您当前没有发布章节权限，如需请联系管理员")
          }
          else
          {
              return this.$message.error("登录过期，请重新登录...")
          }

      } else {
          const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'修改章节'})
          if(reslist.status=='200')
          {
              if (this.releaseinfo.captersnumandname.trim().indexOf(' ') != -1 && this.releaseinfo.capterscontent.length > 20) {
                  const { data: res } = await this.$http.post('/Updatecapters', this.releaseinfo)
                  if (res.status == '200') {
                      this.getbooknameandcaptersname()
                      this.releaseinfo.captersnumandname = ''
                      this.releaseinfo.capterscontent = ''
                      return this.$message.success('修改章节成功')
                  } else if (res.status == '201') {
                      return this.$message.error('修改章节失败')
                  }
              } else {
                  return this.$message.error('请检查章节内容字数是否达标,以及章节数和章节名是否保留一个空格')
              }
          }
          else if(reslist.status=='201')
          {
              return this.$message.warning("您当前没有修改章节权限，如需请联系管理员")
          }
          else
          {
              return this.$message.error("登录过期，请重新登录...")
          }

      }
    },
    async Createdraft () {
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'保存草稿'})
    if(reslist.status=='200')
    {
        if ((this.releaseinfo.captersnumandname.trim().indexOf(' ') != -1) && (this.releaseinfo.capterscontent.length > 20)) {
            const { data: res } = await
            this.$http.post('/Createdraft', this.releaseinfo)
            if (res.status == '200') {
                this.releaseinfo.captersnumandname = ''
                this.releaseinfo.capterscontent = ''
                this.getbooknameandcaptersname()
                return this.$message.success('草稿保存成功')
            } else if (res.status == '201') {
                return this.$message.error('草稿保存失败')
            }
        } else {
            return this.$message.error('请检查章节内容字数是否达标,以及章节数和章节名是否保留一个空格')
        }
    }
    else if(reslist.status=='201')
    {
        return this.$message.warning("您当前没有保存草稿权限，如需请联系管理员")
    }
    else
    {
        return this.$message.error("登录过期，请重新登录...")
    }

    },
    toggleicon () {
      this.iconlist['el-icon-caret-right'] = !this.iconlist['el-icon-caret-right']
      this.iconlist['el-icon-caret-bottom'] = !this.iconlist['el-icon-caret-bottom']
      if (!this.iconlist['el-icon-caret-right']) {
        this.isshow = false
        this.isshow2 = true
        this.iconlist2['el-icon-caret-right'] = true
        this.iconlist2['el-icon-caret-bottom'] = false
      } else {
        this.isshow = true
      }
    },
    toggleicon2 () {
      this.iconlist2['el-icon-caret-right'] = !this.iconlist2['el-icon-caret-right']
      this.iconlist2['el-icon-caret-bottom'] = !this.iconlist2['el-icon-caret-bottom']
      if (!this.iconlist2['el-icon-caret-right']) {
        this.isshow2 = false
        this.isshow = true
        this.iconlist['el-icon-caret-right'] = true
        this.iconlist['el-icon-caret-bottom'] = false
      } else {
        this.isshow2 = true
      }
    },
    async editcapters (num, id, name) {
      this.btntext = '修改'
      this.releaseinfo.bookid = id
      this.releaseinfo.oldcaptersnum = num
      this.releaseinfo.oldcaptersname = name

      const { data: res } = await this.$http.post('/Updatecaptersinfo', this.releaseinfo)
      if(res.status=='200')
      {
          this.releaseinfo.captersnumandname = res.data.chaptersnum + ' ' + res.data.chaptersname
          this.releaseinfo.capterscontent = res.data.chapterscontent
          return this.$message.warning('已开启修改模式')
      }
      else
      {
          return this.$message.error('登录过期，请重新登录...')
      }

    },
    async editcaptersdraft (num, id, name) {
        this.btntext = '发布'
      this.releaseinfo.bookid = id
      this.releaseinfo.oldcaptersnum = num
      this.releaseinfo.oldcaptersname = name

      const { data: res } = await this.$http.post('/Updatecaptersinfodraft', this.releaseinfo)
    if(res.status=='200')
    {
        this.releaseinfo.captersnumandname = res.data.chaptersnum + ' ' + res.data.chaptersname
        this.releaseinfo.capterscontent = res.data.chapterscontent
    }
    else
    {
        return this.$message.error('登录过期，请重新登录...')
    }

    },
    toaddcapters () {
      this.btntext = '发布'
      return this.$message.warning('已开启发布模式')
    },
    async deletedarft (captersname) {
    const {data:reslist}=await this.$http.post('/Ishavepermission ', {username:window.sessionStorage.getItem('username'),type:'删除草稿'})
    if(reslist.status=='200')
    {
        this.releaseinfo.oldcaptersname = captersname
        const { data: res } = await this.$http.post('/Deletecaptersdraft', this.releaseinfo)
        if (res.status == '200') {
            this.getbooknameandcaptersname()
            return this.$message.success('删除草稿成功')
        } else if (res.status == '201') {
            return this.$message.error('删除草稿失败')
        }
    }
    else if(reslist.status=='201')
    {
        return this.$message.warning("您当前没有删除草稿权限，如需请联系管理员")
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
.container
{
    width: 100%;
    height: 100%;
    min-width: 885px;
    background: white;
}
.header
{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(128, 128, 128, 0.41);
}
.header-left
{
    display: flex;
    align-items: center;
    font-family: '正楷';
}
.header-left i
{
    font-size: 30px;
    color: blue;
}
.header-left span:nth-of-type(1)
{
    display: inline-block;
    width: 1px;
    height: 25px;
    margin: 0 10px;
    background: rgba(128, 128, 128, 0.49);
}
.header-left span:nth-of-type(2)
{
    font-size: 18px;
    font-weight: 600;
    color: rgba(128, 128, 128, 0.67);
}
.capters
{
    font-size: 18px;
    font-weight: 800;
    color: rgba(128, 128, 128, 0.71);
}
.btnoperator button
{
    height: 30px;
    line-height: 30px;
    background: white;
    border-radius: 5px;
    width: 60px;
    outline: none;
    border: 1px solid gray;
}
.btnoperator button:first-child
{
    margin-right: 10px;
}
.btnoperator button:last-child
{
    background: rgba(0,103,230);
    color: white;
    border: transparent;
}
.btnoperator button:nth-child(1):hover
{
    color: rgba(0,103,230);
    border: 1px solid rgba(0, 0, 255, 0.56);
}
.btnoperator button:nth-child(2):hover
{
    background:rgba(0,103,180);
}
.operatormenu
{
    float: left;
    width: 20%;
    max-width: 250px;
    padding-top: 10px;
    height: calc(100% - 51px - 20px);
}
.operatormenu li
{
    padding:0 10px 0 20px;
    line-height: 50px;
    font-size: 15px;
    color: rgba(128, 128, 128, 0.99);
    font-family: '正楷';
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.el-tag
{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%!important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.operatormenu li:nth-of-type(1):hover
{
    cursor: pointer;
    color: rgba(0, 0, 255, 0.47);
}
.operatormenu .cao
{
    width: 100%;
    max-height: 200px;
    overflow: hidden;
}
.cao div
{
    width: calc(100% + 20px);
    max-height: 200px;
    overflow: auto;
}
.operatormenu .cao div li
{
    line-height: 0;
    padding-left: 20px;
}
.operatormenu .cao div li:hover
{
    cursor: pointer;
}
div::-webkit-scrollbar {display:none}
ul li i:nth-of-type(1)
{
    padding-right: 10px;
}
ul li i:nth-of-type(2)
{
    position: relative;
    top: 22px;
    font-size: 12px;
    float: right;

}
ul
{
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
}

.writespace
{

    float: left;
    width: 80%;
    height: calc(100% - 51px);
    background: rgb(245,245,245);
}
.writespace p
{
    width: 100%;
    font-size: 12px;
    color: red;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.editspace
{
    width: 70%;
    padding: 0 20px;
    margin-left: 15%;
    margin-top: 30px;
    height: calc(100% - 45px);
    background: white;
}
.editspace input
{
    width: 100%;
    height: 40px;
    border: none;
    font-size: 18px;
    outline: none;
    border-bottom: 1px solid rgba(128, 128, 128, 0.55);
}
.editspace textarea
{
    margin-top: 30px;
    width: 100%;
    outline: none;
    border: none;
    resize: none;
    font-size: 16px;
    font-family: '正楷';
    height: calc(100% - 28px - 50px);
}
.showtime
{
    display: none;
}
.showtime2
{
    display: none;
}
</style>
