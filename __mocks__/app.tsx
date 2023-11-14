import {
  ThemeContext,
  ThemeProvider,
} from '../src/presentation/providers/theme/theme.container';
import BannerProvider from '../src/presentation/providers/banner/banner.container';
import {
  RepositoriesContext,
  RepositoriesProvider,
} from '../src/presentation/providers/repositories/repositories.container';
import React, {PropsWithChildren} from 'react';
import RepositoryRepositoryMock from './repository.repository';
import palette from '../src/presentation/providers/theme/palette.theme';
import getTypographyBy from '../src/presentation/providers/theme/typography.theme';
import borderRadius from '../src/presentation/providers/theme/borderRadius.theme';
import {spacing} from '../src/presentation/providers/theme/spacing.theme';

class AppMock {
  private _repositoriesValue: RepositoriesContext;
  private _themeValue: ThemeContext;

  constructor() {
    this._repositoriesValue = {
      repository: new RepositoryRepositoryMock(),
    };
    this._themeValue = {
      variant: 'light',
      palette: palette.light,
      typography: getTypographyBy(palette.light),
      borderRadius,
      spacing,
      onVariantChange: () => {},
    };
  }

  get repositoriesValue(): RepositoriesContext {
    return this._repositoriesValue;
  }

  get themeValue(): ThemeContext {
    return this._themeValue;
  }

  set repositoriesValue(value: RepositoriesContext) {
    this._repositoriesValue = value;
  }

  set themeValue(value: ThemeContext) {
    this._themeValue = value;
  }

  render({children}: PropsWithChildren) {
    return (
      <RepositoriesProvider value={this._repositoriesValue}>
        <ThemeProvider value={this._themeValue}>
          <BannerProvider>{children}</BannerProvider>
        </ThemeProvider>
      </RepositoriesProvider>
    );
  }
}

export default AppMock;
