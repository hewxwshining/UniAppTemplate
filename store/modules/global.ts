import { defineStore } from "pinia";
import store from "@/store";

export const useGlobalStore = defineStore('global', () => {
	
})

export function useGlobalStoreHook() {
	return useGlobalStore(store);
}