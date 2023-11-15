import React from 'react';
import RepositoriesContainer from '@presentation/providers/repositories/repositories.container';
import ThemeContainer from '@presentation/providers/theme/theme.container';
import HomepageScreen from '@presentation/features/homepage/homepage.screen';
import BannerProvider from '@presentation/providers/banner/banner.container';
import LocalizationContainer from '@presentation/providers/localization/localization.container';

function App(): JSX.Element {
  return (
    <LocalizationContainer>
      <RepositoriesContainer>
        <ThemeContainer>
          <BannerProvider>
            <HomepageScreen />
          </BannerProvider>
        </ThemeContainer>
      </RepositoriesContainer>
    </LocalizationContainer>
  );
}

export default App;
