<template>
  <div class="wrapper">
    <div class="login_box">
      <h2>牛逼轰轰任务管理系统</h2>
      <div class="user_box">
        <div>
          <span>*</span>用户名：<el-input
            v-model="account"
            placeholder="请输入用户名"
          ></el-input>
        </div>
        <div>
          <span>*</span>密码：<el-input
            type="password"
            v-model="password"
            placeholder="请输入密码"
          ></el-input>
        </div>
        <div>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="toRegister">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginRequest } from "../../api";
export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    toRegister() {
      this.$router.push("/Register");
    },
    async login() {
      try {
        const data = {
          account: this.account,
          password: this.password,
        };
        const res = await loginRequest(data);
        console.log(res);
        if (res) {
          alert("登录成功！！");
        }
      } catch (err) {
        this.errorMessage(err.messsage)
      }
    },
    errorMessage(err) {
      this.$message.error(err);
    },
  },
};
</script>

<style lang='css' scoped>
/* html{
 width: 100%;
 height: 100%;
 background-image: url(../assets/background-img.jpg);
 background-size: cover;
}
body{
 width: 100%;
 height: 100%;
 background-image: url(../assets/background-img.jpg);
 background-size: cover;
} */
.wrapper {
  height: 100vh;
  width: 100%;
  background-image: url(../../assets/background-img.jpg);
  background-size: cover;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  width: 550px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  color: black;
}
h2 {
  padding-top: 10px;
}
.login_box span {
  color: red;
  margin-right: 5px;
}
.user_box {
  color: rgb(133, 133, 133);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: right;
  width: 65%;
  height: 150px;
  margin: 10px auto;
  padding-top: 20px;
}
.el-input {
  width: 75%;
}
.el-button {
  width: 30%;
  /* margin-left: 25%; */
}
</style>