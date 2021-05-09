<template>
	<view>
	
		<button type="default" class="list-box" @click="goweakabout">按周分析</button>
		<button type="default" class="list-box" @click="gomonthabout">按月分析</button>
		<button type="default" class="list-box" @click="goyearabout">按年分析</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goweakabout:function(){
				uni.navigateTo({
					url:"../about/about"
				})
			},
			gomonthabout:function(){
				uni.navigateTo({
					url:"../about/mobthabout"
				})
			},
			goyearabout:function(){
				uni.navigateTo({
					url:"../about/yearabout"
				})
			}
		}
	}
</script>

<style>
	.list-box{
	  text-align: center;
	  margin-top: 40px;
	  line-height: 40px;
	  width: 80%;
	  border: 1 px solid #317ac3;
	  border-radius: 5px;
	  background: #409EFF;
	  font-size: 20px;
	  color: #FFFFFF;
	}
</style>
