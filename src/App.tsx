import React from 'react';
import {SafeAreaView} from 'react-native';
import RepositoriesProvider from './presentation/providers/repositories/repositories.provider';
import ThemeProvider from './presentation/providers/theme/theme.provider';
import HomepageScreen from './presentation/features/homepage/homepage.screen';
import BannerProvider from './presentation/providers/banner/banner.provider';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <RepositoriesProvider>
        <ThemeProvider>
          <BannerProvider>
            <HomepageScreen />
          </BannerProvider>
        </ThemeProvider>
      </RepositoriesProvider>
    </SafeAreaView>
  );
}

export default App;
