<template lang="html">
<div>
    <headBar :title="'设置'"></headBar>

    <div class="boxDiv">
        <div class="cell" @click="aboutUs()">  
            <span class='cell_text'>关于我们</span>
            <span class='right_icon'></span>
        </div>
        <div class="cell" @click="question()">
            <span class='cell_text'>意见反馈</span>
            <span class='right_icon'></span>
        </div>
    </div>

    <div class="logOut" @click="logOut()">退出登录</div>
</div>



</template>
<script>
import headBar from "../../components/common/headBar.vue";
export default {
  components: {
    headBar
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  created() {},
  methods: {
    aboutUs() {
      this.$vux.toast.text("关于我们");
    },
    question() {
      this.$router.push({
        path: "/mine/question"
      });
    },
    logOut() {
      const _this = this;
      this.$vux.confirm.show({
        content: "确认退出登录？",
        onConfirm() {
          localStorage.removeItem("userIMId");
          localStorage.removeItem("userPhone");
          localStorage.removeItem("userToken");
          _this.$router.replace({
            path: "/home"
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import '../../common/stylus/pxrem.styl';

.boxDiv {
    margin-top: px2rem(20);

    .cell {
        box-sizing: border-box;
        height: px2rem(140);
        background-color: #ffffff;
        padding: 0 px2rem(30) 0 px2rem(40);
        display: flex;
        text-align: left;
        align-items: center;
        border-bottom: solid px2rem(1) #f3f3f3;

        .cell_text {
            flex: 1;
            font-size: px2rem(30);
            color: #282828;
        }

        .right_icon {
            width: px2rem(17);
            height: px2rem(31);
            bg-image('../../assets/images/arrow_right');
            background-size: px2rem(15) px2rem(25);
            background-position: center center;
        }
    }
}

.logOut {
    margin-top: px2rem(20);
    height: px2rem(140);
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: px2rem(30);
    color: #282828;
}
</style>