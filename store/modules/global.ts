import { defineStore } from "pinia";
import store from "@/store";
import { ref } from "vue";
export const useGlobalStore = defineStore('global', () => {
	const customNavHeight = ref(44)
	const customTabHeight = ref(60)
	const setCustomNavHeight = (height : number) => {
		customNavHeight.value = height
	}
	const setCustomTabHeight = (height : number) => {
		customTabHeight.value = height
	}
	return {
		customNavHeight,
		setCustomNavHeight,
		customTabHeight,
		setCustomTabHeight
	}
})

export function useGlobalStoreHook() {
	return useGlobalStore(store);
}