<template>
	<view class="content">
		<view class="top-bar">
			<!-- <view class="top-bar-left">
				<image :src="img" @click="chooseImage"></image>
			</view> -->
			<navigator :url="urlphone" hover-class="none" class="top-bar-left">
				<image :src="img"></image>
			</navigator>
			<!-- <view class="top-bar-center">
				<image src="../../static/imgs/logo.png" class="logo"></image>
			</view> -->
			<view class="top-bar-right">
				<view class="search" @click="goSearch">
					<image src="../../static/imgs/search.jpg" mode=""></image>
				</view>
				<view class="add">
					<image src="../../static/imgs/add2.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="friends">
				<view class="friend-list" @click="friendapply">
					<view class="friend-list-l">
						<text class="tip">{{applycount}}</text>
						<image src="../../static/shilu-login/4.png"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">好友申请</view>
							<view class="time">12:12</view>
						</view>
						<view class="information">
							茫茫人海，相聚就是缘分
						</view>
					</view>
				</view>
				<view class="friend-list" @click="goinformation">
					<view class="friend-list-l">
						<text class="tip">1</text>
						<image src="../../static/shilu-login/4.png"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">系统通知</view>
							<view class="time">12:12</view>
						</view>
						<view class="information">
							茫茫人海，相聚就是缘分
						</view>
					</view>
				</view>
			</view>
			<view class="friends">
				<view class="friend-list" v-for="(item,index) in friends" :key="index" >
					<view class="friend-list-l" @click="gouserhome(item.friendphone)">
						<text class="tip" v-if="item.tip>0">{{item.tip}}</text>
						<image :src="item.imgurl"></image>
					</view>
					<view class="friend-list-r" @click="gochatroom(item.friendphone,item.imgurl)">
						<view class="top">
							<view class="name">{{item.friendphone}}</view>
							<view class="time">{{changeTime(item.time)}}</view>
						</view>
						<view class="information">
							{{item.information}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let goEasy = getApp().globalData.goEasy;
	import datas from "../../commons/js/datas.js"
	import myfun from "../../commons/js/myfun.js"
	export default{
		data(){
			return {
				friends:[],
				phone:'',
				img:'',
				// imgArr:[],
				tempFilePaths:[],
				urlphone:'',
				applycount:'',
				ip:'',
			}
		},
		onLoad(){
			this.ip=datas.ip()
			let user=uni.getStorageSync("user")
			this.phone=user.phone
			this.img=user.Imgurl
			
			if(this.img==null){
				this.img="../../static/imgs/1.jpeg"
			}
			this.urlphone1()
			//获得好友申请数量
			this.getapplylist()
			this.getFriends();
			// goEasy.subscribe({
			//     channel: "19912451785",//替换为您自己的channel
			//     onMessage: function (message) {
			//         console.log("Channel:" + message.channel + " content:" + message.content);
			//     },
			//     onSuccess: function () {
			//         console.log("Channel订阅成功。");
			//     },
			//     onFailed: function (error) {
			//         console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
			//     }
			// });
		},
		methods:{
			gouserhome:function(e){
				
				let urlphone="../userhome/selfuserhome?phone="+e
				// console.log(this.urlphone)
				uni.navigateTo({
					url:urlphone,
				})
				
			},
			//跳转到提醒页面
			goinformation:function(){
				uni.navigateTo({
					url:'../inormation/inormation'
				})
			},
			//获取聊天的好友列表
			getFriends:function(){
				let that=this
				uni.request({
					url:that.ip+'getmessagelist',
					data:{
						phone:that.phone
					},
					// method:'POST',
					success: (res) => {
						
						for(let i=0;i<res.data.length;i++){
							res.data[i].imgurl=that.ip+res.data[i].imgurl
						}
						that.friends=res.data
						console.log(that.friends)
					}
				})
			},
			//获取好友申请数量
			getapplylist:function(){
				let that=this
				uni.request({
					url:that.ip+'message/applylist',
					data:{
						recphone:that.phone
					},
					method:"POST",
					success:(res)=>{
						// console.log(res.data)
						that.applycount=res.data.length
					}
				})
			},
			//跳转到聊天页面
			gochatroom:function(e,num){
				uni.navigateTo({
					url:"../chatroom/chatroom?chatphone="+e+"&chatimg="+num
				})
			},
			//拼接根据电话的路由
			urlphone1:function(){
				this.urlphone="../userhome/doctoruserhome?phone="+this.phone
				// console.log(this.urlphone)
			},
			//好友申请
			friendapply:function(){
				uni.navigateTo({
					url:"../apply/apply",
					
				})
			},
			//转换时间
			changeTime:function(date){
				return myfun.dateTime(date)
			},
			
			//跳转到聊天页面
			goSearch:function(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			
			
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	// .content{
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// 	padding-top: var(--status-bar-height);
	// }
	.top-bar{
		background: rgba(255,255,255,0.96);
		border-bottom: 1rpx solid black;
		.top-bar-right{
			image{
				padding: 18rpx;
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
	.main{
		padding-top: 104rpx;
		padding-bottom: $uni-spacing-col-base;
		// border: 1rpx solid red;
	}
	.friend-list{
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;
		&:active{
			background-color: $uni-bg-color-grey;
		}
		
		.friend-list-l{
			float: left;
			position: relative;
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-color-primary;
			}
			.tip{
				position: absolute;
				z-index: 100;
				top: -8rpx;
				min-width: 20rpx;
				left: 68rpx;
				height: 36rpx;
				background: $uni-color-warning;
				border-radius: 18rpx;
				padding: 0 8rpx;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}
			
		}
		.friend-list-r{
			padding-left: 128rpx;
			.top{
				height: 50rpx;
				.name{
					float: left;
					font-size: 36rpx;
					// font-family:PingFangSC-Regular,PingFang SC;
					font-weight: 400;
					color: $uni-text-color;
					line-height: 50rpx;
				}
				.time{
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 50rpx;
				}
			}
			.information{
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
	}
</style>
