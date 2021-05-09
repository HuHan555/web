<template>
	<view>
		<view class="main">
			<view class="search-user result" >
				<view class="title" >申请列表</view>
				<view class="list user" v-for="(item,index) in applyarr" :key="index">

					<view @click="gouserhome(item.phone)" >
						<image :src="item.imgurl" mode=""></image>
					</view>
					<view class="names">
						<view class="name" v-html="item.phone"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="right-button send" @click="refuse(item.phone)">拒绝</view>
					<view class="right-button add" @click="accept(item.phone)">同意</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js";
	export default {
		
		data() {
			return {
				applyarr:[],
				phone:'',
				applyphone:'',
				ip:'',
				url:'',
			}
		},
		onLoad() {
			let user=uni.getStorageSync("user")
			this.phone=user.phone
			
			this.ip=datas.ip()
			
			this.getapplylist()
		},
		
		methods: {
			getapplylist:function(){
				let that=this
				uni.request({
					url:that.ip+'message/applylist',
					data:{
						recphone:that.phone
					},
					method:"POST",
					success:(res)=>{
						for(let i=0;i<res.data.length;i++){
							res.data[i].imgurl=that.ip+res.data[i].imgurl
						}
						that.applyarr=res.data
						// console.log(that.applyarr)
					}
				})
			},
			gouserhome:function(e){
				let urlphone="../userhome/userhome?phone="+e
				// console.log(this.urlphone)
				uni.navigateTo({
					url:urlphone,
				})
				
			},
			firstmessage:function(){
				let that=this
				uni.request({
					url:that.ip+'firstmessage',
					data:{
						sendphone:that.phone,
						recphone:that.applyphone,
						stime:new Date(),
					},
					method:"POST",
					success:(res)=>{
						console.log("fas第一条消息")
						console.log(res)
					}
				})
			},
			accept:function(e){
				let that=this
				uni.request({
					url:that.ip+'relation/accept',
					data:{
						userphone1:e,
						userphone2:that.phone,
					},
					method:"POST",
					success:(res)=>{
						console.log(res)
						if(res.data==true){
							that.getapplylist()
							that.applyphone=e
							that.firstmessage()
							uni.showToast({
							title: '添加成功'
							});
						}
						
					}
				})
				
			},
			refuse:function(e){
				let that=this
				uni.request({
					url:that.ip+'apply/refuse',
					data:{
						sendphone:e,
						recphone:that.phone,
					},
					method:"POST",
					success:(res)=>{
						console.log(res)
						if(res.data==true){
							that.getapplylist()
						}
						
					}
				})
			}
		}
	}
</script>

<style>
	@import "../../commons/css/mycss.scss";
	.main{
		padding : 88rpx $uni-spacing-col-base;
		.result{
			padding: $uni-spacing-col-base;
			.title{
				font-size: 44rpx;
				font-weight: 600;
				color: $uni-text-color;
				line-height: 60rpx;
			}
			.list{
				padding: 20rpx 0;
				width: 100%;
				height: 80rpx;
				
				image{
					float: left;
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}
			}
			.names{
				float: left;
				padding-left: $uni-spacing-col-base;
			}
			.name{
				font-size: 36rpx;
				color: $uni-text-color;
				line-height: 50rpx;
			}
			.email{
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				line-height: 28rpx;
			}
			.right-button{
				float: right;	
				width: 120rpx;
				height: 48rpx;
				background: $uni-color-primary;
				border-radius: 24rpx;
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				line-height: 48rpx;
				margin-top: 16rpx;
				text-align: center;
			}
			.send{
				background: $uni-color-primary;
				color: $uni-text-color;
			}
			.add{
				background: rgba(74,170,255,0.1);
				color: $uni-color-success;
			}
		}
	}
</style>
