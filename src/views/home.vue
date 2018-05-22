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
    // background-color: #f0f0f0
}
</style>
