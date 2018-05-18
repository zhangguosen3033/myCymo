<template>
    <div class="bottomBox">
       <div class="hotTitle"> <span class="title"> <span class="icon"></span>热门贷款产品</span></div>


       <div class="loanBox">
         <div class="item" v-for="(item,index) in selectContentData" :class="{'item2':index == '1','item3':index == '2'}" :key="">
           <span class="tag">{{item.productType}}</span>
            <p class="font1">月利率</p>
            <p class="font2">{{item.rate}}<span>%</span></p>
            <p class="font3">{{item.loanNumbers}}人已放款</p>
         </div>
       </div>


       <div class="hotTitle"> <span class="title"> <span class="icon icon2"></span>我们的优势</span></div>

       <div class="aboutUS">
           <div class="aboutList">
             <div class="item">
               <p class="tit">正规贷款</p>
               <p class="con">与中原银行等千家正规机构合作</p>
             </div>
             <div class="item item2">
               <p class="tit">服务内容</p>
               <p class="con">专属顾问随时在线全程服务</p>
             </div>
           </div>
           <div class="aboutList">
             <div class="item item3">
               <p class="tit">三大承诺</p>
               <p class="con">多方案解决，一次报价，不成功不收费</p>
             </div>
             <div class="item item4">
               <p class="tit">关于我们</p>
               <p class="con">中国互联网金融协会会员</p>
             </div>
           </div>
       </div>

       <div class="logo"></div>
       </div>

</template>

<script>
import {
getHotProduct,
} from '../../api/productApi.js'

export default {
  components: {
	},
	data() {
		return {
			selectContentData:''
		}
	},
	computed: {

	},
  mounted() {
    // This.getHeaderHotData()
    getHotProduct(null, res => {
      if(res.status == '200'){
        this.selectContentData = res.data;
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import "./../../common/stylus/pxrem.styl";

.bottomBox
    background-color: #f0f0f0;
    .hotTitle
        background-color: #f0f0f0
        width: 100%
        height: px2rem(70)
        font-size: px2rem(30)
        font-weight: bold
        text-align: center
        padding-top: px2rem(55)
        color: #1a1a1a
        .title
            position: relative
            &:after
                content: ''
                position: absolute
                width:px2rem(85)
                height:1px
                top: px2rem(16)
                margin-left: px2rem(20)
                border-bottom:#d8d8d8 solid 1px
            &:before
                content: ''
                position: absolute
                width:px2rem(85)
                height:1px
                top: px2rem(16)
                margin-left: px2rem(-105)
                border-bottom:#d8d8d8 solid 1px
            .icon
                 position: relative       // 相对定位 绝对定位 主要是是否脱离了文档流
                 top: px2rem(-2)
                 display: inline-block
                 vertical-align: middle
                 margin-right: px2rem(13)
                 width:px2rem(34)
                 height:px2rem(34)
                 background-size: 100% 100%
                 bg-image('../../assets/images/hot')
                 &.icon2
                     bg-image('../../assets/images/advant')
                     background-size: 100% 100%

    .loanBox
        background-color: #ffffff;
        height: px2rem(180)
        display: flex
        flex-direction: row
        padding: px2rem(35) px2rem(20)
        .item
            flex: 1
            position: relative
            margin-right: px2rem(10)
            margin-left: px2rem(10)
            bg-image('../../assets/images/xinyong')
            background-size: 100% 100%
            .tag
                position: absolute
                left: px2rem(3)
                top: px2rem(13)
                font-size: px2rem(18)
                color: #ffffff
                transform:rotate(-50deg)
            .font1
                margin-top: px2rem(25)
                font-size: px2rem(22)
                color:rgba(255,255,255,0.7)
            .font2
                 margin-top: px2rem(10)
                 font-size: px2rem(34)
                 color: #ffffff
                 span
                    font-size:px2rem(20)
            .font3
                  margin-top: px2rem(10)
                  font-size: px2rem(20)
                  color:rgba(255,255,255,0.7)

        .item2
            bg-image('../../assets/images/diya')
            background-size: 100% 100%
        .item3
            bg-image('../../assets/images/yongxu')
            background-size: 100% 100%






    .aboutUS
        .aboutList
            display: flex;
            flex-direction: row;
            background-color: #f0f0f0
            height: px2rem(180)
            .item
                flex: 1
                position: relative
                width: 50%
                background-color: #ffffff
                border-bottom: #f0f0f0 solid 1px
                padding:px2rem(40) px2rem(35) px2rem(35) px2rem(120)
                &:before
                    content:''
                    position: absolute
                    top: px2rem(36)
                    left: px2rem(30)
                    width: px2rem(88)
                    height: px2rem(88)
                    bg-image('../../assets/images/icon_advantage1')
                    background-size: 100% 100%
                .tit
                    font-size: px2rem(30)
                    color: #000
                .con
                    font-size: px2rem(22)
                    color: #b2b2b2
                    margin-top: pxrem(10)
                &.item2
                    margin-left: 1px;
                    background-color: #ffffff
                    &:before
                        bg-image('../../assets/images/icon_advantage2')
                        background-size: 100% 100%
                &.item3
                    &:before
                        bg-image('../../assets/images/icon_advantage3')
                        background-size: 100% 100%
                &.item4
                    margin-left: 1px;
                    background-color: #ffffff
                    &:before
                        bg-image('../../assets/images/icon_advantage4')
                        background-size: 100% 100%

    .logo
        height: px2rem(100)
        background-color: #f0f0f0
        bg-image('../../assets/images/房金云logo')
        background-size: px2rem(200)
        background-position: center top px2rem(25)

</style>
