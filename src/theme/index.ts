import {
  createTheme,
  MantineThemeOverride,
  mergeMantineTheme
} from '@inexture/core';
import { themeColors } from '@/theme/colors.ts';
import { theme as coreTheme } from '@inexture/core/theme';

export const themeOverride: MantineThemeOverride = createTheme({
  colors: themeColors,
  primaryColor: 'primary'
});

export const theme = mergeMantineTheme(coreTheme, themeOverride);
