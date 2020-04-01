<template>
  <div class="postDetail">
    <div class="postInfo">
      <div class="back">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
      </div>
    </div>
    <div class="title">
      {{postInfo.title}}
    </div>
    <div class="landlord">
      <div class="userInfo">
        <div class="avatar" ref="avatar" style="width: 100px;height: 100px;border: 1px solid #D9D9D9;vertical-align: middle);">
          <img src="../../../../build/logo.png" height="100px" width="100px" />
        </div>
        <div ref="userName" style="margin-top:10px ;">
          <a href="www.baidu.com" v-if="postInfo.userinfo">{{postInfo.userinfo.name}}</a>
        </div>
        <div ref="userDesc" style="margin-top:10px ;margin-bottom: 100px;" v-if="postInfo.userinfo">{{postInfo.userinfo.descr}}</div>
      </div>
      <div class="content">
        <p>{{postInfo.content}}</p>
        <div id="imgDom" @click="enlarge()" v-if="imgLists != '' && imgLists != null && imgLists.length != 0">
          <img :src="item" :key="index" v-for="(item,index) in imgLists" width="80%" height="300px" />
        </div>
      </div>
    </div>
    <!--<div style="border-bottom: 1px solid red;height: 50px;"></div>-->
    <div class="reply" v-for="(item,index) in reply_list" :key="item.replyId">
      <div class="replyUserInfo">
        <div class="avatar" ref="avatar" style="width: 100px;height: 100px;border: 1px solid #D9D9D9;vertical-align: middle);">
          <img src="../../../../build/logo.png" height="100px" width="100px" />
        </div>
        <div ref="userName" style="margin-top:10px ;">
          <a href="www.baidu.com">{{item.userinfo.name}}</a>
        </div>
        <div ref="userDesc" style="margin-top:10px ;margin-bottom: 100px;">{{item.userinfo.descr}}</div>
      </div>
      <div v-html="item.content" class="replyContent"></div>
    </div>
    <div class="textArea">
      <div class="wangeditor">
        <div ref="editorElem" style="text-align: left;"></div>
      </div>
      <div style="text-align: right;background-color: #FFFFFF;width: 100%;">
        <el-button type="primary" @click="reply">回复</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import E from "wangeditor";

  export default {
    data() {
      return {
        postId: this.$route.params.id,
        postInfo: '',
        imgLists: [],
        changeValue: null,
        ee: 0,
        viewer: '',
        editior: null,
        editorContent: '',
        userId: sessionStorage.getItem('username'),
        reply_list: []
      }
    },
    props: ['catchData'],
    inject: ['reload'],
    mounted() {
      this.getUnReviewMsgDetail()
      //    setTimeout(() => {
      //      this.changeValue = 1
      //      this.$nextTick(() => {
      //       this.calcHeight()
      //      })
      //    }, 0)

      this.editor = new E(this.$refs.editorElem);
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      };
      this.editor.customConfig.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ];
      this.editor.create();

    },
    updated() {
   
    },
    methods: {
      getUnReviewMsgDetail() {
        this.$store.dispatch('msg/getUnReviewMsgDetail', this.postId).then(response => {
          const currRole = sessionStorage.getItem("role")
          if(currRole != 'ROLE_ADMIN' && response.obj.isreviewd == 0) {
            this.$message({
              message: "权限不够",
              type: 'error'
            })
            return
          }
          const userId = sessionStorage.getItem("username")
          this.$store.dispatch('msg/hasRead', {
            'postId': this.postId,
            'userId': userId
          }).then(response => {
            this.$store.dispatch('msg/getUnReadMsgCountByUser').then(response => {
              this.$store.state.msg.currCount = response
            })
          })

          this.postInfo = response.obj
          const imgLists = this.postInfo.imglist.split(',')
          if(imgLists != '') {
            for(let i = 0; i < imgLists.length; i++) {
              imgLists[i] = '../../../../..' + imgLists[i]
            }
          }
          this.imgLists = imgLists

          this.$store.dispatch('msg/getReply', this.postId).then(response => {
            this.reply_list = response.obj
          })
        })
      },
      goBack() {
        if(window.history.length <= 1) {
          this.$router.push({
            path: '/home'
          })
          return false
        } else {
          this.$router.go(-1)
        }
      },
      calcHeight() {
        const userInfoH = this.$refs.userInfo.offsetHeight
        const contentH = this.$refs.content.offsetHeight
        const unifiedH = userInfoH > contentH ? userInfoH : contentH
        this.$refs.userInfo.style.height = (unifiedH + 100) + "px"
        this.$refs.content.style.height = (unifiedH + 100) + "px"
        //     alert(unifiedH)
      },
      enlarge() {
        const viewDom = document.getElementById('imgDom')
        this.viewer = new Viewer(viewDom, {
          initialViewIndex: 0,
          button: true, //右上角关闭按钮
          navbar: 2,
          title: 0,
          toolbar: 1,
          keyboard: true,
        })
      },
      reply() {
        const info = {
          post_id: this.postId,
          user_id: this.userId,
          content: this.editorContent
        }
        this.$store.dispatch('msg/reply', info).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.reload()
        })
      },
      ToText(HTML) {
        var input = HTML;
        return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');
      }
    }
  }
</script>

<style scoped>
  .postDetail {
    width: 100%;
    background-color: #FFFFFF;
    /*padding: 32px;*/
  }
  
  .title {
    width: 100%;
    height: 50px;
    /*border-top: 1px solid red;*/
    line-height: 8px;
    border-bottom: 1px solid #A6A9AD;
    padding: 20px;
  }
  
  .postInfo {
    padding: 20px;
    width: 100%;
    background-color: #B3D8FF;
  }
  
  .landlord {
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #B3C0D1;
    /*border-bottom: 1px solid red;*/
  }
  
  .reply {
    width: 100%;
    border-bottom: 1px solid #B3C0D1;
    overflow: hidden;
   
  }
  
  .userInfo {
    width: 12%;
    float: left;
    background-color: rgb(252, 252, 252);
    /*border: 1px solid red;*/
    padding: 25px;
    text-align: center;
    padding-bottom: 10000px;
    margin-bottom: -10000px;
  }
  
  .replyUserInfo {
    width: 12%;
    float: left;
    background-color: rgb(252, 252, 252);
    /*border: 1px solid red;*/
    padding: 25px;
    text-align: center;
    padding-bottom: 10000px;
    margin-bottom: -10000px;
  }
  
  .content {
    width: 88%;
    float: right;
    background-color: #FFFFFF;
    padding: 20px;
    padding-bottom: 10000px;
    margin-bottom: -10000px;
  }
  
  .replyContent {
    width: 88%;
    float: right;
    background-color: #FFFFFF;
    padding: 20px;
    padding-bottom: 10000px;
    margin-bottom: -10000px;
  }
  
  #imgDom {
    /*height: 300px;*/
    cursor: zoom-in;
  }
</style>