import React from 'react';
import {SafeAreaView} from 'react-native';
import RepositoriesProvider from './providers/repositories/repositories.provider';
import ThemeProvider from './providers/theme/theme.provider';
import HomepageScreen from './features/homepage/homepage.screen';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <RepositoriesProvider>
        <ThemeProvider>
          <HomepageScreen />
        </ThemeProvider>
      </RepositoriesProvider>
    </SafeAreaView>
  );
}

export default App;
