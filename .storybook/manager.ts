import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
// import logoImg from './assets/fav_icon.png'

const theme = create({
    base: 'light',

    // Brand assets
    brandTitle: 'Arbin UI',
    brandImage: 'fav_icon.png',
    brandUrl: 'https://arbin.com/',

    // UI
    colorPrimary: '#FF4785',
    colorSecondary: '#1EA7FD',


});
export default theme;

addons.setConfig({
    theme,
});
