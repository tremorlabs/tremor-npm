import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import tremorTheme from './tremorTheme';

addons.setConfig({
    theme: tremorTheme,
});