<template lang="html">
    <div class="bottomTabWrap">
        <homeBanner class="homeBanner"></homeBanner>
        <broadcast></broadcast>
        <hotProduct class="hotProduct"></hotProduct>
    </div>
</template>

<script>
import hotProduct from "../components/home/hotProduct.vue";
import homeBanner from "../components/home/homeBanner.vue";
import broadcast from "../components/home/broadcast.vue";

export default {
  components: {
    hotProduct,
    homeBanner,
    broadcast
  }
};
</script>

<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import './../common/stylus/pxrem.styl';

.bottomTabWrap {
    margin-top: 0;
    width: 100%;
    height: 100%;
    overflow hidden   //设置这个属性 如果存在子控件过宽 直接隐藏  控制当前页面宽度
    padding-bottom px2rem(30)
    // background-color: #f0f0f0
}
</style>
