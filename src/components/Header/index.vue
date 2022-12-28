<template>
  <div class="header_box">
    <div class="header">
    <h3>牛逼轰轰任务管理系统</h3>
    <div class="header_right">
      <span>admin</span>
      <i>|</i>
      <a href="">退出登录</a>
    </div>
    </div>

  </div>
</template>

<script>
export default {
 name:'Header'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  color: #e8e8e8;
}
.header_box{
  background-color: #409EFF;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  color: #e8e8e8;
}
.header{
    display: flex;
  justify-content: space-between;
}
.header_right i{
  padding: 6px;
}
.header_right a{
 font-size: 13px;
}
</style>