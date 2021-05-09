<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="bt-img" @tap="records">
					<image :src="toc"></image>
				</view>
				<textarea auto-height="true" class="chat-send btn" :class="{displaynone:isrecord}" @input="inputs" v-model="msg" @focus="focus"></textarea>
				<view class="record btn" :class="{displaynone:!isrecord}">按住说话</view>
				<view class="bt-img" @tap="emoji()">
					<image src="../../static/imgs/smile.jpg"></image>
				</view>
				<view class="bt-img" @tap="moreFun()">
					<image src="../../static/imgs/add2.svg"></image>
				</view>
			</view>
			<view class="emoji" :class="{displaynone:isemoji}">
				<view class="emoji-send">
					<view class="emoji-send-det" @tap="emojiBack">
						<image src="../../static/imgs/tuige.webp"></image>
					</view>
					<view class="emoji-send-bt" @tap="emojiSend">
						发送
					</view>
				</view>
				<emoji @emotion="emotion" :height="260"></emoji>
			</view>
			<view class="more" :class="{displaynone:ismore}" >
				<view class="more-list" @click="chooseImage">
					<image src="../../static/shilu-login/1.png" mode=""></image>
					<view class="more-list-title" >
						图片
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/shilu-login/1.png" mode=""></image>
					<view class="more-list-title">
						文件
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/shilu-login/1.png" mode=""></image>
					<view class="more-list-title">
						图片
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/shilu-login/1.png" mode=""></image>
					<view class="more-list-title">
						图片
					</view>
				</view>
				<view class="more-list">
					<image src="../../static/shilu-login/1.png" mode=""></image>
					<view class="more-list-title">
						图片
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from "./emoji/emoji.vue"
	export default {
		data() {
			return {
				isrecord:false,
				isemoji:true,
				toc:"../../static/imgs/voice.jpg",
				msg:"",
				ismore:true,
				phone:''
			}
		},
		components:{
			emoji,
		},
		onLoad() {
			let user=uni.getStorageSync("user")
			this.phone=user.phone
			console.log(this.phone)
		},
		methods: {
			chooseImage(){
				let that=this
				uni.chooseImage({
					count: 1,
					success:(res)=> {
						// console.log(123)
						that.tempFilePaths = res.tempFilePaths;
						// console.log(that.tempFilePaths[0])
						uni.uploadFile({
							url: 'http://192.168.43.245:8080/message/uploadimg',
							fileType:"image",
							Header:{
								'content-Type':'multipart/form-data'
							},
							filePath: that.tempFilePaths[0],
							name: 'file',
							formData: {
								phone: that.phone,
								'user': 'test'
							},
							success: (uploadFileRes) => {
								// that.img=uploadFileRes.data
								that.send(uploadFileRes,1)
								console.log(uploadFileRes);
							}
						});
						// this.img=res.tempFilePaths[0]
					}
				})
				
			},
			//获取模块高度
			getElementHeight:function(){
				const query=uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data=>{
					this.$emit('heights',data.height);
				}).exec();
			},
			//点击切换音频
			records:function(){
				//关闭其他项
				this.isemoji=true;
				this.ismore=true;
				setTimeout(()=>{
					this.getElementHeight();
				},10);
				if(this.isrecord){
					this.isrecord=false;
					this.toc="../../static/imgs/voice.jpg";
				}else{
					this.isrecord=true;
					this.toc="../../static/imgs/2.jpg"
				}
			},
			//表情包
			emoji:function(){
				this.isemoji=!this.isemoji;
				//关闭更多界面
				this.ismore=true;
				setTimeout(()=>{
					this.getElementHeight();
				},10);
				
			},
			//更多功能
			moreFun:function(){
				this.ismore=!this.ismore;
				//关闭其他项
				this.isemoji=true;
				setTimeout(()=>{
					this.getElementHeight();
				},10)
			},
			//接受表情
			emotion:function(e){
				this.msg=this.msg+e;
				console.log(e);
			},
			//文字发送
			inputs:function(e){
				var chatm=e.detail.value;
				var pos=chatm.indexOf('\n');
				if(pos!=-1 && chatm.length>1){
					this.send(this.msg,0);
				}
			},
			//输入框聚焦
			focus:function(){
				this.isemoji=true;
				setTimeout(()=>{
					this.getElementHeight();
				},10);
			},
			//表情发送
			emojiSend:function(){
				if(this.msg.length>0){
					this.send(this.msg,0);
				}
			},
			//退格
			emojiBack:function(){
				if(this.msg.length>0){
					this.msg=this.msg.substring(0,this.msg.length-1);
				}
			},
			//发送
			send:function(msg,type){
				let data={
					message:msg,
					types:type,
				};
				this.$emit("inputs",data);
				setTimeout(()=>{
					this.msg="";
				},0)
			},
			
		}
	}
</script>

<style lang="scss">
	
	.submit{
		background: rgba(244,244,244,0.96);
		border-top: 1rpx solid $uni-border-color;
		width: 100%;

		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: env(safe-area-inset-bottom);
	}
	.displaynone{
		display: none;
	}
	.submit-chat{
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;
		image{
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}
		.bt-img{
			
		}
		.btn{
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}
		.record{
			text-align: center;
			font-size: $uni-font-size-lg;
			// color: $uni-bg-color-grey;
		}
	}
	.emoji{
		width: 100%;
		height: 460rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0rpx -1rpx 0rpx 0rpx rgba(0,0,0,0.1);
		.emoji-send{
			width: 300rpx;
			height: 104rpx;
			padding-top: 24rpx;
			// background-color: #999;
			background: rgba(236,237,238,0.8);
			position: fixed;
			bottom: env(safe-area-inset-bottom);
			right: 0;
			display: flex;
			.emoji-send-bt{
				flex: 1;
				margin: 0 32rpx 0 20rpx;
				height: 88rpx;
				background: rgba(255,228,49,1);
				font-size: 32rpx;
				border-radius: 12rpx;
				text-align: center;
				line-height: 88rpx;
			}
			.emoji-send-det{
				flex: 1;
				margin-left: 24rpx;
				height: 82rpx;
				background: #fff;
				font-size: 32rpx;
				padding-top: 8rpx;
				border-radius: 12rpx;
				text-align: center;
				line-height: 88rpx;
				image{
					width: 48rpx;
					height: 34rpx;
				}
			}
		}
	}
	.more{
		width: 100%;
		height: 460rpx;
		background: rgba(236,237,238,1);
		box-shadow: 0rpx -1rpx 0rpx 0rpx rgba(0,0,0,0.1);
		bottom: env(safe-area-inset-bottom);
		padding: 8rpx 20rpx;
		box-sizing: border-box;
		.more-list{
			width: 25%;
			text-align: center;
			float: left;
			padding-top: 32rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background: rgba(255,255,255,1);
				border-radius: 24rpx;
			}
			.more-list-title{
				font-size: 24rpx;
				color: rgba(39,40,50,0.5);
				line-height: 34rpx;
			}
		}
		
	}
</style>
