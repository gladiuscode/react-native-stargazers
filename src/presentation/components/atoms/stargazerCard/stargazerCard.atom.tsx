import React, {memo, useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Images from '../../../../assets/images/images.asset';
import useStyles from '../../../providers/theme/useStyles.hook';
import getStargazerCardStyles from './stargazerCard.styles';
import StargazerEntity from '../../../../domain/entities/stargazer.entity';

interface Props {
  item: StargazerEntity;
  onSharePress: (url: string) => void;
}

const StargazerCard = memo<Props>(({item, onSharePress}) => {
  const styles = useStyles(getStargazerCardStyles);

  const onPress = useCallback(() => {
    onSharePress(item.homepage);
  }, [item.homepage, onSharePress]);

  return (
    <View style={styles.stargazerCard}>
      <View style={styles.stargazerCardLeftContent}>
        <Image
          source={{uri: item.avatarUrl}}
          style={styles.stargazerCardAvatar}
        />
        <Text style={styles.stargazerCardName}>{item.name}</Text>
      </View>
      <View style={styles.stargazerCardRightContent}>
        <TouchableOpacity onPress={onPress}>
          <Image source={Images.share} style={styles.stargazerCardShareIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default StargazerCard;
