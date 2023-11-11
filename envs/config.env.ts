import Config from 'react-native-config';

/**
 * This object is frozen and holds all ENVS available
 * at runtime, if provided through .env file
 */
const CONFIG_ENV = {
  API_BASE_URL: Config.API_BASE_URL,
  log() {
    console.group('[CONFIG_ENV]');
    console.log(JSON.stringify(this));
    console.groupEnd();
  },
};

Object.freeze(CONFIG_ENV);

export default CONFIG_ENV;
