<template lang="html">
<div class="bottomTabWrap">
    <headBar :title="''" class="headBar"></headBar>
    <div class="infoTop">
        <p class="title">{{title}}</p>
        <p class="smallInfo"> {{infoCreateTime}}<span class="from">房金所资讯</span>{{count}}人查看</p>
        <p v-html="infoDetail" class="detail"></p>
    </div>
     <p class="releatetitle">相关新闻</p>
     
     <div v-for="(item,index) in listData" :key="item.id" class= "item">

                <div class = "oneImgItem" v-if="item.image.length < 3"   @click="goDetail(item)">  
                    <div class="oneLeft">
                         <p class="newsTitle">{{item.title}}</p>
                         <p class="newsRed">阅读{{item.count}} <span>{{item.createTime}}</span></p>
                    </div>
                    <div class="newsImgDiv">
                        <img class="newsImg" :src ="item.image[0]" />
                    </div>
                </div>

                <div class ="ThreeImgItem" v-else   @click="goDetail(item)">
                     <p class="threetitle">{{item.title}}</p>
                     <div class="threeImgDiv">
                         <img :src ="item.image[0]" />
                         <img :src ="item.image[1]" />           
                         <img :src ="item.image[2]" />
                     </div>
                     <p class="threeRed">阅读{{item.count}} <span>{{item.createTime}}</span></p>

                </div>
     </div>

    <div class="commentBg">
        <div class="commentDiv">
                <div v-for="item in commentList" :key=""  class="itemComment">
                    <img :src="item.portraitUrl">
                    <div class="rightDiv">
                        <p   class="name">{{item.createUserName}}</p>
                        <p class="comment">{{ item.comment }}</p>
                        <p class="time">{{ item.createTime }}</p>
                    </div>
                </div>
        </div>
    </div>

    <div class="loadMoreDiv">
        <p  class="loadmore" @click="reloadMore()" >{{ishavemore}}</p>
    </div>


    <div class="sendCommentDiv">
        <input class="inputclass"
                    type="text"
                    placeholder="跟帖..."
                    v-model="commentData"
                    >
        <span class='commentIcon'></span>
        <p class="collect" :class="this.isCollect ? 'collected' : 'collect' " @click="collect()"></p>
        <p class="send" @click="send()">发送</p>

        <div class="hideenDiv" v-if= "this.commentData">
            <p class="selctIcon" :class="this.isHiddenNmae ? 'selctIconYes':'selctIcon'" @click="hiddenName()"></p>
             <p class="hidden">匿名跟帖</p>
        </div>
    </div>



 </div>


</template>

<script>
import headBar from "../../components/common/headBar.vue";
import {
  getInfoDetail,
  getRelevantNewsById,
  getComments,
  addComments,
  toggleCollectInfo
} from "../../api/productApi.js";
export default {
  components: {
    headBar
  },
  data() {
    return {
      themId: "",
      infoId: "",
      infoCreateTime: "",
      title: "",
      infoDetail: "",
      count: "",
      userPhone: "", //手机号
      listData: [], //相关新闻的列表
      commentList: [], //评论列表
      page: 0,
      size: 5,
      ishavemore: "加载更多跟帖", //底部加载更多的显示
      commentData: "",
      isCollect: false, //收藏
      isHiddenNmae: false,
      isLogined: false
    };
  },
  computed: {
    //检查加载更多状态的方法
    checkState: function() {
      if (this.ishavemore == "加载更多跟帖") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {},
  created() {
    this.isLogined = localStorage.getItem("userToken") ? true : false;
    this.userPhone = localStorage.getItem("userPhone");
    this.themId = this.$route.query.themId;
    this.infoId = this.$route.query.infoId;
    this.getInfoDetail();
    this.getRelevantNewsById();
    this.getComments();
  },
  watch: {
    $route: function() {
      this.themId = this.$route.query.themId;
      this.infoId = this.$route.query.infoId;
      this.getInfoDetail();
      this.getRelevantNewsById();
      this.getComments();
    }
  },
  methods: {
    getInfoDetail() {
      let params = {
        infoId: this.infoId
      };
      getInfoDetail(params, res => {
        if (res.status == 200) {
          let newsInfo = res.data.data;
          this.infoCreateTime = newsInfo.infoCreateTime;
          this.title = newsInfo.infoTitle;
          this.infoDetail = newsInfo.infoDetail;
          this.count = newsInfo.count;
        }
      });
    },
    getRelevantNewsById() {
      let params = {
        infoId: this.infoId,
        thematicId: this.themId
      };
      getRelevantNewsById(params, res => {
        if (res.status == 200) {
          this.listData = res.data.data;
        }
      });
    },

    goDetail(item) {
      this.$router.push({
        path: "/news/newsDetail",
        query: {
          themId: item.themId,
          infoId: item.infoId,
          t: +new Date() //为了防止地址不变 拼接一个时间戳
        }
      });
    },

    getComments() {
      let params = {
        infomationId: this.infoId,
        page: this.page,
        size: this.size,
        type: 1
      };
      getComments(params, res => {
        if (res.status == 200) {
          if (res.data.data.rows.length < 1) {
            this.ishavemore = "没有跟多跟帖了";
            return;
          }
          this.commentList = this.commentList.concat(res.data.data.rows);
        }
      });
    },
    reloadMore() {
      if (this.checkState) {
        this.page++;
        this.getComments();
      }
    },
    //收藏信息
    collect() {
      if (this.isLogined == false) {
        this.$vux.toast.text("请先登录再收藏");
        return;
      }
      //收藏的请求
      var param = {
        infoId: this.infoId,
        themicId: this.themId,
        userPhone: this.userPhone
      };
      toggleCollectInfo(this.isCollect, param, res => {
        if (res.status == 200) {
          this.isCollect = !this.isCollect;
          this.$vux.toast.text(res.data.data);
        }
      });
    },
    //是否选择匿名
    hiddenName() {
      this.isHiddenNmae = !this.isHiddenNmae;
    },
    //发送消息
    send() {
      console.log("send");
      if (this.isLogined == false) {
        this.$vux.toast.text("请先登录");
        return;
      }
      if (!this.commentData) {
        this.$vux.toast.text("评论不能为空");
        return;
      }
      var param = {
        comment: this.commentData,
        infomationId: this.infoId,
        isAnonymity: this.isHiddenNmae ? 1 : 2,
        userType: 0
      };
      addComments(param, res => {
        if (res.status == 200) {
          this.$vux.toast.text(res.data.data);
          this.page = 0;
          this.commentList = [];
          this.commentData = "";
          this.getComments();
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus"  type="text/stylus" rel="stylesheet/stylus" >
@import '../../common/stylus/pxrem.styl';

.bottomTabWrap {
    margin-top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; // 设置这个属性 如果存在子控件过宽 直接隐藏  控制当前页面宽度
    background-color: #f0f0f0;

    .headBar {
        position: fixed;
        z-index: 100;
        width: 100%;
        background-color: #fff;
    }

    .infoTop {
        margin-top: px2rem(90);
        padding: px2rem(40) px2rem(30);
        background-color: #fff;
        border: solid px2rem(1) #f0f0f0;

        .title {
            text-align: left;
            font-size: px2rem(42);
        }

        .smallInfo {
            margin-top: px2rem(35);
            text-align: left;
            color: #646464;

            .from {
                padding: 0 px2rem(20);
            }
        }

        .detail {
            line-height: px2rem(60);
            margin-top: px2rem(25);
            color: #606060;
            font-size: px2rem(32);
        }
    }

    .releatetitle {
        padding: px2rem(20) px2rem(30);
        text-align: left;
        font-size: px2rem(26);
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
    }

    .commentBg {
        margin-top: px2rem(20);
        width: 100%;
        background-color: #fff;

        .commentDiv {
            padding: 0 px2rem(30);

            .itemComment {
                box-sizing: border-box;
                display: flex;
                border-bottom: solid px2rem(1) #f0f0f0;

                img {
                    margin-top: px2rem(30);
                    width: px2rem(80);
                    height: px2rem(80);
                    border-radius: 50%;
                }

                .rightDiv {
                    padding: px2rem(30) 0 px2rem(20) px2rem(30);
                    text-align: left;
                    line-height: px2rem(56);

                    .name {
                        color: #909090;
                        font-size: px2rem(28);
                    }

                    .comment {
                        color: #323232;
                        font-size: px2rem(30);
                    }

                    .time {
                        color: #909090;
                        font-size: px2rem(20);
                    }
                }
            }
        }
    }

    .loadMoreDiv {
        background-color: #ffffff;
        width: 100%;
        height: px2rem(150);
        margin-bottom: px2rem(30);
        padding-top: px2rem(40);

        .loadmore {
            margin: px2rem(0) px2rem(250) px2rem(40) px2rem(250);
            background-color: #fe9f28;
            color: #fff;
            line-height: px2rem(40);
            border-radius: px2rem(20);
        }
    }

    .sendCommentDiv {
        position: fixed;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap; // 设置换行需要设置各个控件的宽度
        width: 100%;
        box-sizing: border-box;
        padding: px2rem(20) px2rem(30) px2rem(20) px2rem(30);
        bottom: 0;
        // height px2rem(100)
        background-color: #fff;

        .inputclass {
            height: px2rem(60);
            width: px2rem(520);
            background-color: #f0f0f0;
            border-radius: px2rem(30);
            text-indent: px2rem(50); // 第一行缩进
        }

        .commentIcon {
            position: absolute;
            top: px2rem(40);
            left: px2rem(50);
            width: px2rem(27);
            height: px2rem(107);
            bg-image('../../assets/images/comment');
            background-size: px2rem(27);
            // background-position:center
        }

        .collect {
            width: px2rem(40);
            height: px2rem(40);
            margin: auto px2rem(30);
            bg-image('../../assets/images/no_collect');
            background-size: px2rem(40) 100%;

            &.collected {
                bg-image('../../assets/images/have_collect');
                background-size: px2rem(40) 100%;
            }
        }

        .send {
            margin: auto 0;
            width: px2rem(60);
            font-size: px2rem(26);
        }

        .hideenDiv {
            margin-top: px2rem(20);
            display: flex;

            .selctIcon {
                flex: 1;
                width: px2rem(30);
                height: px2rem(30);
                margin: auto;
                border: solid px2rem(1) #f0f0f0;
                border-radius: 50%;

                &.selctIconYes {
                    bg-image('../../assets/images/anony');
                    background-size: 100% 100%;
                }
            }

            .hidden {
                margin-left: px2rem(20);
                color: #646464;
                font-size: px2rem(24);
            }
        }
    }
}
</style>