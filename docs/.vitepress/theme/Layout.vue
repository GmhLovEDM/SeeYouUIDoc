<template>
  <Layout>
    <template #doc-footer-before>
      <div v-if="showPhone" class="mobile-preview-wrapper">
        <div class="mobile-mockup">
          <iframe :src="iframeUrl" frameborder="0"></iframe>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import { computed } from "vue";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
const route = useRoute();

// 演示站点的基准 URL (你需要替换成你自己的 H5 项目地址)
const BASE_URL = "https://www.baidu.com";

// 根据当前文档路径，计算 iframe 应该显示的 URL
// 假设文档路径是 /components/button，演示路径对应 /pages/components/button
const iframeUrl = computed(() => {
  // 1. 优先使用 markdown 文件头部的 frontmatter 配置 (如果有)
  if (frontmatter.value.iframeSrc) {
    return frontmatter.value.iframeSrc;
  }

  // 2. 否则根据路由自动推导
  // 比如去掉 .html 后缀，拼接基准路径
  const path = route.path.replace(".html", "");
  return `${BASE_URL}${path}`;
});

// 只有在 frontmatter 中标记了 layout: doc 的页面或者是组件页才显示手机
const showPhone = computed(() => {
  // 这里可以根据你的需求定制规则，例如只在 /components/ 目录下显示
  return route.path.includes("/components/");
});
</script>

<style scoped>
/* 这里是关键样式，让它悬浮在右侧 */
.mobile-preview-wrapper {
  position: fixed; /* ← 这里是关键 */
  right: 250px; /* 相对窗口，不是 Layout */
  top: 90px; /* 避开顶部导航（可以自己调） */
  z-index: 10;
  width: 310px;
  display: none;
}

@media (min-width: 1400px) {
  .mobile-preview-wrapper {
    display: block;
  }
}

.mobile-mockup {
  width: 310px; /* iframe 实际宽度 */
  height: 630px; /* iframe 实际高度 */
  border-radius: 30px;
  overflow: hidden;
  background: url("./static/iPhone13.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 48px 13px 25px;
}

.mobile-mockup iframe {
  width: 100%;
  height: 100%;
  /* background-color: #f7f8fa; */
}
</style>
