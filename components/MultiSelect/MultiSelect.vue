<template>
	<view class="multi-select">

		<!-- 选择框 -->
		<view class="select-item dpflex-end" @click="openPopup">
			<view class="select-txt">
				<view v-if="selectedItems.length === 0">{{ placeholder }}</view>
				<view v-else class="selected-tags">
					<!-- 单选模式显示单个值 -->
					<view v-if="mode === 'single'" class="single-value">
						{{ selectedItems[0][textKey] }}
					</view>
					<!-- 多选模式显示标签 -->
					<template v-else>
						<view v-for="(item, index) in selectedItems" :key="index" class="tag">
							{{ item[textKey] }}
							<text class="close text-lighter" @click.stop="removeItem(item)">×</text>
						</view>
					</template>
				</view>
			</view>
			<view class="select-icon ml-10">
				<uni-icons type='right' size="24rpx"></uni-icons>
			</view>
		</view>

		<!-- 底部弹出层 -->
		<uni-popup ref="popup" type="bottom" :mask-click="true" @change="handlePopupChange">
			<view class="popup-content">
				<view class="popup-header">
					<view class="text-lighter" @click="cancelSelection">取消</view>
					<view class="title fs-32">{{ title }}</view>
					<view class="text-primary" @click="confirmSelection">确认</view>
				</view>
				<!-- 选项列表 -->
				<scroll-view scroll-y class="popup-body">
					<view v-for="(item, index) in options" :key="index" class="option-item" @click="toggleSelect(item)">
						<!-- 单选模式 -->
						<text v-if="mode === 'single'" :class="{ 'option-selected': isSelected(item) }">{{ item[textKey] }}</text>
						<!-- 多选模式 -->
						<text v-else :class="{ 'option-selected': isSelected(item) }">{{ item[textKey] }}</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

	</view>
</template>

<script setup lang="ts">
	import { ref, computed, watch } from 'vue'

	interface Props {
		mode ?: 'single' | 'multiple' // 选择模式：单选或多选
		modelValue : any[] | string // 选中的值，单选模式可以是字符串
		options : any[] // 选项数组
		textKey ?: string // 显示文本的键名
		valueKey ?: string // 值的键名
		placeholder ?: string // 占位符
		title ?: string // 弹出层标题
	}

	const props = withDefaults(defineProps<Props>(), {
		mode: 'single',
		textKey: 'text',
		valueKey: 'value',
		placeholder: '请选择',
		title: '请选择'
	})

	const emit = defineEmits(['update:modelValue', 'change'])

	// 状态
	const popup = ref()
	const selectedItems = ref<any[]>([])
	const tempSelectedItems = ref<any[]>([]) // 临时存储选中的值

	// 将 modelValue 转换为数组格式
	const convertToArray = (value : any[] | string) : any[] => {
		if (props.mode === 'single') {
			if (typeof value === 'string') {
				// 如果是字符串，尝试在选项中查找对应的对象
				const found = props.options.find(item => item[props.valueKey] === value)
				return found ? [found] : []
			} else if (Array.isArray(value)) {
				return value
			}
			return []
		} else {
			// 多选模式始终返回数组
			return Array.isArray(value) ? value : []
		}
	}

	// 将数组转换为输出格式
	const convertToOutput = (value : any[]) : any[] | string => {
		if (props.mode === 'single') {
			// 单选模式返回字符串或数组
			return value.length > 0 ? value[0][props.valueKey] : ''
		} else {
			// 多选模式返回数组
			return value
		}
	}

	// 监听 modelValue 的变化
	watch(() => props.modelValue, (newVal) => {
		selectedItems.value = convertToArray(newVal)
	}, { immediate: true })

	// 方法
	const openPopup = () => {
		tempSelectedItems.value = [...selectedItems.value] // 打开时复制当前值
		popup.value.open()
	}

	const closePopup = () => {
		popup.value.close()
	}

	const handlePopupChange = (e : any) => {
		if (!e.show) {
			tempSelectedItems.value = [...selectedItems.value] // 关闭时恢复原值
		}
	}

	const isSelected = (item : any) => {
		return tempSelectedItems.value.some(selected =>
			selected[props.valueKey] === item[props.valueKey]
		)
	}

	const toggleSelect = (item : any) => {
		if (props.mode === 'single') {
			// 单选模式：直接替换选中项
			tempSelectedItems.value = [item]
		} else {
			// 多选模式：切换选中状态
			const index = tempSelectedItems.value.findIndex(selected =>
				selected[props.valueKey] === item[props.valueKey]
			)

			if (index > -1) {
				tempSelectedItems.value.splice(index, 1)
			} else {
				tempSelectedItems.value.push(item)
			}
		}
	}

	const removeItem = (item : any) => {
		// 只有多选模式才支持移除单个项目
		if (props.mode === 'multiple') {
			const index = selectedItems.value.findIndex(selected =>
				selected[props.valueKey] === item[props.valueKey]
			)
			if (index > -1) {
				selectedItems.value.splice(index, 1)
				const newValue = convertToOutput(selectedItems.value)
				emit('update:modelValue', newValue)
				emit('change', newValue)
			}
		}
	}

	const confirmSelection = () => {
		selectedItems.value = [...tempSelectedItems.value] // 确认时更新选中值
		const newValue = convertToOutput(tempSelectedItems.value)
		emit('update:modelValue', newValue)
		emit('change', newValue)
		closePopup()
	}

	const cancelSelection = () => {
		tempSelectedItems.value = [...selectedItems.value] // 取消时恢复原值
		closePopup()
	}
</script>

<style lang="scss" scoped>
	.multi-select {
		width: 100%;

		.select-item {
			padding: 20rpx;
			cursor: pointer;
			transition: all 0.3s ease;
			
			&:active {
				transform: scale(0.98);
			}

			.selected-tags {
				display: flex;
				flex-wrap: wrap;
				gap: 4px;

				.tag {
					display: flex;
					align-items: center;
					padding: 2px 6px;
					background-color: #f0f2f4;
					border-radius: 4px;
					font-size: 12px;

					.close {
						margin-left: 4px;
						cursor: pointer;
					}
				}
			}
		}
		// 禁用状态
		.select-item.disabled {
			cursor: not-allowed;
			
			&:active {
				transform: none;
			}
		}
	}

	.popup-content {
		background-color: #fff;
		border-radius: 16px 16px 0 0;
		/* padding-bottom: env(safe-area-inset-bottom); */

		.popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
		}

		.popup-body {
			max-height: 31vh;
			padding: 0 30rpx;

			.option-item {
				margin: 15rpx 0;

				text {
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 10rpx;
					padding: 12rpx 0;
					transition: all .15s;
				}

				text.option-selected {
					color: #000;
					font-weight: 600;
					background-color: #F3F3F3;
				}
			}
		}
	}
</style>