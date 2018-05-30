<template lang="html">
  <div class="loginDiv">
    <headBar :title="'登录'"></headBar>

    <p class="title"> 欢迎使用房金云</p>

    <div class="inputDiv">
        <input class="inputEle nameInput"
                    type="tel"
                    placeholder="请输入您的手机号码"
                    v-model="telNumber"
                    maxlength="11"
                    >
        <span class="clean" v-if="this.telNumber.length > 0" @click="clean()"></span>
    </div>

    <div class="nextBtn" :class="classBtnMethod" @click="goNext()"><p>下一步</p></div>
    <div class="bottomDiv">
        <input type="radio" class="checkbox" :class= "classCheckedMethod" v-model="checked" @click="check()">
        <p class="redText">已阅读<span class="yellow">《房金云用户使用协议》</span></p>
    </div>
 </div>


</template>

<script>
import headBar from "../../components/common/headBar.vue";
export default {
  components: {
    headBar
  },
  data() {
    return {
      telNumber: "",
      checked: true
    };
  },
  computed: {
    classCheckedMethod: function() {
      if (this.checked) {
        if (this.telNumber.length > 0) {
          return "checkboxActiveBlack";
        } else {
          return "checkboxActive";
        }
      } else {
        return "checkbox";
      }
    },
    classBtnMethod: function() {
      if (this.telNumber.length > 0 && this.checked) {
        return "nextActive";
      } else {
        return "nextBtn";
      }
    },
    isTelNumberCorrect: function() {
      return (
        this.telNumber && /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.telNumber)
      );
    }
  },
  mounted() {},
  created() {},
  methods: {
    clean() {
      this.telNumber = "";
    },
    check() {
      this.checked = !this.checked;
    },
    goNext() {
      //下一步
      if (this.isTelNumberCorrect) {
        localStorage.setItem("userPhone", this.telNumber.split(" ").join("")); //存入本地
        if (this.checked) {
             this.$router.push({
        path: '/login/loginCode',
      })
        } else {
          this.$vux.toast.text("请勾选房金云用户使用协议");
        }
      } else {
        this.$vux.toast.text("手机号有误");
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

    .inputDiv {
        position: relative;
        height: px2rem(100);
        margin: px2rem(100) px2rem(40) px2rem(20) px2rem(40);
        border-bottom: px2rem(1) solid #f0f0f0;

        .inputEle {
            position: absolute;
            top: px2rem(10);
            left: px2rem(25);
            height: px2rem(60);
            font-size: px2rem(40);
        }

        .clean {
            position: absolute;
            top: px2rem(25);
            right: px2rem(25);
            height: px2rem(30);
            width: px2rem(30);
            bg-image('../../assets/images/login_clear');
            background-size: 100% 100%;
        }
    }

    .nextBtn {
        margin-top: px2rem(220);
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

    .bottomDiv {
        display flex
        margin-top: px2rem(40);
        align-items center
        justify-content center

        .checkbox {
            width: px2rem(30);
            height: px2rem(30);
            border-radius: 50%;
            border: solid #f3f3f3 px2rem(4);
            &.checkboxActive {
                bg-image('../../assets/images/complete_gray');
                background-size: 100% 100%;
                border: none;
                }
             &.checkboxActiveBlack {
                bg-image('../../assets/images/complete_black');
                background-size: 100% 100%;
                border: none;
                }
        }
        .redText {
            margin-left: px2rem(15);
            color: #646464;
            font-size: px2rem(22);

            .yellow {
                color: #fe9f28;
            }
        }
    }
}
</style>