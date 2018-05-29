<template lang="html">
 <div class="content">
    <div class="headList">
      <ul class="headtab">
          <li  v-for="(item,index) in headList" :key="" :class="[selectedTabID == item.id ? 'listActive' : 'list']" @click ="tebItemClick(item,index)"  >{{item.title}}</li>
      </ul>
      <p class="search"></p>
    </div>

    <div class="newsBox">
        <scroller class= "scroller"    :on-infinite="infinite"  no-data-text=""  :on-refresh="refresh">
            <div class='placeDivTop'></div> 
            <div v-for="(item,index) in listData" :key="item.id" class= "item">

                <div class = "oneImgItem" v-if="item.image.length < 3" >  
                    <div class="oneLeft">
                         <p class="newsTitle">{{item.title}}</p>
                         <p class="newsRed">阅读{{item.count}} <span>{{item.createTime}}</span></p>
                    </div>
                    <div class="newsImgDiv">
                        <img class="newsImg" :src ="item.image[0]" />
                    </div>
                </div>

                <div class ="ThreeImgItem" v-else >
                     <p class="threetitle">{{item.title}}</p>
                     <div class="threeImgDiv">
                         <img :src ="item.image[0]" />
                         <img :src ="item.image[1]" />           
                         <img :src ="item.image[2]" />
                     </div>
                     <p class="threeRed">阅读{{item.count}} <span>{{item.createTime}}</span></p>

                </div>
            </div>
            <div class='noText' v-if="noData">没有更多数据了已经</div>
        </scroller>
    </div>
   
    
</div>

</template>

<script>
import {
  getNewsTabTitleInfo,
  getNewsListByThemeId
} from './../api/productApi.js'
export default {
  components: {},
  data() {
    return {
      headList: [],
      selectedTabID: '',
      page: 0,
      size: 10, //默认加载10条
      listData: [],
      noData: false, //是都显示底部提示的bool值
      isInfinite: true
    }
  },
  mounted() {
    let params = {
      thematicId: this.selectedTabID,
      page: this.page,
      size: this.size
    }
    this.getRealListByThemIDData(params)
  },
  methods: {
    tebItemClick(item, index) {
      this.selectedTabID = item.id
      this.page = 0
      let params = {
        thematicId: this.selectedTabID,
        page: this.page,
        size: this.size
      }
      this.getRealListByThemIDData(params)
    },
    getRealListByThemIDData(params) {
      getNewsListByThemeId(params, res => {
        if (res.status == '200') {
          //点击某个标签之后重新加载的新数据
          this.listData = [] //置空数组信息
          this.page += 1
          let dataContent = res.data.data.rows
          this.listData = dataContent
          if (dataContent.length >= this.size) {
            //数据大于10条  需要加载更多
            this.isInfinite = true
            this.noData = false
          } else {
            this.isInfinite = false
            this.noData = true
          }
        } else {
          this.$vux.toast.text('请求失败')
        }
      })
    },
    infinite(done) {
      if (!this.isInfinite) {
        //数据少于10条  isInfinite为false 不需要加载更多
        this.page = 0
        done(true)
        return
      }
      setTimeout(() => {
        let params = {
          thematicId: this.selectedTabID,
          page: this.page,
          size: this.size
        }
        getNewsListByThemeId(params, res => {
          if (res.status == '200') {
            this.page += 1
            let dataContent = res.data.data.rows
            this.listData = this.listData.concat(dataContent) //新数据 拼接到之前的数据中
            if (dataContent.length >= this.size) {
              this.isInfinite = true
              done(false)
              this.noData = false
            } else {
              this.isInfinite = false
              done(true)
              this.noData = true
            }
          } else {
            this.$vux.toast.text('请求失败')
          }
        })
      }, 500)
    },
    refresh(done) {
      this.page = 0
      let params = {
        thematicId: this.selectedTabID,
        page: this.page,
        size: this.size
      }

      setTimeout(() => {
        getNewsListByThemeId(params, res => {
          if (res.status == '200') {
            this.listData = [] //刷新置空数组
            this.page += 1
            let dataContent = res.data.data.rows
            this.listData = dataContent
            if (dataContent.length >= this.size) {
              //数据大于10条  需要加载更多
              this.isInfinite = true
              done(false)
              this.noData = false
            } else {
              done(true)
              this.isInfinite = false
              this.noData = true
            }
          } else {
            this.$vux.toast.text('请求失败')
          }
        })
      }, 500) //定时器  下来刷新的时间
    }
  },
  created() {
    //初始加载标题数据
    getNewsTabTitleInfo(null, res => {
      if (res.status == '200') {
        ;(this.headList = res.data.data),
          (this.selectedTabID = res.data.data[0].id)
      }
    })
  }

  //    beforeRouteEnter(to,from,next){
  //           if(!sessionStorage.askPositon || from.path == '/'){//当前页面刷新不需要切换位置
  //               sessionStorage.askPositon = '';
  //               next();
  //           }else{
  //               next(vm => {
  //                   if(vm && vm.$refs.scrollerBottom){//通过vm实例访问this
  //                   setTimeout(function () {
  //                       vm.$refs.scrollerBottom.scrollTo(0, sessionStorage.askPositon, false);
  //                   },0)//同步转异步操作
  //                   }
  //               })
  //           }
  //       },
  //       beforeRouteLeave(to,from,next){//记录离开时的位置
  //           sessionStorage.askPositon = this.$refs.scrollerBottom && this.$refs.scrollerBottom.getPosition() && this.$refs.scrollerBottom.getPosition().top;
  //           next()
  //       },
}
</script>

<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import './../common/stylus/pxrem.styl';

.headList {
    z-index: 100; // 
    width: 100%;
    position: fixed;
    background-color: #fff;
    height: px2rem(88);
    white-space: nowrap; // 控制li的横向滚动超出屏幕情况的处理
    overflow: auto;
    border-bottom: solid #f3f3f3 px2rem(0.5);

    .headtab {
        display: flex;
        padding-right: px2rem(70);

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

    .search {
        position: absolute;
        top: px2rem(30);
        right: px2rem(30);
        width: px2rem(30);
        height: px2rem(30);
        bg-image('../assets/images/search_icon_index');
        background-size: 100% 100%;
    }
}

.newsBox {
    position: absolute;
    width: 100%;
    top: px2rem(88);

    .scroller {
        position: relative;
        width: 100%;

        .placeDivTop { // 用来处理滚动视图的头部 如果不加导致第一行 出问题
            height: px2rem(0);
        }

        .item {
            width: 100%;
            background-color: #fff;
            border-bottom: px2rem(1) #f0f0f0 solid;

            .oneImgItem {
                padding: px2rem(30) px2rem(30);
                height: px2rem(142);
                position: relative;

                .oneLeft {
                    float: left;
                    height: px2rem(142);
                    margin-right: px2rem(240);
                    position: relative;

                    .newsTitle {
                        height: px2rem(100);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: left;
                        font-size: px2rem(36);
                        font-weight: bolder;
                        color: #666;
                    }

                    .newsRed {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: px2rem(400);
                        text-align: left;
                        font-size: px2rem(22);
                        color: #999;

                        span {
                            margin-left: px2rem(15);
                        }
                    }
                }

                .newsImgDiv {
                    .newsImg {
                        position: absolute;
                        right: px2rem(30);
                        width: px2rem(210);
                        height: px2rem(135);
                    }
                }
            }
        }

        .ThreeImgItem {
            box-sizing: border-box; // 设置这种模式不再设置div高度 总高度由各控件相加组成 撑开显示
            padding: px2rem(30) px2rem(22);
            // height: px2rem(328);   //不再需要
            position: relative;

            .threetitle {
                // height: px2rem(100);  //不再需要
                text-align: left;
                font-size: px2rem(36);
                font-weight: bolder;
                color: #666;
            }

            .threeImgDiv {
                display: flex;
                padding: px2rem(25) 0 px2rem(25) 0;

                img {
                    flex: 1;
                    padding: 0 px2rem(8);
                    width: px2rem(200);
                    height: px2rem(168);
                }
            }

            .threeRed {
                bottom: 0;
                left: 0;
                width: px2rem(400);
                text-align: left;
                font-size: px2rem(22);
                color: #999;

                span {
                    margin-left: px2rem(15);
                }
            }
        }

        .noText {
            display: flex;
            height: px2rem(80);
            background-color: #f0f0f0;
            color: #999;
            font-size: px2rem(30);
            justify-content: center; // 居中设置
            align-items: center;
        }
    }
}
</style>