import type { Preview } from "@storybook/react";
import '../src/index.css';
import { withThemeByClassName } from '@storybook/addon-styling';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [

    (withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }) as any)
  ],
};

export default preview;


export const parameters = {
  brandImage: './assets/logo.png',
};