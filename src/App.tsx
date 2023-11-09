import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import ThemeProvider from './providers/theme/theme.provider';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ThemeProvider>
        <Text>StarGazers</Text>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
