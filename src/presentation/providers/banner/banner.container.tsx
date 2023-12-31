import contextFactory from '../../../utils/contextFactory/contextFactory.util';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useStyles from '../theme/useStyles.hook';
import getBannerContainer from './banner.styles';
import {LocalizedLabelKey} from 'presentation/providers/localization/config.localization';
import {useLocalization} from 'presentation/providers/localization/localization.container';

interface BannerContext {
  showBanner(message: string, type?: BannerType): void;
}

const [useBanner, BannerProvider] =
  contextFactory<BannerContext>('BannerContext');
export {useBanner};

export enum BannerType {
  error = 'error',
  success = 'success',
}

interface Banner {
  message: LocalizedLabelKey;
  type: BannerType;
}

const BannerContainer: React.FC<PropsWithChildren> = ({children}) => {
  const {t} = useLocalization();
  const styles = useStyles(getBannerContainer);

  const [banner, setBanner] = useState<Banner>();

  const showBanner = useCallback<BannerContext['showBanner']>(
    (message: LocalizedLabelKey, type = BannerType.error) => {
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
    <BannerProvider
      value={{
        showBanner,
      }}>
      {banner && (
        <View style={styles[`${banner.type}Container`]}>
          <TouchableOpacity onPress={onDismissPress}>
            <Text style={styles[`${banner.type}Message`]}>
              {t(banner.message)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {children}
    </BannerProvider>
  );
};

export default BannerContainer;
