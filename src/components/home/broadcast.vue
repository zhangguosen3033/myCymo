<template>
  <mt-swipe :auto="3000"
  :show-indicators="false"
  class="swipe">
    <mt-swipe-item >
      <span>a 11111111111111111111111111</span>
      <span>b 2222222222222222222222222</span>
    </mt-swipe-item>
    <mt-swipe-item >
      <span>c 333333333333333333333333</span>
      <span>d 44444444444444444444444</span>
    </mt-swipe-item>
  </mt-swipe>
</template>


<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import "./../../common/stylus/pxrem.styl";

    .swipe
        left: px2rem(200)
        text-align: center
        background-color: #fff
        height: px2rem(480)
        width: px2rem(123)
        transform:rotate(-90deg)

</style>
