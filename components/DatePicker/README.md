# DatePicker 日期选择组件

一个基于 DatePickerPopup 的日期选择组件，提供简洁的 API 和良好的用户体验。

## 功能特性

- ✅ **简洁 API**：基于 DatePickerPopup 封装，使用更简单
- ✅ **多种格式**：支持多种日期显示格式
- ✅ **年份范围**：可自定义年份选择范围
- ✅ **禁用状态**：支持禁用状态
- ✅ **事件回调**：提供完整的事件回调
- ✅ **响应式**：支持 v-model 双向绑定
- ✅ **自定义样式**：支持样式定制

## 基本用法

```vue
<template>
  <view class="form-item">
    <view class="label">出生日期</view>
    <DatePicker
      v-model="birthDate"
      placeholder="请选择出生日期"
      title="选择出生日期"
      format="YYYY年MM月DD日"
      @change="handleDateChange"
    />
  </view>
</template>

<script setup>
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { ref } from 'vue'

const birthDate = ref('')

const handleDateChange = (date) => {
  console.log('选择的日期:', date)
}
</script>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `modelValue` | `String` | `''` | ❌ | 选中的日期值，支持 v-model |
| `placeholder` | `String` | `'请选择日期'` | ❌ | 占位符文本 |
| `title` | `String` | `'选择日期'` | ❌ | 弹窗标题 |
| `startYear` | `Number` | `1990` | ❌ | 开始年份 |
| `endYear` | `Number` | `当前年份` | ❌ | 结束年份 |
| `format` | `'YYYY-MM-DD' \| 'YYYY/MM/DD' \| 'YYYY年MM月DD日'` | `'YYYY-MM-DD'` | ❌ | 日期显示格式 |
| `disabled` | `Boolean` | `false` | ❌ | 是否禁用 |

## Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `(value: String)` | 日期值变化时触发 |
| `change` | `(value: String)` | 日期选择变化时触发 |
| `confirm` | `(value: String)` | 确认选择时触发 |
| `cancel` | `()` | 取消选择时触发 |

## 日期格式

组件支持三种日期显示格式：

```javascript
// YYYY-MM-DD (默认)
'2024-01-15'

// YYYY/MM/DD
'2024/01/15'

// YYYY年MM月DD日
'2024年01月15日'
```

## 使用示例

### 1. 基本日期选择

```vue
<template>
  <view class="form-item">
    <view class="label">选择日期</view>
    <DatePicker
      v-model="selectedDate"
      placeholder="请选择日期"
      @change="handleDateChange"
    />
  </view>
</template>

<script setup>
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { ref } from 'vue'

const selectedDate = ref('')

const handleDateChange = (date) => {
  console.log('选择的日期:', date)
}
</script>
```

### 2. 自定义年份范围

```vue
<template>
  <view class="form-item">
    <view class="label">出生日期</view>
    <DatePicker
      v-model="birthDate"
      placeholder="请选择出生日期"
      title="选择出生日期"
      :start-year="1950"
      :end-year="2010"
      format="YYYY年MM月DD日"
    />
  </view>
</template>

<script setup>
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { ref } from 'vue'

const birthDate = ref('')
</script>
```

### 3. 禁用状态

```vue
<template>
  <view class="form-item">
    <view class="label">创建日期</view>
    <DatePicker
      v-model="createDate"
      placeholder="创建日期"
      :disabled="true"
    />
  </view>
</template>

<script setup>
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { ref } from 'vue'

const createDate = ref('2024-01-15')
</script>
```

### 4. 完整事件处理

```vue
<template>
  <view class="form-item">
    <view class="label">项目截止日期</view>
    <DatePicker
      v-model="deadline"
      placeholder="请选择截止日期"
      title="选择截止日期"
      :start-year="new Date().getFullYear()"
      :end-year="new Date().getFullYear() + 5"
      format="YYYY/MM/DD"
      @change="handleDateChange"
      @confirm="handleDateConfirm"
      @cancel="handleDateCancel"
    />
  </view>
</template>

<script setup>
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { ref } from 'vue'

const deadline = ref('')

const handleDateChange = (date) => {
  console.log('日期变化:', date)
}

const handleDateConfirm = (date) => {
  console.log('确认选择:', date)
  // 可以在这里进行额外的验证或处理
}

const handleDateCancel = () => {
  console.log('取消选择')
}
</script>
```

### 5. 在表单中使用

```vue
<template>
  <uni-forms ref="form" :model="formData" :rules="rules">
    <uni-forms-item label="入职日期" name="hireDate" required>
      <DatePicker
        v-model="formData.hireDate"
        placeholder="请选择入职日期"
        title="选择入职日期"
        format="YYYY年MM月DD日"
      />
    </uni-forms-item>

    <uni-forms-item label="合同到期" name="contractEnd" required>
      <DatePicker
        v-model="formData.contractEnd"
        placeholder="请选择合同到期日期"
        title="选择合同到期日期"
        :start-year="new Date().getFullYear()"
        :end-year="new Date().getFullYear() + 10"
      />
    </uni-forms-item>
  </uni-forms>
</template>

<script setup>
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { ref, reactive } from 'vue'

const formData = reactive({
  hireDate: '',
  contractEnd: ''
})

const rules = {
  hireDate: {
    rules: [{
      required: true,
      errorMessage: '请选择入职日期'
    }]
  },
  contractEnd: {
    rules: [{
      required: true,
      errorMessage: '请选择合同到期日期'
    }]
  }
}
</script>
```

## 样式定制

组件使用 scoped 样式，如需自定义样式，可以通过深度选择器：

```scss
<style lang="scss" scoped>
// 自定义选择框样式
:deep(.date-picker) {
  .select-box {
    border: 1px solid #409eff;
    border-radius: 8px;
    background-color: #f0f9ff;

    &:hover {
      border-color: #66b1ff;
      background-color: #ecf5ff;
    }

    .date-value {
      color: #409eff;
      font-weight: 500;
    }
  }

  // 自定义禁用状态
  .select-box.disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
  }
}
</style>
```

## 注意事项

1. **日期格式**：组件内部使用 `YYYY-MM-DD` 格式存储，显示格式通过 `format` 属性控制
2. **年份范围**：确保 `startYear` 小于 `endYear`
3. **依赖组件**：组件依赖 `DatePickerPopup` 和 `uni-popup`，请确保项目中已安装
4. **兼容性**：组件基于 uni-app 开发，支持多端运行
5. **日期验证**：组件会自动验证日期有效性，无效日期不会显示

## 更新日志

### v1.0.0
- 初始版本发布
- 基于 DatePickerPopup 封装
- 支持多种日期格式
- 支持自定义年份范围
- 支持禁用状态
- 提供完整的事件回调

## 问题反馈

如果在使用过程中遇到问题，请检查：

1. **依赖检查**：是否引入了 `DatePickerPopup` 和 `uni-popup` 组件
2. **日期格式**：确认传入的日期格式是否正确
3. **年份范围**：确认 `startYear` 和 `endYear` 设置是否合理
4. **控制台错误**：查看是否有其他相关错误信息

## 相关链接

- [uni-app 官方文档](https://uniapp.dcloud.io/)
- [uni-popup 组件文档](https://ext.dcloud.net.cn/plugin?id=329)
- [DatePickerPopup 组件](../DatePickerPopup/README.md)
