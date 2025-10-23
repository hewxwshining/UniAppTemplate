# CarAssist 项目开发指导说明

## 📋 项目概述

CarAssist 是一个基于 UniApp 框架开发的车联网应用，支持多端运行（H5、小程序、App）。

## 🏗️ 项目结构

```
CarAssist/
├── api/                    # API 接口
│   └── auth.ts
├── components/             # 公共组件
│   ├── CustomNavbar/      # 自定义导航栏
│   ├── CustomTabBar/      # 自定义标签栏
│   └── Layout/            # 布局组件
├── pages/                 # 页面
│   ├── login/             # 登录页面
│   ├── driverSide/        # 司机端
│   ├── vendorSide/        # 供应商端
│   └── my/                # 个人中心
├── static/                # 静态资源
│   ├── images/            # 图片资源
│   └── styles/            # 样式文件
├── store/                 # 状态管理
├── utils/                 # 工具函数
├── types/                 # 类型定义
└── uni_modules/           # uni-app 插件
```

## 🛠️ 技术栈

- **框架**: UniApp (Vue 3 + TypeScript)
- **状态管理**: Pinia
- **样式**: SCSS
- **UI组件**: uni-ui
- **开发工具**: HBuilderX / VS Code

## 📝 开发规范

### 1. 文件命名规范

- **组件文件**: 使用 PascalCase，如 `CustomNavbar.vue`
- **页面文件**: 使用 kebab-case，如 `login.vue`
- **工具文件**: 使用 camelCase，如 `authGuard.ts`

### 2. 组件开发规范

#### 自定义组件结构
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入依赖
import { ref, computed, onMounted } from 'vue'

// 定义 props
const props = withDefaults(defineProps<{
  // props 定义
}>(), {
  // 默认值
})

// 定义 emits
const emit = defineEmits(['eventName'])

// 响应式数据
const data = ref('')

// 计算属性
const computedValue = computed(() => {
  // 计算逻辑
})

// 生命周期
onMounted(() => {
  // 初始化逻辑
})

// 方法
const handleClick = () => {
  // 处理逻辑
}
</script>

<style lang="scss" scoped>
/* 样式定义 */
</style>
```

### 3. 样式规范

#### 使用 SCSS
- 使用嵌套语法
- 使用变量定义颜色、尺寸
- 使用 mixin 复用样式

#### 响应式单位
- 使用 `rpx` 作为主要单位
- 字体大小使用 `rpx`
- 边框、阴影等使用 `px`
- 设计稿以宽度为`750rpx`为开发基础 

#### 样式组织
```scss
.component-name {
  // 基础样式
  
  .sub-element {
    // 子元素样式
    
    &:hover {
      // 伪类样式
    }
  }
}
```

## 🔧 核心组件说明

### 1. CustomNavbar 自定义导航栏

#### 功能特性
- 自动适配状态栏高度
- 支持自定义标题和样式
- 可配置返回按钮
- 支持插槽自定义内容
- 深色主题适配

#### 使用方法
```vue
<CustomNavbar 
  title="页面标题" 
  :show-back="true"
  background-color="#007AFF"
  title-color="#ffffff"
  @back="handleBack"
>
  <template #right>
    <view @click="handleMore">更多</view>
  </template>
</CustomNavbar>
```

#### Props 属性
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | String | '' | 导航栏标题 |
| showBack | Boolean | true | 是否显示返回按钮 |
| backgroundColor | String | '#ffffff' | 背景色 |
| titleColor | String | '#333333' | 标题颜色 |
| fixed | Boolean | true | 是否固定定位 |

### 2. Layout 布局组件

#### 功能特性
- 统一的页面布局
- 自动处理导航栏高度
- 支持自定义标题
- 可控制标签栏显示

#### 使用方法
```vue
<Layout title="页面标题" :show-tab-bar="false">
  <!-- 页面内容 -->
</Layout>
```


## 🚀 开发流程

### 1. 环境准备
- 安装 HBuilderX 或配置 VS Code
- 安装 UniApp 插件
- 配置 TypeScript 支持
- npm install 下载其他插件

### 2. 页面开发
1. 在 `pages` 目录下创建页面文件
2. 在 `pages.json` 中配置页面路由
3. 使用 Layout 组件包装页面内容
4. 添加页面样式和交互逻辑

### 3. 组件开发
1. 在 `components` 目录下创建组件
2. 定义组件的 props 和 emits
3. 实现组件功能
4. 编写组件文档

### 4. 样式开发
1. 使用 SCSS 编写样式
2. 遵循响应式设计原则

## 🐛 常见问题解决

### 1. 文件覆盖错误
**问题**: `The emitted file "components/Layout/Layout.wxss" overwrites a previously emitted file of the same name.`

**解决方案**: 确保所有文件引用使用统一的大小写
```javascript
// 正确
import Layout from '@/components/Layout/Layout.vue';

// 错误
import layout from '@/components/Layout/layout.vue';
```

### 2. 样式不生效
**问题**: 自定义样式被覆盖

**解决方案**:
- 检查样式优先级
- 使用 `!important`
- 检查样式作用域

## 📱 多端适配

### 1. 条件编译
```javascript
// #ifdef H5
// H5 端特有代码
// #endif

// #ifdef MP-WEIXIN
// 微信小程序特有代码
// #endif

// #ifdef APP-PLUS
// App 端特有代码
// #endif
```

### 2. 样式适配
```scss
/* #ifdef H5 */
.h5-specific-style {
  // H5 端样式
}
/* #endif */

/* #ifdef MP-WEIXIN */
.mp-specific-style {
  // 小程序端样式
}
/* #endif */
```

## 🔍 调试技巧

### 1. 控制台调试
```javascript
console.log('调试信息', data);
console.warn('警告信息');
console.error('错误信息');
```

### 2. 网络请求调试
```javascript
// 在 utils/request.ts 中添加请求拦截器
uni.request({
  url: 'https://api.example.com',
  success: (res) => {
    console.log('请求成功', res);
  },
  fail: (err) => {
    console.error('请求失败', err);
  }
});
```

### 3. 页面调试
- 使用 HBuilderX 的真机调试
- 使用微信开发者工具调试小程序
- 使用浏览器开发者工具调试 H5

## 📚 最佳实践

### 1. 代码组织
- 按功能模块组织代码
- 保持组件的单一职责
- 使用 TypeScript 提供类型安全

### 2. 性能优化
- 使用 `v-if` 和 `v-show` 合理控制渲染
- 避免在模板中使用复杂计算
- 合理使用缓存

### 3. 用户体验
- 提供加载状态反馈
- 处理网络错误情况
- 适配不同屏幕尺寸

### 4. 安全性
- 验证用户输入
- 使用 HTTPS 请求
- 保护敏感信息

## 🚀 部署发布

### 1. H5 部署
- 构建生产版本
- 上传到服务器
- 配置域名和 HTTPS

### 2. 小程序发布
- 在微信公众平台配置
- 上传代码包
- 提交审核

### 3. App 发布
- 配置应用信息
- 生成安装包
- 上传到应用商店

## 📖 学习资源

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [SCSS 官方文档](https://sass-lang.com/)

## 🤝 团队协作

### 1. 代码规范
- 使用 ESLint 检查代码质量
- 使用 Prettier 格式化代码
- 遵循 Git 提交规范

### 2. 版本控制
- 使用 Git 管理代码版本
- 创建功能分支开发
- 使用 Pull Request 代码审查

### 3. 文档维护
- 及时更新开发文档
- 记录重要决策和变更
- 维护组件使用说明

---

**注意**: 本文档会随着项目发展持续更新，请保持关注最新版本。
