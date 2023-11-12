import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import contextFactory from '../../../utils/contextFactory/contextFactory.util';
import palette, {Palette, PaletteVariant} from './palette.theme';
import getTypographyBy, {Typography} from './typography.theme';
import {spacing, Spacing} from './spacing.theme';
import borderRadius, {BorderRadius} from './borderRadius.theme';

export interface ThemeContext {
  readonly variant: PaletteVariant;
  readonly palette: Palette;
  readonly typography: Typography;
  readonly spacing: Spacing;
  readonly borderRadius: BorderRadius;
  readonly onVariantChange: (variant: PaletteVariant) => void;
}

const [useAppTheme, Provider] = contextFactory<ThemeContext>('ThemeContext');
export {useAppTheme};

const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const updateStatusBar = useCallback((variant: PaletteVariant) => {
    StatusBar.setBarStyle(
      variant === 'dark' ? 'light-content' : 'dark-content',
    );
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(palette[variant].background);
    }
  }, []);

  const [variant, setVariant] = useState<ThemeContext['variant']>(() => {
    const initialVariant = isDarkMode ? 'light' : 'dark';
    updateStatusBar(initialVariant);
    return initialVariant;
  });

  const onVariantChange = useCallback<ThemeContext['onVariantChange']>(
    newVariant => {
      setVariant(newVariant);
      updateStatusBar(newVariant);
    },
    [updateStatusBar],
  );

  const value = useMemo<ThemeContext>(
    () => ({
      variant,
      palette: palette[variant],
      spacing: spacing,
      borderRadius: borderRadius,
      typography: getTypographyBy(palette[variant]),
      onVariantChange,
    }),
    [onVariantChange, variant],
  );

  return <Provider value={value}>{children}</Provider>;
};

export default ThemeProvider;
