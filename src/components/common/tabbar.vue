<template lang="html">
    <div class="bottomTabWrap">
        <div class="bottomTab">
            <div class="tabList">
                <router-link to="/home">
                    <div class="indexTabItem">首页</div>
                </router-link>
                <router-link to="/loan">
                    <div class="topTabItem">贷款</div>
                </router-link>
                <router-link to="/news">
                    <div class="newsTabItem">新闻</div>
                </router-link>
                <router-link to="/mine">
                    <div class="mineTabItem">我的</div>
                </router-link>
            </div>
        </div>
        <router-view ></router-view>
    </div>
</template>
<style lang="stylus" type="text/stylus" scoped rel="stylesheet/stylus">
@import './../../common/stylus/pxrem.styl';

.bottomTabWrap {
    width: 100%;
    padding-bottom: px2rem(98);
    min-height: 100%;
    box-sizing: border-box;

    .bottomTab {
        position: fixed;
        width: 100%;
        height: px2rem(98);
        bottom: 0;
        left: 0;
        z-index: 999;
        background-color: #fff;

        .tabList {
            width: 100%;
            height: px2rem(98);
            position: absolute;
            bottom: 0;
            display: flex;
            flex-direction: row;
            background-color: rgba(255, 255, 255, 1);
            // 设置tabbar不透明
            borderTop(#e6e6e6);

            a {
                height: 100%;
                width: 25%;
                flex: 1;
                text-decoration: none;
                color: #646464;

                div {
                    width: 100%;
                    height: 100%;
                    font-size: px2rem(20);
                    color: #999;
                    text-align: center;
                    line-height: 2rem;
                }

                .indexTabItem {
                    bg-image('../../assets/images/nav_home');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(13);
                }

                .topTabItem {
                    bg-image('../../assets/images/nav_loan');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(12);
                }

                .newsTabItem {
                    bg-image('../../assets/images/nav_top');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(12);
                }

                .mineTabItem {
                    bg-image('../../assets/images/nav_mine');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(12);
                }
            }

            .router-link-active {
                div {
                    width: 100%;
                    height: 100%;
                    font-size: px2rem(20);
                    color: #fe9f28;
                    text-align: center;
                    line-height: 2rem;
                }

                .indexTabItem {
                    bg-image('../../assets/images/nav_home_active');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(13);
                }

                .topTabItem {
                    bg-image('../../assets/images/nav_loan_active');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(12);
                }

                .newsTabItem {
                    bg-image('../../assets/images/nav_top_active');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(12);
                }

                .mineTabItem {
                    bg-image('../../assets/images/nav_mine_active');
                    background-repeat: no-repeat;
                    background-size: px2rem(40);
                    background-position: center px2rem(12);
                }
            }
        }
    }
}
</style>
