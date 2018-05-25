<template lang="html">
<div class= "content">
 <div class="headList">
      <ul class="headtab">
          <li  v-for="(item,index) in headList" :key="" :class="[selectedTab == item.id ? 'listActive' : 'list']" @click ="tebItemClick(item,index)"  >{{item.thematic_name}}</li>
      </ul>
  </div>

<div class="card">
    <ul class="cardTab">
      <li class= "cardList" v-for="(item,index) in selectCardData.cases" :key="" @click="goCaseData(item)" :class="{'cardList2':index == '0', 'cardList2':index == '1','cardList3':index == '2'}">
          <span class="title">{{item.case_title}}</span>
          <img :src="item.case_img_url" alt="">
          <div class="desc" v-if="index == 0">案例一</div>
          <div class="desc" v-if="index == 1">案例二</div>
          <div class="desc" v-if="index == 2">案例三</div>
      </li>
    </ul>
</div>


<div class="loan">
    <ul class="loanTab">
      <li class= "loanList" v-for="(item,index) in selectCardData.products" :key=""  :class="{'loanList2':item.productType == '抵押','loanList3':item.productType == '赎楼'}">
         
            <div class="type">{{item.productType}}</div> 
            <div class="loanLeft">
                <span class="loantitle">{{item.productName}}</span>
                <p class="people">{{item.applicantNumbers}}人贷款</p>
            </div>
            <div class="loanRight">
                <p class="percent">{{item.monthRateStart}}%</p>
                <p class="percentFont">月利率</p>
            </div>

      </li>
    </ul>
</div>

<div class= "bottom"></div>
</div>
 

</template>

<script>
import { getProductCate } from './../api/productApi.js'
export default {
  components: {},
  data() {
    return {
      headList: [],
      selectedTab: '',
      selectCardData: {},
      productData: []
    }
  },
  mounted() {
    getProductCate(null, res => {
      if (res.status == '200') {
        ;(this.headList = res.data),
          (this.selectedTab = res.data[0].id),
          (this.selectCardData = res.data[0].bodyInfo)
      }
    })
  },
  methods: {
    tebItemClick(item, index) {
      ;(this.selectedTab = item.id), (this.selectCardData = item.bodyInfo)
    },
    
    goCaseData(item) {
      this.$router.push({
        path: '/product/caseData',
        query: {
          caseId: item.case_id
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import './../common/stylus/pxrem.styl';

.content {
    background-color: #fff;

    .headList {
        width: 100%;
        z-index: 100; // 
        position: fixed;
        background-color: #fff;
        height: px2rem(88);
        white-space: nowrap; // 控制li的横向滚动超出屏幕情况的处理
        overflow: auto;

        .headtab {
            display: flex;
            .list {
                display: flex;
                float: none;
                padding: px2rem(23) px2rem(25);
                font-size: px2rem(30);
                color: #666;
                text-align: center;
                justify-content: center; /* 水平居中 */
                border-bottom: 0 #fff;
            }

            .listActive {
                padding: px2rem(23) px2rem(25) 0 px2rem(25);
                font-size: px2rem(32);
                color: #fe9f28;
                border-bottom: px2rem(4) #fe9f28 solid;
            }
        }
    }

    .card {
        position: relative;
        top: px2rem(88);
        width: 100%;
        height: px2rem(302);
        overflow: auto;

        .cardTab {
            display: -webkit-box; // 子控件一排显示
            width: 100%;
            margin: px2rem(30) px2rem(40) px2rem(42) px2rem(40);

            .cardList {
                position: relative;
                margin: 0 px2rem(15);
                display: flex;
                height: px2rem(228);
                width: px2rem(480);
                bg-image('../assets/images/case_bg1');
                background-size: 100% 100%;

                .title {
                    margin-left: px2rem(24);
                    margin-top: px2rem(38);
                    font-size: px2rem(36);
                    color: #fff;
                }

                img {
                    position: absolute;
                    width: px2rem(182);
                    height: px2rem(182);
                    border-radius: px2rem(91);
                    margin-left: px2rem(270);
                    margin-top: px2rem(15);
                }

                .desc {
                    position: absolute;
                    margin-left: px2rem(24);
                    margin-top: px2rem(164);
                    font-size: px2rem(24);
                    color: #fff;
                }
            }

            .cardList2 {
                bg-image('../assets/images/case_bg2');
                background-size: 100% 100%;
            }

            .cardList3 {
                bg-image('../assets/images/case_bg3');
                background-size: 100% 100%;
            }
        }
    }

    .loan {
        width: 100%;
        margin-top: px2rem(88);

        .loanTab {
            margin: 0 px2rem(34);

            .loanList {
                position: relative;
                height: px2rem(206);
                margin-bottom: px2rem(40);
                bg-image('../assets/images/pro_bg1');
                background-size: 100% 100%;

                .loanLeft {
                    position: absolute;
                    top: px2rem(80);
                    left: px2rem(28);

                    .loantitle {
                        font-size: px2rem(36);
                        color: #666;
                        font-weight: bolder;
                    }

                    .people {
                        margin-top: px2rem(6);
                        font-size: px2rem(22);
                        color: #999;
                        text-align: left;
                    }
                }

                .loanRight {
                    position: absolute;
                    top: px2rem(70);
                    right: px2rem(27);

                    .percent {
                        margin-right: px2rem(26);
                        color: #41c75c;
                        font-size: px2rem(52);
                    }

                    .percentFont {
                        padding-top: 0;
                        margin-right: px2rem(26);
                        margin-top: px2rem(1);
                        font-size: px2rem(22);
                        color: #999;
                    }

                    &:after {
                        position: absolute;
                        content: '';
                        top: px2rem(20);
                        right: px2rem(0);
                        width: px2rem(18);
                        height: px2rem(35);
                        bg-image('../assets/images/箭头');
                        background-size: 100% 100%;
                    }
                }

                .type {
                    position: absolute;
                    top: px2rem(13);
                    left: px2rem(12);
                    font-size: px2rem(22);
                    color: #fff;
                    font-weight: bolder;
                    transform: rotate(-45deg);
                }
            }

            .loanList2 {
                bg-image('../assets/images/pro_bg2');
                background-size: 100% 100%;
            }

            .loanList3 {
                bg-image('../assets/images/pro_bg3');
                background-size: 100% 100%;
            }
        }
    }

    .bottom {
        background-color: #fff;
        width: 100%;
        height: px2rem(180);
        bg-image('../assets/images/房金云在手银行贷款无忧');
        background-size: px2rem(450);
        background-position: center top px2rem(80);
    }
}
</style>
