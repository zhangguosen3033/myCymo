<template >
    <div>
        <div class="headClass">
            <span class="icon" @click="iconBack"></span>
            <span class="title">{{title}}</span>
        </div>
    </div>

</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: ['title'],  //需要在这里获取父组件传递过来的值
  computed: {},
  mounted() {},
  methods: {
      iconBack() {
            this.$router.go(-1);
      }
  }
}
</script>



<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import './../../common/stylus/pxrem.styl';

.headClass {
    background-color: #fff;
    height: px2rem(90);

    .icon {
        width: px2rem(35);
        height: px2rem(30);
        position: absolute;
        left: px2rem(30);
        top: px2rem(30);
        bg-image('../../assets/images/right_arrow_black');
        background-size: 100% 100%;
    }

    .title {
        display inline
        position: absolute;
        // top: px2rem(27);
        left: px2rem(90);
        font-size: px2rem(30);
        padding-top :px2rem(25);
        padding-bottom :px2rem(25)
    }
}
</style>