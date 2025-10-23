<script lang="ts" setup>
	import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
	onLaunch(() => {
		console.log("App onLaunch");
		uni.reLaunch({
			url: '/pages/login/login'
		});
	});

	onShow(() => {
		console.log("App Show");
	});
	onHide(() => {
		console.log("App Hide");
	});
</script>

<style lang="scss">
	/*每个页面公共css */
	@use "@/static/styles/common.scss";
</style>