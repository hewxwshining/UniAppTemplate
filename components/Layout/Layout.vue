<template>
	<view class="app-content">
		<view class="homeLayout" :style="homeStyles">
			<!-- 使用自定义导航栏组件 -->
			<slot name="CustomNavbar">
				<custom-navbar :title="title"></custom-navbar>
			</slot>
			<slot></slot>
			<!-- 使用自定义 TabBar -->
			<template v-if='showTabBar'>
				<slot name="CustomTabBar">
					<custom-tab-bar />
				</slot>
			</template>

		</view>
	</view>
</template>

<script lang="ts" setup>
	import CustomTabBar from "@/components/CustomTabBar/CustomTabBar.vue";
	import CustomNavbar from "@/components/CustomNavbar/CustomNavbar.vue";
	import { useGlobalStore } from "@/store";
	import { storeToRefs } from "pinia";
	import { computed } from "vue";
	const globalStore = useGlobalStore()
	const { customNavHeight, customTabHeight } = storeToRefs(globalStore)

	const props = defineProps({
		title: {
			type: String,
			default: '首页'
		},
		
		showTabBar: {
			type: Boolean,
			default: true
		}
	})

	const homeStyles = computed(() => {
		const style = { paddingTop: customNavHeight.value + 'px', paddingBottom: customTabHeight.value + 'px' }
		if(!props.showTabBar){
			style.paddingBottom ="0px"
		}
		return style
	})
</script>

<style lang="scss" scoped>

</style>