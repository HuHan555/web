<template>
	<view class="">
		<input type="text" value="" />
		<button type="default" @click="send">send</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keepAliveFlag: true,
				clock: -1,
			}
		},
		onLoad() {
			
		},
		methods: {
			send:function(e){
				this.connectSocket()
			},
			connectSocket() {
				let _this = this
				uni.connectSocket({
					// url: _this.g_webSocketUrl + '/webSocket/addOrder/' ,
					url: 'ws://127.0.0.1:8080/websocket',
					success() {
						//初始化socket环境 绑定相关的方法
						_this.initSocketEvent()
					}
				})
			},
			initSocketEvent() {
				let _this = this
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接打开！')
					//获取断线期间的新订单
					// _this.getNewOrder()
					//连接存活检测
					_this.keepAliveCheck()
				})
				uni.onSocketMessage(function(res) {
					if (res.data == 'pong') {
						_this.keepAliveFlag = true
						console.log('webSocket连接正常')
					} else {
						console.log('WebSocket收到消息！')
						console.log(res.data)
						// _this.onSocketMessageSucc(JSON.parse(res.data))
					}
				})
				uni.onSocketClose(function(res) {
					console.log('WebSocket连接关闭')
					console.log(res)
					uni.closeSocket()
					clearInterval(_this.clock)
					setTimeout(() => {
						_this.connectSocket()
					}, 15000)
				})
				uni.onSocketError(function(res) {
					console.log('WebSocket连接错误')
					console.log(res)
					clearInterval(_this.clock)
					setTimeout(() => {
						_this.connectSocket()
					}, 15000)

				})
			},
			
			// getNewOrder() {
			// 	let _this = this
			// 	setTimeout(() => {
			// 		uni.request({
			// 			url: _this.g_domain + '/api/order/' + 'getNewOrderList',
			// 			method: 'GET',
			// 			header: _this.g_header.value,
			// 			success(res) {
			// 				if (res.statusCode == 200 && res.data.status == 200) {} else {
			// 					let msg = typeof(res.data) == 'string' ? res.data : res.data.msg
			// 					_this.$api.msg(msg)
			// 				}
			// 			},
			// 			fail() {
			// 				_this.$api.msg('数据请求失败，请稍后重试！')
			// 			}
			// 		})
			// 	}, 5000)
			// },
			//心跳检测
			keepAliveCheck() {
				let _this = this
				_this.clock = setInterval(() => {
					console.log('webSocket心跳检测')
					uni.sendSocketMessage({
						data: 'ping',
						success() {
							_this.keepAliveFlag = false
							setTimeout(() => {
								if (!_this.keepAliveFlag) {
									clearInterval(_this.clock)
									uni.closeSocket()
									console.log('webSocket准备重连')
									_this.connectSocket()
								}
							}, 10000)
						}
					})
				}, 15000)
			},
			onSocketMessageSucc(resData) {
				//处理数据
			},
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	.top-bar{
		background: rgba(255,255,255,0.96);
		border-bottom: 1rpx solid black;
		.search-div{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			box-sizing: border-box;
			padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
		}
		.search{
			padding: 0 60rpx 0 12rpx;
			height: 60rpx;
			background: $uni-bg-color-grey;
			border-radius: 10rpx;
		}
		.search-img{
			position: absolute;
			right: 130rpx;
			top: 22rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}
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
