import contextFactory from '../../../utils/contextFactory/contextFactory.util';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useStyles from '../theme/useStyles.hook';
import getErrorBannerProviderStyles from './banner.styles';

interface BannerContext {
  showBanner(message: string, type?: BannerType): void;
}

const [useBanner, Provider] = contextFactory<BannerContext>('BannerContext');
export {useBanner};

export enum BannerType {
  error = 'error',
  success = 'success',
}

interface Banner {
  message: string;
  type: BannerType;
}

const ErrorBannerProvider: React.FC<PropsWithChildren> = ({children}) => {
  const styles = useStyles(getErrorBannerProviderStyles);

  const [banner, setBanner] = useState<Banner>();

  const showBanner = useCallback<BannerContext['showBanner']>(
    (message: string, type = BannerType.error) => {
      setBanner({
        message,
        type,
      });
    },
    [],
  );

  const onDismissPress = useCallback(() => {
    setBanner(undefined);
  }, []);

  useEffect(() => {
    if (!banner) {
      return;
    }

    const timeout = setTimeout(() => {
      if (banner) {
        setBanner(undefined);
        return;
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [banner]);

  return (
    <Provider
      value={{
        showBanner,
      }}>
      {banner && (
        <View style={styles[`${banner.type}Container`]}>
          <TouchableOpacity onPress={onDismissPress}>
            <Text style={styles[`${banner.type}Message`]}>
              {banner.message}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {children}
    </Provider>
  );
};

export default ErrorBannerProvider;
