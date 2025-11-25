import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SeeYouUI",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/button" },
    ],

    sidebar: [
      {
        text: "组件",
        items: [
          {
            text: "基础组件",
            items: [
              { text: "Button 按钮", link: "/components/button" },
              { text: "Text 文本", link: "/components/text" },
            ],
          },
          {
            text: "表单组件",
            items: [
              { text: "Form 表单", link: "/components/form" },
              { text: "Input 输入框", link: "/components/input" },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
