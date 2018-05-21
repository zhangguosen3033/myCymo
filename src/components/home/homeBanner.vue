<template>
    <mt-swipe :auto="2000"class="swipe">
      <mt-swipe-item v-for="(item,index) in bannaerData" :key="index" class="item">
        <img :src="item.bannerImgUrl"  @click='jumpPage(item.bannerJumpUrl)'>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
import {
getBannerConfig,
} from '../../api/productApi.js'
export default {
  components: {
	},
	data() {
		return {
      swiperIndex: 0,
			bannaerData:[]
		}
	},
	computed: {

	},
  mounted() {
    let params = {
				bannerType: 'home'
			}
    getBannerConfig(params, res => {
      if(res.status == '200'){
        this.bannaerData = res.data.data;
      }
    })
  },
  methods: {
   jumpPage(url) {
     if (url) {
       Toast("跳转到" + url)

     }
   }
  }
}

</script>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import "./../../common/stylus/pxrem.styl";

    .swipe
        width: 100%
        height: px2rem(300)

</style>
