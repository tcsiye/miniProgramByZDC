<template>
	<image class="logo" mode="center" src="/static/logo.jpg"></image>

</template>

<script>
	export default {
		onLoad() {
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/home/index'
				});
			}, 1000)
		}
	}
</script>

<style>
	.logo {
		/* height: 100rpx;
		width: 100rpx; */
	}
</style>
