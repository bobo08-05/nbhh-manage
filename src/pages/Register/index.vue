<template>
  <div class="wrapper">
    <div class="register_box">
      <h2>用户注册</h2>
      <div class="form_box">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="account">
            <el-input
              type="text"
              v-model="ruleForm.account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
              type="text"
              v-model="ruleForm.nickName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱号" prop="email" class="emailBox">
            <el-input
              type="text"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
            <el-button
              style="padding: 12px 10px"
              :disabled="isDisable"
              type="primary"
              @click="submitEmail"
              >{{ isDisable ? `${num}s` : "获取验证码" }}</el-button
            >
          </el-form-item>
          <el-form-item label="验证码" prop="emailCode" required>
            <el-input
              type="text"
              v-model="ruleForm.emailCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" required>
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" required>
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { registerRequest, emailCodeRequest } from "../../api";
export default {
  name: "Register",
  data() {
    // let validateAccount = (rule, value, callback) => {
    //   if (value === "") {
    //     return callback(new Error("用户名不能为空"));
    //   } else {
    //     if (this.ruleForm.account !== "") {
    //       this.$refs.ruleForm.validateField("account");
    //     }
    //     return callback();
    //   }
    // };
    // let validateNickName = (rule, value, callback) => {
    //   if (value === "") {
    //     return callback(new Error("昵称不能为空"));
    //   } else {
    //     if (this.ruleForm.nickName !== "") {
    //       this.$refs.ruleForm.validateField("nickName");
    //     }
    //     return callback();
    //   }
    // };
    // let validateEmail = (rule, value, callback) => {
    //   if (value === "") {
    //    return callback(new Error("邮箱不能为空"));
    //   } else {
    //     if (this.ruleForm.email !== "") {
    //       this.$refs.ruleForm.validateField("email");
    //     }
    //     return callback();
    //   }
    // };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      num: 60,
      isDisable: false,
      codeStatus: 1,
      ruleForm: {
        account: "",
        password: "",
        nickName: "",
        email: "",
        emailCode: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ required: true, message: '用户名不能为空'}],
        nickName: [{ required: true, message: '昵称不能为空'}],
        email: [{ required: true, message: '邮箱不能为空'}],
      },
    };
  },
  methods: {
    async submitEmail() {
      try {
         const email = this.ruleForm.email;
      console.log(email);
      const res = await emailCodeRequest(email);
      console.log(res);
      if (res.status === "success") {
        this.isDisable = true;
        const timer = setInterval(() => {
          this.num--;
          if (this.num === 0) {
            this.isDisable = false;
            this.num = 60;
            clearInterval(timer);
          }
        }, 1000);
      }
      } catch (error) {
        this.errorMessage(error.messsage)
      }
  
    },
    submitForm(formName) {
      let userInfo = this.ruleForm;
      this.$refs[formName].validate(async (valid) => {
        try {
           if (valid) {
          const res = await registerRequest(userInfo);
          if (res) {
            this.successMessage();
            setTimeout(()=>{
              this.$router.push('/Login')
            },3000)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
        } catch (err) {
        this.errorMessage(err.messsage)
        }
       
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    successMessage() {
      this.$message({
        message: "恭喜你，注册成功，3秒后将会自动跳转到登录页面",
        type: "success",
      });
    },
    errorMessage(err) {
      this.$message.error(err);
    },
  },
};
</script>

<style>
body{
  padding: 0;
  margin: 0;
}
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
.register_box {
  width: 500px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  color: black;
}
.form_box {
  width: 75%;
  margin: 0 auto;
  transform: translateX(-30px);
}
.emailBox .el-button {
  padding: 12px 5px;
  font-size: 12px;
  margin-left: 6px;
  width: 82px;
}
.emailBox .el-input {
  width: 68%;
}
.el-input__inner {
  padding: 0 5px;
}
/* .interval{
  width: 60px;
  height: 12px;
  padding: 10px 6px;
  font-size: 14px;
  background-color: aliceblue;
} */
</style>