<template>
	<view>
		<!-- <trtc-room id="trtcroom" config="{{trtcConfig}}"></trtc-room> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trtcConfig:{
				     sdkAppID: '1401000123',  // 开通实时音视频服务创建应用后分配的 SDKAppID
				     userID: 'test_user_001', // 用户 ID，可以由您的帐号系统指定
				     userSig: 'xxxxxxxxxxxx', // 身份签名，相当于登录密码的作用
				     template: 'grid',        // 画面排版模式
				 }
			};
		}
	}
</script>

<style lang="less">

</style>
