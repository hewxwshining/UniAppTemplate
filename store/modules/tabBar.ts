import { USERTYPE_DRIVER } from '@/api/const';
import store from '@/store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface TabBarItem {
	visible: boolean;
	pagePath: string;
	text: string;
	iconPath: string;
	selectedIconPath: string;
}

export const driverSideTabBarItem: TabBarItem[] = [
	{
		visible: true,
		pagePath: 'pages/driverSide/index/index',
		text: '主页',
		iconPath: '/static/images/tabBar/home.png',
		selectedIconPath: '/static/images/tabBar/home-hover.png'
	},
	{
		visible: true,
		pagePath: 'pages/driverSide/order/order',
		text: '订单',
		iconPath: '/static/images/tabBar/order.png',
		selectedIconPath: '/static/images/tabBar/order-hover.png'
	},
	{
		visible: true,
		pagePath: 'pages/driverSide/my/my',
		text: '我的',
		iconPath: '/static/images/tabBar/my.png',
		selectedIconPath: '/static/images/tabBar/my-hover.png'
	}
];
export const vendorSideTabBarItem: TabBarItem[] = [
	{
		visible: true,
		pagePath: 'pages/vendorSide/index/index',
		text: '主页',
		iconPath: '/static/images/tabBar/home.png',
		selectedIconPath: '/static/images/tabBar/home-hover.png'
	},
	{
		visible: true,
		pagePath: 'pages/vendorSide/order/order',
		text: '订单',
		iconPath: '/static/images/tabBar/order.png',
		selectedIconPath: '/static/images/tabBar/order-hover.png'
	},
	{
		visible: true,
		pagePath: 'pages/vendorSide/my/my',
		text: '我的',
		iconPath: '/static/images/tabBar/my.png',
		selectedIconPath: '/static/images/tabBar/my-hover.png'
	}
];

export const useTabBarStore = defineStore('tabBar', () => {
	const tabBarList = ref<TabBarItem[]>(driverSideTabBarItem);
	const tabBarPagePath = ref();
	const setTabBarList = (userType: number) => {
		if (userType === USERTYPE_DRIVER) {
			tabBarList.value = driverSideTabBarItem;
		} else {
			tabBarList.value = vendorSideTabBarItem;
		}
	};
	const getTabBarList = () => {
		return tabBarList.value;
	};
	const setTabBarPagePath = (pathPath: string) => {
		tabBarPagePath.value = pathPath;
	};
	return {
		tabBarList,
		setTabBarList,
		getTabBarList,
		setTabBarPagePath
	};
});

export function useTabBarStoreHook() {
	return useTabBarStore(store);
}
