<template>
	<view class="date-picker">
		<!-- 选择框 -->
		<view class="select-box" @click="openDatePicker">
			<view class="selected-value">
				<view v-if="!displayValue" class="placeholder">
					{{ placeholder }}
				</view>
				<view v-else class="date-value">
					{{ displayValue }}
				</view>
			</view>
			<text class="arrow">▼</text>
		</view>

		<!-- 日期选择弹窗 -->
		<DatePickerPopup ref="datePickerRef" v-model="selectedDate" :title="title" :start-year="startYear"
			:end-year="endYear" @confirm="handleDateConfirm" @cancel="handleDateCancel" />
	</view>
</template>

<script setup lang="ts">
	import { ref, computed, watch } from 'vue'
	import DatePickerPopup from '../DatePickerPopup/DatePickerPopup.vue'

	interface Props {
		modelValue ?: string // 选中的日期值
		placeholder ?: string // 占位符
		title ?: string // 弹窗标题
		startYear ?: number // 开始年份
		endYear ?: number // 结束年份
		format ?: 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'YYYY年MM月DD日' // 日期格式
		disabled ?: boolean // 是否禁用
	}

	const props = withDefaults(defineProps<Props>(), {
		modelValue: '',
		placeholder: '请选择日期',
		title: '选择日期',
		startYear: 2000,
		endYear: 2030,
		format: 'YYYY-MM-DD',
		disabled: false
	})

	const emit = defineEmits(['update:modelValue', 'change', 'confirm', 'cancel'])

	// 状态
	const datePickerRef = ref()
	const selectedDate = ref(props.modelValue)

	// 监听 modelValue 变化
	watch(() => props.modelValue, (newVal) => {
		selectedDate.value = newVal
	}, { immediate: true })

	// 计算显示值
	const displayValue = computed(() => {
		if (!selectedDate.value) return ''

		const date = new Date(selectedDate.value)
		if (isNaN(date.getTime())) return ''

		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')

		switch (props.format) {
			case 'YYYY/MM/DD':
				return `${year}/${month}/${day}`
			case 'YYYY年MM月DD日':
				return `${year}年${month}月${day}日`
			case 'YYYY-MM-DD':
			default:
				return `${year}-${month}-${day}`
		}
	})

	// 方法
	const openDatePicker = () => {
		if (props.disabled) return
		datePickerRef.value?.open()
	}

	const handleDateConfirm = (dateStr : string) => {
		selectedDate.value = dateStr
		emit('update:modelValue', dateStr)
		emit('change', dateStr)
		emit('confirm', dateStr)
	}

	const handleDateCancel = () => {
		emit('cancel')
	}

	// 暴露方法
	defineExpose({
		open: openDatePicker,
		close: () => datePickerRef.value?.close()
	})
</script>

<style lang="scss" scoped>
	.date-picker {
		width: 100%;

		.select-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 15rpx;
			background-color: #fff;
			cursor: pointer;
			transition: all 0.3s ease;

			&:hover {
				border-color: #409eff;
			}

			&:active {
				transform: scale(0.98);
			}

			.selected-value {
				flex: 1;
				min-height: 20px;
				display: flex;
				align-items: center;

				.placeholder {
					color: #999;
					font-size: 14px;
				}

				.date-value {
					color: #333;
					font-size: 14px;
				}
			}

			.arrow {
				font-size: 12px;
				color: #999;
				margin-left: 8px;
			}
		}

		// 禁用状态
		.select-box.disabled {
			background-color: #f5f7fa;
			border-color: #e4e7ed;
			cursor: not-allowed;
			color: #c0c4cc;

			&:hover {
				border-color: #e4e7ed;
			}

			&:active {
				transform: none;
			}

			.placeholder,
			.date-value {
				color: #c0c4cc;
			}

			.arrow {
				color: #c0c4cc;
			}
		}
	}
</style>