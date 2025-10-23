# CustomNavbar 自定义导航组件

一个功能完整的 UniApp 自定义导航栏组件，支持状态栏适配、自定义样式和插槽内容。

## 功能特性

- ✅ 自动适配状态栏高度
- ✅ 支持自定义标题和样式
- ✅ 可配置返回按钮显示/隐藏
- ✅ 支持左侧、中间、右侧插槽自定义
- ✅ 支持固定定位和自定义定位
- ✅ 深色主题自动适配
- ✅ 返回按钮点击事件处理

## 基本用法

```vue
<template>
  <view>
    <!-- 基本用法 -->
    <CustomNavbar title="页面标题" />
    
    <!-- 自定义样式 -->
    <CustomNavbar 
      title="自定义标题"
      :show-back="true"
      background-color="#007aff"
      title-color="#ffffff"
    />
    
    <!-- 使用插槽自定义内容 -->
    <CustomNavbar title="自定义导航">
      <template #left>
        <view class="custom-left">自定义左侧</view>
      </template>
      
      <template #center>
        <view class="custom-center">自定义中间</view>
      </template>
      
      <template #right>
        <view class="custom-right" @click="handleRightClick">
          <uni-icons type="more" size="20"></uni-icons>
        </view>
      </template>
    </CustomNavbar>
  </view>
</template>

<script>
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar.vue'

export default {
  components: {
    CustomNavbar
  },
  methods: {
    handleRightClick() {
      console.log('右侧按钮点击')
    }
  }
}
</script>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | String | '' | 导航栏标题 |
| showBack | Boolean | true | 是否显示返回按钮 |
| backgroundColor | String | '#ffffff' | 导航栏背景色 |
| titleColor | String | '#333333' | 标题文字颜色 |
| showBorder | Boolean | true | 是否显示底部边框 |
| fixed | Boolean | true | 是否固定定位 |
| customStyle | Object | {} | 自定义样式对象 |

## Events 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| back | 返回按钮点击事件 | - |

## Slots 插槽

| 插槽名 | 说明 |
|--------|------|
| left | 左侧区域内容 |
| center | 中间区域内容（会覆盖 title） |
| right | 右侧区域内容 |

## 样式说明

- 导航栏高度：44px + 状态栏高度
- 状态栏高度：自动获取系统状态栏高度
- 支持深色主题自动适配
- 返回按钮有点击反馈效果

## 注意事项

1. 使用固定定位时，页面内容需要添加相应的顶部间距
2. 插槽内容会覆盖对应的默认内容
3. 返回按钮点击会触发 `back` 事件，如果没有监听该事件，会执行默认的返回逻辑
