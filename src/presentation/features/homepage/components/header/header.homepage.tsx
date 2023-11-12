import React, {memo, useCallback} from 'react';
import { Image, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Images from '../../../../../assets/images/images.asset';
import {useAppTheme} from '../../../../providers/theme/theme.provider';
import useStyles from '../../../../providers/theme/useStyles.hook';
import getHomepageHeaderStyles from './header.homepage.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const HomepageHeader = memo<Props>(({style}) => {
  const styles = useStyles(getHomepageHeaderStyles);
  const {variant, onVariantChange} = useAppTheme();

  const onChangeThemePress = useCallback(() => {
    onVariantChange(variant === 'light' ? 'dark' : 'light');
  }, [onVariantChange, variant]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>StarGazers</Text>
      <TouchableOpacity onPress={onChangeThemePress}>
        <Image
          source={variant === 'light' ? Images.moon : Images.sun}
          style={styles.themeIcon}
        />
      </TouchableOpacity>
    </View>
  );
});

export default HomepageHeader;
