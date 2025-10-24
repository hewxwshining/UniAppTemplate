import { ref } from 'vue';
import { DictFlagEnum } from '@/api/const';
import { getDictDocApi, getDictRepairProjectApi } from "@/api/auth";
import { useUserStore } from '@/store';

//#region 选择图片
/**
 * 选择图片
 */
export const chooseMedia = async () => {
	// 微信由于旧接口不再维护，针对微信小程序平台改用chooseMedia接口
	// #ifdef MP-WEIXIN
	const res = await uni.chooseMedia({
		count: 1,
		mediaType: ['image'],
		sizeType: ['original', 'compressed'], // 启用压缩
		sourceType: ['album', 'camera'] //选择图片的来源,
		// success(res) {
		// 	res.tempFiles.forEach(item => {
		// 		item.path = item.tempFilePath;
		// 	})
		// 	return packFilePath(res, 'image');
		// },
		// fail(res) {
		// 	return ({ errMsg: res.errMsg });
		// }
	});
	res.tempFiles.forEach(item => {
		item.path = item.tempFilePath;
	})
	return packFilePath(res, 'image');
	// #endif
	// #ifndef MP-WEIXIN
	const res = await uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'], // 启用压缩
		sourceType: ['album', 'camera'],//选择图片的来源
		// success(res) {
		// 	//console.log(res.tempFilePaths)
		// 	return packFilePath(res, 'image');
		// },
		// fail(res) {
		// 	return ({ errMsg: res.errMsg });
		// }
	});
	return packFilePath(res, 'image');
	// #endif
};
const packFilePath = (res, fileType) => {
	res.tempFiles.forEach((item, index) => {
		if (!item.name) {
			item.name = item.path.substring(item.path.lastIndexOf('/') + 1);
		}
		if (fileType) {
			item.fileType = fileType;
		}
	});
	if (!res.tempFilePaths) {
		res.tempFilePaths = res.tempFiles.map((file) => file.path);
	}
	return res;
}
//#endregion

// 获取已绑定车辆
export const db_Cars = ref([]);
export const userStore = useUserStore();
export const getMyCars = () => {
	const { Cars } = userStore.getUserInfo();
	if (Cars) {
		const arr = JSON.parse(JSON.stringify(Cars));
		for (let i = 0; i < arr.length; i++) {
			let item = arr[i];
			item.CarNoCn = `${item.CarCn} ${item.CarNo}`;
		}
		db_Cars.value = arr;
	}
}

export const db_RepairTypeAll = ref([]);
// 通过字典接口获取所有的维修保养类型
export const getDocRepaireTypeAll = async () => {
	let { code, data } = await getDictDocApi({ Flag: DictFlagEnum.CarRepairType });
	if (code == 100) {
		db_RepairTypeAll.value = data;
	}
}

export const db_RepairType = ref([]);
// 通过字典接口获取保养类型
export const getDocRepaireType = async () => {
	let { code, data } = await getDictDocApi({ Flag: DictFlagEnum.CarRepairType });
	if (code == 100) {
		data = data.filter(d => d.Class == '2');
		db_RepairType.value = data;
	}
}

export const db_RepairTypeFix = ref([]);
// 通过字典接口获取维修类型
export const getDocRepaireTypeFix = async () => {
	let { code, data } = await getDictDocApi({ Flag: DictFlagEnum.CarRepairType });
	if (code == 100) {
		data = data.filter(d => d.Class == '1');
		db_RepairTypeFix.value = data;
	}
}


// 维保项目类型和维保备件 {ProjectType: 1维修 2保养 DataType: 1备件 2项目 }
// 获取保养项目
export const db_RepairProject = ref([]);
export const GetDictRepairProject = async () => {
	let { code, data } = await getDictRepairProjectApi({ ProjectType: '2', DataType: '2' });
	if (code === 100) {
		db_RepairProject.value = data;
	}
}

//获取维修项目
export const db_RepairProjectFix = ref([]);
export const GetDictRepairProjectFix = async () => {
	let { code, data } = await getDictRepairProjectApi({ ProjectType: '1', DataType: '2' });
	if (code === 100) {
		db_RepairProjectFix.value = data;
	}
}
