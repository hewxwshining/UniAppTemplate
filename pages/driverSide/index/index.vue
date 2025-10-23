<template>
	<layout title="首页">
		<view class="text-area">
			<text class="title">司机端首页</text>
		</view>
	</layout>
</template>

<script lang="ts" setup>
	import layout from '@/components/Layout/Layout.vue';
	import { onLoad } from "@dcloudio/uni-app";
	onLoad(() => {
		uni.hideTabBar()

	})
</script>

<style lang="scss" scoped>

</style>