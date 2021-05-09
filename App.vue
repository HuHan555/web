<script>
	import GoEasy from './lib/goeasy-1.2.1.js';
	export default {
		globalData:{
		    //全局挂载，若不需要支持nvue，也可以在main.js里挂在Vue.prototype,其他页面通过this.goEasy获取
			goEasy: GoEasy.getInstance({
				host:"hangzhou.goeasy.io",//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
                appkey:"BC-9a1731b3b09e46968e69b7765f9d1b89",// common key,
                // true表示支持通知栏提醒，false则表示不需要通知栏提醒
                allowNotification:true //仅有效于app，小程序和H5将会被自动忽略
            })
		},
		onLaunch: function() {
		    console.log("App onLaunch");
            this.globalData.goEasy.connect({
                onSuccess: function(){
                    console.log("GoEasy connect successfully.")
                },
                onFailed: function(error){
                    console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
                    uni.showModal({
                        title: error.code.toString(),
                        content: error.content,
                        showCancel: false,
                        duration: 6000
                    })
                },
                onProgress: function(attempts){
                    console.log("GoEasy is connecting", attempts);
                }
            });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
