<template>
    <div class="login">
      <div class="logoBox">
     
      <div class="logoMask">
         <h1>多+供应商管理系统</h1>
        <el-form label-width="80px" :model="formLabelAlign" class="el-form">
          <el-form-item label="手机号:" class="inputBox">
            <el-input v-model="formLabelAlign.phoneNum" placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" class="inputBox">
            <el-input v-model="formLabelAlign.verification" placeholder="请输入验证码"></el-input>
            <el-button type="text" class="getverCode" @click="getVerCode" :disabled="isDisabled">{{buttonName}}</el-button>
          </el-form-item>
          <el-button type="primary" class="submitBtn" @click="submitInfo">登录</el-button>
        </el-form>
         <div class="rightBox">
            <div class="logoImg">
                <img src="../images/logo.png" alt="">
            </div>
            <div class="QRcodeImg">
                <img src="../images/QRcode.png" alt="">
            </div>
            <p class="PublicNum">关注多加平台微信公众号</p>
        </div>
      </div>        
      </div>
    </div>
    <!--  -->
</template>
<script>
import { getMessage,supplierLogin } from "../api/api";
export default {
  data () {
    return {
      buttonName:"发送验证码",
      isDisabled: false, 
      time: 60  , 
      formLabelAlign: {
        phoneNum:"",
        verification:""
      }
    }
  },
  methods: {
    getVerCode(){
        if(this.formLabelAlign.phoneNum == ""){//验证手机号是否为空，不为空发送验证码
           this.$message({
            message: "请输入您的手机号",
            type: 'error'
          });
        }else{
          let userInfo = {
             mobile: this.formLabelAlign.phoneNum,
             type: 2
          }
          getMessage(userInfo).then((res) =>{
            if(res.flag == 20000){
              let me = this; 
              me.isDisabled = true;  
              let interval = window.setInterval(function() {  //倒计时
                  me.buttonName = '（' + me.time + '秒）后重新发送';  
                  --me.time;  
                  if(me.time < 0) {  
                      me.buttonName = "重新发送";  
                      me.time = 60;  
                      me.isDisabled = false;  
                      window.clearInterval(interval);  
                  }  
              }, 1000);  
              }else{
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
          })
          
        }
    },
    submitInfo(){
      if(this.formLabelAlign.verification == ""){//登录判断是否为空，不为空跳转首页..
        this.$message({
          message: "请输入验证码",
          type: 'error'
        });
      }else{
        let verInfo = {
          loginName: this.formLabelAlign.phoneNum,
          msgValidateCode:this.formLabelAlign.verification
        }
        supplierLogin(verInfo).then((res) =>{
          if(res.flag == 20000 ){
            this.$router.push({ path: '/prolistdownp' });
             this.$message({
              message: "欢迎使用！",
              type: 'success'
            });
          }else{
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      }
    }
  },
  mounted () {
    
  }
}
</script>
<style lang="scss" scoped>
body{
  background: #1d1d28;
  
}
.login{
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.8);
  overflow: hidden;
  .inputBox{
    width: 100%;
    position: relative;
    margin-bottom: 20px!important;
  }
  .submitBtn{
    margin-left: 25px;
    display: block;
    padding: 12px 60px!important;
    background: -webkit-gradient(linear,0% 0%, 100% 0%, from(#2CBB55), to(#2CBB86));
    outline: none;
    border:none;
  }
}
.logoBox{
  width: 60%;
  height:500px;
  background:#fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -15%;
  margin-left: -30%;
   h1{
    font-size:22px;
    text-align: left;
    display: block;
    text-indent: 20px;
    color: #2CBB55;
    text-indent: 12%;
    margin-top: 180px;
  }
}
 .getverCode{
  position: absolute;
  right: 10px;
  top: 0;
  color: #2CBB55;
 }
 .el-form{
   width: 40%;
   margin-left: 10%; 
   margin-top: 30px!important;
}
.rightBox{
  width:429px;
  height:100%;
  border-right:1px double #000;
  position:absolute;
  right:0;
  top:0;
  background:#fff;          
  border-left:1px dashed #e5e5e5;
  overflow: hidden;
  border-radius:0 10px 10px 0;
}
.logoImg img,.QRcodeImg img{
  width:100%;
  height:auto;
}
.logoImg{
  width: 120px;
  height:auto;
  margin: 130px auto 13px auto;
}
.QRcodeImg{
  width: 150px;
  height: auto;
  margin: 0 auto 13px auto;
}
.PublicNum{
  width:180px;
  height:20px;
  line-height:20px;
  background:url(../images/scanning.png) no-repeat left center;
  background-size:contain;
  font-size:14px;
  text-align: center;
  margin: 0 auto; 
  text-indent: 25px;
}
</style>


