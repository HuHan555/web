<template>
	<view>
		<view class="" v-for="(item,index) in notice" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	let goEasy = getApp().globalData.goEasy;
	export default {
		data() {
			return {
				notice:[],
			}
		},
		onLoad() {
			let self = this;
			goEasy.subscribe({
			    channel: "987654321",
			    onMessage: function (message) {
			        self.notice.unshift(message.content)
					console.log(self.notice)
					uni.setStorageSync("notice",self.notice)
			    },
			    onSuccess: function () {
			        
			    },
			    onFailed: function (error) {
			        
			    }
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
