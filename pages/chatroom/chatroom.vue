<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @click="BackOne()">
				<image src="../../static/imgs/back.svg" class="back-img"></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					{{chatphone}}
				</view>
			</view>
			<view class="top-bar-right">
				<view class="group-img">
					<image :src="chatimg"></image>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="chat" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index" :id="'msg'+item.tip">
				<!-- <view class="chat-ls" v-for="(item,index) in msgs" :key="index" > -->
					<view class="chat-time" v-if="item.time!=''">
						{{changeTime(item.time)}}
					</view>
					<view class="msg-m msg-l" v-if="item.id!='b'">
						<image :src="item.imgurl" class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImage(item.message)"></image>
						</view>
					</view>
					<view class="msg-m msg-r" v-if="item.id=='b'">
						<image :src="item.imgurl" class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="msg-text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImage(item.message)"></image>
						</view>
					</view>
				</view>
				
			</view>
			<!-- <view class="paddt"></view> -->
		</scroll-view>
		<submit @inputs="inputs" @heights="heights"></submit>
	</view>
</template>

<script>
	let goEasy = getApp().globalData.goEasy;
	import datas from "../../commons/js/datas.js";
	import myfun from "../../commons/js/myfun.js";
	import submit from "../../components/submit/submit.vue";
	export default {
		data() {
			return {
				msgs:[],
				ImgMsg:[],
				oldTime:new Date(),
				scrollToView:"",
				inputh:'60',
				chatphone:'',
				chatimg:'',
				phone:'',
				img:'',
				msg1:[],
				ip:'',
			}
		},
		onLoad:function(option){
			console.log(option)
			this.chatphone=option.chatphone
			this.chatimg=option.chatimg
			this.ip=datas.ip()
			let user=uni.getStorageSync("user")
			this.phone=user.phone
			this.img=user.Imgurl
			
			this.getmessage();
			console.log(this.msg1)
			let that=this
			goEasy.subscribe({
			    channel: that.chatphone,
			    onMessage: function (message) {
					let len =that.msgs.length;
					let data={
						id:'a',
						imgurl: that.chatimg,
						message: message.content,
						types: "0",
						time: new Date(),
						tip: len,
					};
					that.msgs.push(data);
					that.goBottom();
			    },
			    onSuccess: function () {
			        console.log("订阅成功")
			    },
			    onFailed: function (error) {
			        console.log("订阅失败，错误编码："+error.code+" 错误信息："+error.content);
			    }
			});
			// this.getMsg();
		},
		components:{
			submit,
		},
		methods: {
			
			BackOne(){
				uni.navigateBack({
					delta:1,
				});
			},
			//处理时间
			changeTime:function(date){
				return myfun.dateTime1(date);
			},
			//接受文本消息
			inputs:function(e){
				// console.log(e)
				let len =this.msgs.length;
				
				let data={
					id:'b',
					imgurl: this.img,
					message: e.message,
					types: e.types,
					time: new Date(),
					tip: len,
				};
				this.msgs.push(data);
				this.sendmessage(e);
				this.goBottom();
				// console.log(e);
			},
			sendmessage:function(e){
				
				let that=this
				// uni.request({
				// 	url:'http://192.168.43.245:8080/sendmessage',
				// 	data:{
				// 		sendphone:that.phone,
				// 		recphone:that.chatphone,
				// 		message:e.message,
				// 		stime:new Date(),
				// 		types:"0",
				// 		isvalid:"1"
				// 	},
				// 	method:'POST',
				// 	success: (res) => {
				// 		console.log(res)
				// 	}
				// })
				
					
				let body = e.message;
				if(e.length >= 50){
					body = e.substring(0,30)+"...";
				}
				console.log(body)
				goEasy.publish({
					channel: that.phone,
					message: body,
					//只要接收端APP参数以及GoEasy控制台参数正确配置，并且allowNotification为true，就可以接收通知栏提醒
					//若不需要通知栏提醒，可以直接删掉notification
					notification: {
					    title: "收到一条新消息",
					    body: body      // 字段最长50字符
					},
					onSuccess: function () {
						// that.message = ''; //清空发送消息内容
					},
					onFailed: function (error) {
						console.log("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
					}
				});
				
			},
			//输出变化高度
			heights:function(e){
				// console.log(e)
				this.inputh=e;
				this.goBottom();
			},
			
			getmessage:function(){
				let that=this
				uni.request({
					url:that.ip+'getchatmessage',
					data:{
						sendphone:that.phone,
						recphone:that.chatphone
					},
					method:'POST',
					success: (res) => {
						console.log(res)
						for(let i=0;i<res.data.length;i++){
							res.data[i].imgurl=that.ip+res.data[i].imgurl
						}
						that.msg1=res.data
						// console.log(that.msg1)
						that.getMsg()
					}
				})
			},
			//获取聊天数据
			getMsg:function(){
				let msg=this.msg1;
				//
				for(var i=0;i<msg.length;i++){
					//时间间隔
					if(i<msg.length-1){
						let t=myfun.spacTime(this.oldTime,msg[i].time);
						if(t){
							this.oldTime=t;
						}
						msg[i].time=t;
					}
					
					//图片加入列表
					if(msg[i].types==1){
						this.ImgMsg.unshift(msg[i].message);
					}
					this.msgs.unshift(msg[i]);
				}
				this.$nextTick(function(){
					this.scrollToView='msg'+this.msgs[i-1].tip;
				})
				
				// console.log(this.msgs)
			},
			//预览图片
			previewImage:function(e){
				//定位点击图片
				let index=0;
				for(let i=0;i<this.ImgMsg.length;i++){
					if(this.ImgMsg[i]==e){
						index=i;
					}
				}
				uni.previewImage({
					current:index,
					urls: this.ImgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// getMsg:function(){
			// 	let msg=datas.message();
			// 	//
				
			// 	for(var i=0;i<msg.length;i++){
			// 		//时间间隔
			// 		if(i<msg.length-1){
			// 			let t=myfun.spacTime(this.oldTime,msg[i].time);
			// 			if(t){
			// 				this.oldTime=t;
			// 			}
			// 			msg[i].time=t;
			// 		}
					
			// 		//将路径补全
			// 		msg[i].imgurl="../../static/imgs/"+msg[i].imgurl;
			// 		//补充图片地址
			// 		if(msg[i].types==1){
			// 			msg[i].message="../../static/imgs/"+msg[i].message;
			// 			this.ImgMsg.unshift(msg[i].message);
			// 		}
			// 		this.msgs.unshift(msg[i]);
			// 	}
			// 	this.$nextTick(function(){
			// 		this.scrollToView='msg'+this.msgs[i-1].tip;
			// 	})
				
			// 	// console.log(this.msgs)
			// },
			// //预览图片
			// previewImage:function(e){
			// 	//定位点击图片
			// 	let index=0;
			// 	for(let i=0;i<this.ImgMsg.length;i++){
			// 		if(this.ImgMsg[i]==e){
			// 			index=i;
			// 		}
			// 	}
			// 	uni.previewImage({
			// 		current:index,
			// 		urls: this.ImgMsg,
			// 		longPressActions: {
			// 			itemList: ['发送给朋友', '保存图片', '收藏'],
			// 			success: function(data) {
			// 				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			// 			},
			// 			fail: function(err) {
			// 				console.log(err.errMsg);
			// 			}
			// 		}
			// 	});
			// },
			//滚动到底部
			goBottom:function(){
				this.scrollToView="";
				this.$nextTick(function(){
					let len =this.msgs.length-1;
					this.scrollToView='msg'+this.msgs[len].tip;
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	page{
		height: 100%;
	}
	.content{
		height: 100%;
		background: rgba(244,244,244,1);
	}
	.top-bar{
		background: rgba(244,244,244,0.96);
		border-bottom: 1rpx solid $uni-border-color;
		.group-img{
			position: absolute;
			width: 68rpx;
			height: 68rpx;
			bottom: 10rpx;
			right: $uni-spacing-col-base;
			image{
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
		.title{
			padding-top: 16rpx;
		}
	}
	.chat{
		height: 100%;
		.paddt{
			height: env(safe-area-inset-bottom);
			width: 100%;
		}
		.chat-main{
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			// padding-bottom: 120rpx;
			
			display: flex;
			flex-direction: column;
		}
		.chat-ls{
			.chat-time{
				font-size: $uni-font-size-sm;
				color: rgba(39,40,50,0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}
			.msg-m{
				display: flex;
				padding: 20rpx 0;
				.user-img{
					flex: none;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}
				.message{
					flex: none;
					max-width: 480rpx;
				}
				.msg-text{
					font-size: $uni-font-size-lg;
					color: $uni-text-color;
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}
				.msg-img{
					max-width: 400rpx;
					border-radius: $uni-border-radius-base;
				}
			}
			.msg-l{
				flex-direction: row;
				.msg-text{
					background-color: #fff;
					margin-left: 16rpx;
					border-radius:0rpx 20rpx 20rpx 20rpx ;
				}
				.msg-img{
					margin-left: 16rpx;
				}
			}
			.msg-r{
				flex-direction: row-reverse;
				.msg-text{
					margin-right: 16rpx;
					background: rgba(74,170,255,0.1);
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}
				.msg-img{
					margin-right: 16rpx;
				}
			}
		}
	}
</style>
