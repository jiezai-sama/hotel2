<template>
    <div id="room_detail">
        <!-- 导航栏 -->
        <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
            <template #title>
                <span class="font-title">房间详情</span>
            </template> 
            <template #left>
                <i class="iconfont">&#xe71a;</i>
            </template>   
            <template #right>
                <i class="iconfont icon-two">&#xe60a;</i>
            </template>
        </van-nav-bar>
        <!-- 轮播图片 -->
        <van-swipe class="my-swipe">
            <van-swipe-item  v-for="(image,index) of banners" :key="index">
                <img  v-lazy="image.banner" />
                <span class="swiper-font">{{index + 1}}/{{banners.length}}</span>
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">
                </div>
            </template>
        </van-swipe>
        <!-- 详情区域 -->
        <div id="container">
            <div class="center_div">
                <!-- 标签 -->
                <div class="tags">
                    <span v-for="(tag,i) of tags" :key="i">
                        <img src="/img/house/icons/tag.png" alt="">
                        <span>{{tag.tname}}</span>
                    </span>
                </div>
                <!-- 标题 -->
                <div class="room-title">{{roomMessage.rName}}</div>
                <!-- 价格 -->
                <p class="price_all">
                    <span>￥</span>
                    <span>{{roomMessage.lowerPrice}}</span>
                    <span class="price_f">起/晚</span>
                </p>
                <!-- 出租类型、居住人数、房屋配备 -->
                <div class="infoBar">
                    <div class="icons_three">
                        <div class="icon-item">
                            <img src="/img/house/icons/house.png" alt="">
                            <p>{{roomMessage.leaseType}}</p>
                        </div>
                        <div class="icon-item">
                            <img src="/img/house/icons/people.png" alt="">
                            <p>宜住{{roomMessage.guestNum}}人</p>
                        </div>
                        <div class="icon-item">
                            <img src="/img/house/icons/bed.png" alt="">
                            <p>共{{roomMessage.bedNum}}张</p>
                        </div>
                    </div>
                    <div class="infoBar_explain">
                        <p>
                            <span>整套{{roomMessage.roomArea}}平方米</span>
                            <span>{{roomMessage.houseTypeInfo}}{{roomMessage.houseOtherInfo}}</span>
                        </p>
                    </div>
                </div>
                <!-- 房东头像信息 -->
                <img class="owner_img" :src="ownerMsg.oImg" alt="">
                <p class="o_nickname">{{ownerMsg.oNickname}}</p>
                <p class="identify">{{ownerMsg.identification ? '已实名认证' : '未实名认证'}}</p>
            </div>
            <!-- 房屋描述 -->
            <div class="desc_container">

            </div>
        </div>
    </div>
</template>
<style scoped>
    .font-title {
        font-size: 0.426667rem;
        font-weight: 600;
        color: #333;
    }
    .my-swipe .van-swipe-item {
        position: relative;
        height: 6.666667rem;
        overflow: hidden;
    }
    .van-swipe-item>img{
        width: 100%;
    }
    .swiper-font {
        position: absolute;
        top: 6.133333rem;
        right: .4rem;
        color: #fff;
    }
    #container {
        background: #fff;
        margin: .266667rem .4rem 0;
    }
    .center_div {
        text-align: center;
        padding-bottom: .533333rem;

    }
    .tags {
        color: #999;
        text-align: left;
        white-space: nowrap;
        width: 100%;
        height: .853333rem;
        margin-left: -.053333rem;
    }
    .tags>span {
        display: inline-block;
        margin-right: .233333rem;
        font-size: .32rem;
        color: #720124;
    }
    .tags>span>img {
        width: .32rem;
        vertical-align: bottom;
        margin-right: .083333rem;
    }
    .room-title {
        font-size: .586667rem;
        color: #333;
        text-align: left;
        line-height: .8rem;
        font-weight: 400;
    }
    .price_all {
        font-size: .533333rem;
        text-align: left;
        color: #000;
        line-height: .533333rem;
        margin-top: .266667rem;
    }
    .price_f {
        font-size: .266667rem;
        color: #757575!important;
        margin-top: -.053333rem;
        text-align: center;
        margin-left: .09333rem;
    }
    .infoBar {
        margin: .533333rem 0;
        width: 100%;
        background: #ececec;
        border-radius: .08rem;
    }
    .icons_three {
        display: flex;
        background-color: #f5f5f5;
        height: 2.4rem;
        font-weight: 600;
    }
    .icon-item {
        flex: 1 0 auto;
        padding-top: .4rem;
        position: relative;
    }
    .icon-item>img {
        width: 1.066667rem;
        margin-bottom: .133rem;
    }
    .infoBar_explain {
        padding: .4rem 0;
    }
    .infoBar_explain>p {
        font-size: .373333rem;
        line-height: .533333rem;
    }
    .infoBar_explain>p>span:first-child {
        margin-right: .2333rem;
    }
    .owner_img {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: .8rem;
    }
    .o_nickname {
        font-size: .48rem;
        color: #333;
        padding: .266667rem  .08rem;
        font-weight: 600;
        line-height: .533333rem;
    }
    .identifyc {
        color: #999;
        font-size: .373333rem;
        line-height: .533333rem;
    }
    .desc_container {
        border-top: .026667rem solid #eee;
        padding: .4rem 0;
    }
</style>
<script>
export default {
    data() {
        return {
            roomMessage:{},       //房间所有详细信息
            banners:[],           //轮播图    
            tags:[],              //标签
            ownerMsg:{},          //房东信息
        }
    },
    methods:{
        // 向后台请求房间商品数据
        getRoomDetails() {
            let id = this.$route.params.id;
            console.log(id);
            this.axios.get('/house/' + id).then(res => {
                this.roomMessage = res.data;
                this.banners = res.data.RoomImgs;
                this.tags = res.data.Titles;
                this.ownerMsg = res.data.Owner;
                console.log(res.data);
            })
        },
        //点击导航栏左侧图标，返回上一页
        onClickLeft() {
            this.$router.go(-1);
        },
        //点击导航栏右侧图标，弹出菜单选项
        onClickRight() {
            console.log("弹出菜单");
        }
    },
    created() {
        this.getRoomDetails();
    }
    
}
</script>