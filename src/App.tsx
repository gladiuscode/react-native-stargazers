import React from 'react';
import RepositoriesProvider from './presentation/providers/repositories/repositories.provider';
import ThemeContainer from './presentation/providers/theme/theme.container';
import HomepageScreen from './presentation/features/homepage/homepage.screen';
import BannerProvider from './presentation/providers/banner/banner.provider';

function App(): JSX.Element {
  return (
    <RepositoriesProvider>
      <ThemeContainer>
        <BannerProvider>
          <HomepageScreen />
        </BannerProvider>
      </ThemeContainer>
    </RepositoriesProvider>
  );
}

export default App;
