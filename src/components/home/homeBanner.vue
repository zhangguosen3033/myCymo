<template>
    <swiper loop auto :show-desc-mask="false" :aspect-ratio="0.4" dots-position="center" :index="swiperIndex" class="swipe">
        <swiper-item v-for="(item,index) in bannaerData" :key="index" class="item">
            <img :src="item.bannerImgUrl" @click='jumpPage(item.bannerJumpUrl)'>
        </swiper-item>
    </swiper>
</template>

<script>
import { getBannerConfig } from '../../api/productApi.js'
import { Swiper, SwiperItem } from 'vux'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      swiperIndex: 0,
      bannaerData: []
    }
  },
  computed: {},
  mounted() {
    let params = {
      bannerType: 'home'
    }
    getBannerConfig(params, res => {
      if (res.status == '200') {
        this.bannaerData = res.data.data
      }
    })
  },
  methods: {
    jumpPage(url) {
      if (url) {
        this.$vux.toast.text('跳转到' + url)
      }
    }
  }
}
</script>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import './../../common/stylus/pxrem.styl';

.swipe {
    width: 100%;
    height: px2rem(300);
}
</style>
