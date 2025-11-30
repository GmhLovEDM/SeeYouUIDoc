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

// 演示站点的基准 URL
const BASE_URL = "http://113.44.242.235:9001/#";

// 根据当前文档路径，计算 iframe 应该显示的 URL
const iframeUrl = computed(() => {
  // 1. 优先使用 markdown 文件头部的 frontmatter 配置 (如果有)
  if (frontmatter.value.iframeSrc) {
    return BASE_URL + frontmatter.value.iframeSrc;
  }

  // 2. 否则根据路由自动推导
  const path = route.path.replace(".html", "");
  return `${BASE_URL}${path}`;
});

// 只有在 frontmatter 中标记了 layout: doc 的页面或者是组件页才显示手机
const showPhone = computed(() => {
  return frontmatter.value.layout === "doc";
  // 这里可以根据你的需求定制规则，例如只在 /components/ 目录下显示
  return route.path.includes("/components/");
});
</script>

<style scoped>
.mobile-preview-wrapper {
  position: fixed;
  right: max(24px, calc((100vw - var(--vp-layout-max-width, 1920px)) / 2 + 24px));
  top: 90px;
  z-index: 10;
  display: none;
}

@media (min-width: 1400px) {
  .mobile-preview-wrapper {
    display: block;
  }
}

.mobile-mockup {
  width: 400px;
  height: 790px;
  border-radius: 30px;
  overflow: hidden;
  background: url("./static/iPhone13.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 48px 13px 25px;
}

.mobile-mockup iframe {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  /* background-color: #f7f8fa; */
}
</style>
