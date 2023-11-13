import {useMemo} from 'react';
import {ThemeContext, useAppTheme} from './theme.container';

export type StylesDefaults = Omit<ThemeContext, 'onVariantChange' | 'variant'>;

const useStyles = <T>(getStyles: (defaults: StylesDefaults) => T) => {
  const theme = useAppTheme();

  return useMemo(
    () =>
      getStyles({
        palette: theme.palette,
        spacing: theme.spacing,
        borderRadius: theme.borderRadius,
        typography: theme.typography,
      }),
    [
      getStyles,
      theme.borderRadius,
      theme.palette,
      theme.spacing,
      theme.typography,
    ],
  );
};

export default useStyles;
