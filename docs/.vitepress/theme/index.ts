import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import "./style.css"; // 如果有全局样式

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    // ...
  },
} satisfies Theme;
