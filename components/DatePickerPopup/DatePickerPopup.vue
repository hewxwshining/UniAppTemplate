<template>
	<uni-popup ref="popupRef" type="bottom" :mask-click="true" @change="onPopupChange">
		<view class="popup-content">
			<view class="pop-header">
				<view class="cancel" @click="handleCancel">取消</view>
				<view class="picker-inner">
					<text>{{ displayText }}</text>
				</view>
				<view class="confirm" @click="handleConfirm">确认</view>
			</view>
			<picker-view :indicator-style="indicatorStyle" :mask-style="maskStyle" :value="pickerValue"
				@change="onPickerChange" class="picker-view-main">
				<picker-view-column>
					<view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
				</picker-view-column>
				<template v-if="showtime">
					<picker-view-column>
						<view class="item" v-for="(item, index) in hours" :key="index">{{ item }}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in mins" :key="index">{{ item }}分</view>
					</picker-view-column>
				</template>
			</picker-view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name: 'DatePickerPopup',
		props: {
			modelValue: String,
			title: {
				type: String,
				default: '选择日期'
			},
			startYear: {
				type: Number,
				default: 1990
			},
			endYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			mode: {
				type: String,
				default: 'YYYY-MM-DD',
				validator(value) {
					const arr = ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm'];
					return arr.includes(value)
				}
			}
		},
		data() {
			const now = new Date();
			const years = [];
			for (let i = this.startYear; i <= this.endYear; i++) years.push(i);
			const months = Array.from({
				length: 12
			}, (_, i) => i + 1);
			const hours = Array.from({
				length: 24
			}, (_, i) => i);
			const mins = Array.from({
				length: 60
			}, (_, i) => i);

			let [initYear, initMonth, initDay] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
			let [initHour, initMin] = [0, 0];
			let showtime = false;
			if (this.mode == 'YYYY-MM-DD') {
				if (this.modelValue)
					[initYear, initMonth, initDay] = this.modelValue.split('-').map(Number);
			}
			if (this.mode == 'YYYY-MM-DD HH:mm') {
				showtime = true;
				if (this.modelValue && this.modelValue.length == 16) {
					let dateStr = this.modelValue.substring(0, 10);
					let timeStr = this.modelValue.substring(11, 16);
					[initYear, initMonth, initDay] = dateStr.split('-').map(Number);
					[initHour, initMin] = timeStr.split(':').map(Number);
				}
			}
			if (!years.includes(initYear)) initYear = years[years.length - 1];
			if (initMonth < 1 || initMonth > 12) initMonth = 1;
			const days = this.getDays(initYear, initMonth);
			if (initDay < 1 || initDay > days.length) initDay = 1;

			const pickerValue = [
				years.indexOf(initYear),
				initMonth - 1,
				initDay - 1
			];
			if (showtime) {
				pickerValue.push(hours.indexOf(initHour), mins.indexOf(initMin));
			}
			return {
				years,
				months,
				days,
				hours,
				mins,
				showtime,
				selectedYear: initYear,
				selectedMonth: initMonth,
				selectedDay: initDay,
				selectedHour: initHour,
				selectedMin: initMin,
				pickerValue,
				indicatorStyle: 'height: 50rpx;',
				maskStyle: '',
				visible: false
			};
		},
		computed: {
			displayText() {
				if (this.mode == 'YYYY-MM-DD HH:mm') {
					return `${this.selectedYear}年${this.selectedMonth}月${this.selectedDay}日${this.selectedHour}时${this.selectedMin}分`;
				}
				return `${this.selectedYear}年${this.selectedMonth}月${this.selectedDay}日`;
			}
		},
		watch: {
			pickerValue(val) {
				const year = this.years[val[0]];
				const month = this.months[val[1]];
				this.days = this.getDays(year, month);
				if (val[2] > this.days.length - 1) {
					this.pickerValue[2] = this.days.length - 1;
				}
			}
		},
		methods: {
			open() {
				this.$refs.popupRef.open('bottom');
			},
			close() {
				this.$refs.popupRef.close();
			},
			getDays(year, month) {
				const days = [];
				const dayCount = new Date(year, month, 0).getDate();
				for (let i = 1; i <= dayCount; i++) days.push(i);
				return days;
			},
			onPickerChange(e) {
				const val = e.detail.value;
				this.selectedYear = this.years[val[0]];
				this.selectedMonth = this.months[val[1]];
				this.days = this.getDays(this.selectedYear, this.selectedMonth);
				if (val[2] > this.days.length - 1) val[2] = this.days.length - 1;
				this.selectedDay = this.days[val[2]];
				if (this.showtime) {
					this.selectedHour = this.hours[val[3]];
					this.selectedMin = this.mins[val[4]];
				}
				this.pickerValue = [...val];
			},
			handleCancel() {
				this.close();
				this.$emit('cancel');
			},
			handleConfirm() {
				let dateStr =
					`${this.selectedYear}-${String(this.selectedMonth).padStart(2, '0')}-${String(this.selectedDay).padStart(2, '0')}`;
				if (this.showtime) {
					dateStr += ` ${String(this.selectedHour).padStart(2, '0')}:${String(this.selectedMin).padStart(2, '0')}`;
				}
				this.$emit('update:modelValue', dateStr);
				this.$emit('confirm', dateStr);
				this.close();
			},
			onPopupChange(e) {
				if (!e.show) this.visible = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.popup-content {
		background: #fff;
		border-radius: 16px 16px 0 0;
		// padding-bottom: 20rpx;
	}

	.pop-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 24rpx 0 24rpx;
	}

	.picker-inner {
		flex: 1;
		text-align: center;
		font-size: 22rpx;
		font-weight: 500;
	}

	.cancel {
		color: #666;
		font-size: 30rpx;
		padding: 0 16rpx;
	}

	.confirm {
		color: #428ac6;
		font-size: 30rpx;
		padding: 0 16rpx;
	}

	.picker-view-main {
		width: 100%;
		height: 500rpx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 50rpx;
		text-align: center;
	}
</style>