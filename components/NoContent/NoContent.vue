<template>
	<view class="no-content">
		<uni-icons class="uni-icons margin-right-sm" custom-prefix="iconfont" type="icon-nodata" color="#C0C4CC"
			size="80rpx" v-if="props.showIcon"></uni-icons>
		<text class="txt">{{ props.info }}</text>
	</view>
</template>

<script setup lang="ts">
	defineOptions({
		name: "NoContent",
		inheritAttrs: false,
	});
	const props = defineProps({
		showIcon: {
			type: Boolean,
			default: true,
		},
		info: {
			type: String,
			default: "暂无数据",
		},
	});
</script>

<style lang="scss" scoped>
	.no-content {
		padding: $padding-base 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		.txt {
			color: $font-color-disabled;
			padding: 20rpx 0 20rpx;
			font-size: $font-lg;
		}
	}
</style>