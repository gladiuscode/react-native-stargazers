import React from 'react';
import RepositoriesContainer from './presentation/providers/repositories/repositories.container';
import ThemeContainer from './presentation/providers/theme/theme.container';
import HomepageScreen from './presentation/features/homepage/homepage.screen';
import BannerProvider from './presentation/providers/banner/banner.provider';

function App(): JSX.Element {
  return (
    <RepositoriesContainer>
      <ThemeContainer>
        <BannerProvider>
          <HomepageScreen />
        </BannerProvider>
      </ThemeContainer>
    </RepositoriesContainer>
  );
}

export default App;
