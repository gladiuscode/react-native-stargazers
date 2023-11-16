import React, {memo, useCallback} from 'react';
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Images from '../../../../../assets/images/images.asset';
import {useAppTheme} from '../../../../providers/theme/theme.container';
import useStyles from '../../../../providers/theme/useStyles.hook';
import getHomepageHeaderStyles from './header.homepage.styles';
import {useLocalization} from '../../../../providers/localization/localization.container';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const HomepageHeader = memo<Props>(({style}) => {
  const {t} = useLocalization();
  const styles = useStyles(getHomepageHeaderStyles);
  const {language, onLanguageChange} = useLocalization();
  const {variant, onVariantChange} = useAppTheme();

  const onChangeLanguagePress = useCallback(() => {
    onLanguageChange(language === 'it' ? 'en' : 'it');
  }, [language, onLanguageChange]);

  const onChangeThemePress = useCallback(() => {
    onVariantChange(variant === 'light' ? 'dark' : 'light');
  }, [onVariantChange, variant]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{t('title')}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={onChangeLanguagePress}>
          <Text style={styles.language}>{language === 'it' ? 'en' : 'it'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onChangeThemePress}>
          <Image
            source={variant === 'light' ? Images.moon : Images.sun}
            style={styles.themeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default HomepageHeader;
