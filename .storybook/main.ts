import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: [
    { from: './assets', to: '/' },
    { from: './public', to: '/' }

  ],
  docs: {
    autodocs: "tag",
  },
  managerHead: (head: any) => `
  ${head}
    <link rel="icon" type="image/svg+xml" href="fav_icon.png" />
    <link rel="alternate icon" type="image/png" href="fav_icon.png" />
`,
};

export default config;