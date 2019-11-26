<template>
  <div class="review">
      <el-table
    :data="unReviewMsg"
    border
    style="width: 100%"
    :show-overflow-tooltip='true'>
    <el-table-column
      fixed
      prop="posttime"
      label="发布时间"
      width="200" align="center">
    </el-table-column>
     <el-table-column
      fixed
      prop="postid"
      label="帖子编号"
      width="200" align="center">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="300" align="center">
    </el-table-column>
    <el-table-column
      prop="userinfo.name"
      label="发布者"
      width="120" align="center">
    </el-table-column>
    <el-table-column
      prop="userinfo.uid"
      label="发布者账号"
      width="120" align="center">
    </el-table-column>
    <el-table-column
      prop="type"
      label="消息类型"
      width="200" align="center">
    </el-table-column>
    <el-table-column
      prop="isemergency"
      label="是否紧急"
      width="120" align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作" width="200" align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="pass(scope.row)">通过</el-button>
        <el-button type="text" size="small" @click="notPass(scope.row)">不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        unReviewMsg: []
      }
    },
    mounted(){
      this.getUnReviewMsg()
    },
    inject: ['reload'],
    methods: {
      getUnReviewMsg(){
        this.$store.dispatch('msg/getUnReviewMsg').then(response => {
          this.unReviewMsg = response.obj
        })
        
        
      },
      handleClick(row) {
        this.$router.push("/msg/postDetail/"+row.postid)
      },
      pass(row){
        const postId = row.postid
        const uidOfpost = row.userinfo.uid
        const userId = sessionStorage.getItem("username")
        this.$store.dispatch('msg/passPost',{'postId':postId,'userId':uidOfpost}).then(response => {
          this.$store.dispatch('msg/hasRead',{'postId':postId,'userId':userId}).then(response => {
            this.$store.dispatch('msg/getUnReadMsgCountByUser').then(response => {
              this.$store.state.msg.currCount = response
            })
          })
          
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.reload()
        })
      },
      notPass(row){
        const postId = row.postid
        this.$store.dispatch('msg/notPass',postId).then(response => {
          this.$store.dispatch('msg/getUnReadMsgCountByUser').then(response => {
            this.$store.state.msg.currCount = response
          })
          
          this.$message({
              message: response.msg,
              type: 'success'
            })
          this.reload()
        })
      }
    }
  }
</script>

<style>
  .review{
    background-color: #FFFFFF;
    padding: 32px;
  }
</style>