import React from 'react';
import {SafeAreaView} from 'react-native';
import ThemeProvider from './providers/theme/theme.provider';
import HomepageScreen from './features/homepage/homepage.screen';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider>
        <HomepageScreen />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
