<template lang="html">
  <div class="loginDiv">
    <headBar :title="'登录'"></headBar>

    <p class="title"> 输入验证码</p>
    <p class="tlePhone">验证码已发送至{{telNumber}}</p>
    
    <div class="codeDiv">
        <div class="input">
            <input class="inputCode "
                            type="tel"
                            placeholder="hahhahshishishishiahah"
                            v-model="codeNumber"
                            v-on:input='getInputCode'
                            maxlength="4"
                            >
        </div>
        <div class="codeBox">
            <div v-for="(item,index) in listCode" :key="index" class="codeitem" :class=" index == nextCodeIndex ? 'codeitemActive': 'codeitem'">
                    {{ item }}
            </div>
        </div>
    </div>
    <p class="timeTitle" :class ="this.timeText =='重新获取验证码' ? 'timeTitleActive':'timeTitle'" @click="goNewCode()">{{timeText}}</p>
    <div class="nextBtn"  :class="classBtnMethod"  @click="login()"><p>登录</p></div>

   
 </div>


</template>
<script>
import headBar from "../../components/common/headBar.vue";
import { getIndentifyMessage, userLogin ,getUserInfo} from "../../api/productApi";
export default {
  components: {
    headBar
  },
  data() {
    return {
      telNumber: "",
      codeNumber: "",
      listCode: ["", "", "", ""],
      nextCodeIndex: -1, //显示控件计数
      countSeconds: 60, //倒计时计数
      timeText: "",
      AimPassword:"",
      invitorTel:""
    };
  },
  computed: {
      classBtnMethod: function() {
        if (this.isCodeNumCorrect) {
                return "nextActive";
            } else {
                return "nextBtn";
            }
      },
    isCodeNumCorrect: function() {
      //正则验证验证码只能为4位数字
      return /^\d{4}$/.test(this.codeNumber);
    }
  },
  mounted() {},
  created() {
     //先去取值
    this.telNumber = localStorage.getItem("userPhone");
    this.AimPassword = localStorage.getItem('AimPassword');
    this.invitorTel = this.$route.query.telephone;
    this.startTimer();
    this.getSmsCode();
  },
  methods: {
    getInputCode() {
      //监听输入的变化
      //   console.log(this.codeNumber);
      this.nextCodeIndex = this.codeNumber.length - 1;
      for (var i = 0; i < this.listCode.length; i++) {
        this.listCode[i] = this.codeNumber.charAt(i) || "";
      }
    },
    startTimer() {
      clearInterval(this.timer);
      this.countSeconds = 60;
      this.timer = setInterval(() => {
        if (this.countSeconds > 1) {
          this.countSeconds--;
          this.timeText = `${this.countSeconds}s后重发`;
        } else {
          clearInterval(this.timer);
          this.timeText = "重新获取验证码";
        }
      }, 1000);
    },
    getSmsCode() {
      //获取验证码请求
      let params = {
        telephone: this.telNumber,
        msgTemplateFlag: 5
      };
      getIndentifyMessage(params, res => {
        if (res.status == 200) {
          let dataContent = res.data;
          if (dataContent.result == 0) {
            this.$vux.toast.text(dataContent.message);
          } else {
            this.$vux.toast.text(dataContent.message);
            this.timeText = "重试验证码";
          }
        }
      });
    },
    goNewCode() {
      //重新获取验证码
      if (this.countSeconds < 1) {
        this.getSmsCode();
        this.startTimer();
      }
    },
    login() {
      //登录
      if (this.isCodeNumCorrect) {
        console.log("验证成功");
        let params = {
          telephone: this.telNumber,
          smscode: this.codeNumber,
          inviterPhone: this.invitorTel
        };
        userLogin(params, res => {
          if (res.status == 200) {
            let dataContent = res.data;
            if (dataContent.result == 0) {
              //存储登陆后的用户信息
              localStorage.setItem("userIMId", dataContent.data.imUserId);
              localStorage.setItem("AimPassword", dataContent.data.imPassword);
              localStorage.setItem("userPhone", this.telNumber);
              localStorage.setItem("userToken", dataContent.data.token);

              //							console.log(dataContent.data.imPassword,'1',this.AimPassword);
              getUserInfo(null, res => {
                if (res.status == 200) {
                  this.$router.replace({
                    path: "/home"
                  });
                }
              });
            } else {
              this.$vux.toast.text(dataContent.message);
            }
          }
        });
      } else {
        this.$vux.toast.text("验证码不合规范");
      }
    }
  }
};
</script>



<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import '../../common/stylus/pxrem.styl';

.loginDiv {
    width: 100%;
    height: px2rem(1334);
    background-color: #ffffff;

    .title {
        margin-left: px2rem(50);
        margin-top: px2rem(140);
        font-size: px2rem(52);
        text-align: left;
        font-weight: bolder;
    }

    .tlePhone {
        margin-left: px2rem(50);
        margin-top: px2rem(40);
        font-size: px2rem(24);
        text-align: left;
        color: #646464;
    }

    .codeDiv {
        z-index: 0;
        position: relative;
        margin-top: px2rem(80);
        width: 100%;
        height: px2rem(90);

        .input {
            width: 100%;
            height: px2rem(90);
            z-index: 10;

            .inputCode {
                width: 60%;
                height: px2rem(90);
                opacity: 0;
                z-index: 10;
            }
        }

        .codeBox {
            z-index: -1;
            position: absolute;
            top: 0;
            left: 20%;
            display: flex;
            width: 60%;
            height: 100%;

            .codeitem {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: px2rem(30);
                width: px2rem(76);
                height: px2rem(90);
                font-size: px2rem(36);
                border: solid px2rem(3) #c4c5cc;

                &.codeitemActive {
                    border: solid px2rem(3) #f0a800;
                }
            }
        }
    }

    .timeTitle {
        margin-top: px2rem(60);
        text-align: center;
        font-size: px2rem(24);
        color: #646464;

        &.timeTitleActive {
            color: #f0a800;
        }
    }

    .nextBtn {
        margin-top: px2rem(60);
        margin-left: px2rem(50);
        margin-right: px2rem(50);
        height: px2rem(100);
        background-color: #e6e6e6;
        text-align: center;
        border-radius: px2rem(50);
        font-size: px2rem(30);
        color: #b2b2b2;

        &.nextActive {
            bg-image('../../assets/images/yellowbutton');
            background-size: 100% 100%;
            color: #282828;
        }

        p {
            padding-top: px2rem(30);
            padding-bottom: px2rem(30);
        }
    }
}
</style>