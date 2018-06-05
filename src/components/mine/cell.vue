<template lang="html">
    <div class="cell" @click="jumpPage()">
        <span class='cell_text'>{{cellData.text}}</span>
        <span class='right_icon'></span>
    </div>

</template>
<script>
export default {
  props: {
    cellData: {
      required: true
    },
    tel: "",
    isLogined: ""
  },
  methods: {
    jumpPage() {
      if (!this.isLogined) {
        this.$router.push({
          path: "/login/login"
        });
      } else {
        this.$vux.toast.text("跳转到" + this.cellData.path);
        this.$router.push({
        	path: this.cellData.path,
        	query: {
                //需要传递的其他详情页信息
        		tel: this.tel
        	}
        });
        //打点操作等其他处理
        // gio('track',this.cellData.trackKey);
      }
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import './../../common/stylus/pxrem.styl';

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
        font-size: px2rem(34);
        color: #000;
        font-weight: bold;
    }

    .right_icon {
        width: px2rem(17);
        height: px2rem(31);
        bg-image('../../assets/images/arrow_right');
        background-size: px2rem(15) px2rem(25);
        background-position: center center;
    }
}
</style>