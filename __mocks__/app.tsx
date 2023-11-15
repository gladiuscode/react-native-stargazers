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
import {
  LocalizationContext,
  LocalizationProvider,
} from '../src/presentation/providers/localization/localization.container';
import {resources} from '../src/presentation/providers/localization/config.localization';

class AppMock {
  private _localizationValue: LocalizationContext;
  private _repositoriesValue: RepositoriesContext;
  private _themeValue: ThemeContext;

  constructor() {
    this._localizationValue = {
      language: 'en',
      t: key => resources.en[key],
      onLanguageChange: () => {},
    };
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

  get localizationValue(): LocalizationContext {
    return this._localizationValue;
  }

  get repositoriesValue(): RepositoriesContext {
    return this._repositoriesValue;
  }

  get themeValue(): ThemeContext {
    return this._themeValue;
  }

  set localizationValue(value: LocalizationContext) {
    this._localizationValue = value;
  }

  set repositoriesValue(value: RepositoriesContext) {
    this._repositoriesValue = value;
  }

  set themeValue(value: ThemeContext) {
    this._themeValue = value;
  }

  render({children}: PropsWithChildren) {
    return (
      <LocalizationProvider value={this._localizationValue}>
        <RepositoriesProvider value={this._repositoriesValue}>
          <ThemeProvider value={this._themeValue}>
            <BannerProvider>{children}</BannerProvider>
          </ThemeProvider>
        </RepositoriesProvider>
      </LocalizationProvider>
    );
  }
}

export default AppMock;
