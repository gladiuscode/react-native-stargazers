import {jest} from '@jest/globals';

jest.mock('react-native-localize', () => {
  return require('react-native-localize/mock');
});
