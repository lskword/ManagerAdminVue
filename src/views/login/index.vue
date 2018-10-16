<!-- Copyright (c) 2018 by CoolLsk. All Rights Reserved. -->
<style scoped>
.right {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}

.login_header {
  text-align: left;
}

.loginBox {
  max-width: 400px;
  min-width: 300px;
  padding: 0 10%;
  margin: 50px auto;
}

#v_container {
  border: 1px solid #000;
  width: 30%;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border-radius: 5px;
}

h1 {
  margin: 20px auto;
}

.prompt {
  font-size: 10px;
  margin-top: 40px;
}
.logo,
#v_container_box {
  text-align: center;
}
</style>


<template>
<div class="box">
  <div class="logo">
    <img class='right' src="@/assets/logo.png" alt="">
    <div>
      <h1 >综合管理后台</h1>
      <p>532016205@qq.com</p>
    </div>
  </div>
  <div class="loginBox">
    <transition name="el-zoom-in-center">
      <div v-show="lock_xx">
        <h3 class="login_header">
            用户登录
          </h3>
        <div class="form_box">
          <el-form :model="formInline" :rules="ruleInline" ref="formInline" class="demo-ruleForm">
            <el-form-item prop="user">
              <el-input v-model="formInline.user" placeholder="请输入登录账号" suffix-icon="el-icon-u-yonghutouxiang">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" @keyup.enter.native="handleSubmit('formInline')" v-model="formInline.password" placeholder="请输入密码" suffix-icon="el-icon-u-icon-test"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input v-model="yzm" placeholder="请输入验证码" @keyup.enter.native="handleSubmit('formInline')" style="width:45%;float:left;"></el-input>
              <div id="v_container_box" style="width:55%;height:100;float:right;">
                <span onselectstart="return false" id="v_container" >{{checkCode}}</span>
                <span @click="createCode" class="text" onselectstart="return false">不清楚,换一张</span>
              </div>
            </el-form-item>
            <el-form-item prop="check">
              <el-checkbox v-model="checked" style="float: left;">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-button type="primary" style="width:100%;" :loading="loadLock" @click="handleSubmit('formInline')">登录</el-button>
            </el-form-item>

          </el-form>
        </div>
        <div class="prompt">
          Copyright (c) 2018 Copyright Holder All Rights Reserved.
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
var path = ''
import { login } from '@/api/userAction'

import {
  setToken
} from '@/utils/auth'
import {
  mapGetters
} from "vuex"
export default {
  data() {
    return {
      // 加载中
      loadLock: false,
      formInline: {
        user: '',
        password: ""
      },
      ruleInline: {
        user: [{
          required: true,
          message: '请输入账户',
          trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            message: '密码长度不能低于6位数',
            trigger: 'blur'
          }
        ]
      },
      checkCode: '',
      yzm: '',
      checked: true,
      lock_xx: false
    }
  },
  computed: {
    ...mapGetters(["userInfo", "token", "userMenus"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      path = from.path
    })
  },
  created() {
    var self = this;
    this.createCode()
    var _data = JSON.parse(localStorage.getItem("nameAndPwd"))
    if (_data) {
      self.formInline.user = _data.userName
      self.formInline.password = _data.passWord
    }
    console.log(this.$router, this.$route);
  },
  mounted() {
    var self = this;
    this.lock_xx = true
  },
  methods: {
    /**
     * [createCode description] 生成二维码
     * @method createCode
     * @return {[type]}   [description]
     * @author CoolLsk
     */
    createCode() {
      var code = "";
      var codeLength = 4; //验证码的长度
      var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 's'); //随机数
      for (var i = 0; i < codeLength; i++) { //循环操作
        var index = Math.floor(Math.random() * 50); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.checkCode = code; //把code值赋给验证码
    },
    // 提交、
    handleSubmit(name) {
      var self = this;
      var _this = this;
      self.loadLock = true;
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (self.checkCode.toLowerCase() != self.yzm.toLowerCase()) {
            this.$message.error('验证码错误，请重新输入!');
            self.loadLock = false;
            return
          }
          // 登录方法初始化
          _this.loginInit()
        } else {
          self.loadLock = false;
        }
      })
    },
    // 登录方法初始化、
    loginInit() {
      var self = this;
      var _this = this;
      login(
        self.formInline.user,
        self.formInline.password
      ).then((res) => {
        localStorage.removeItem("nameAndPwd")
        //记住密码
        if (_this.checked) {
          var nameAndPwd = {
            userName: self.formInline.user,
            passWord: self.formInline.password
          }
          localStorage.setItem(
            "nameAndPwd",
            JSON.stringify(nameAndPwd)
          )
        }
        self.loadLock = false;
        // console.log(res);
        setToken(res.data.token)
        // 更新用户信息
        _this.$store.dispatch("uploadUserInfo", res.data.userInfo)
        // 更新侧边栏菜单
        _this.$store.dispatch("uploadUserMenus", res.data.userMenus)

        _this.$message.success('登录成功，正在跳转请稍等！')

        _this.$router.push({
          path: "/"
        })
      }).catch((err) => {
        self.loadLock = false;
        console.error(err);
      })
    }
  }
}
</script>
