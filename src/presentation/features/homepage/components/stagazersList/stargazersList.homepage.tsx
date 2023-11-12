import {
  FlatList,
  FlatListProps,
  Image,
  Linking,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import StargazerEntity from '../../../../../domain/entities/stargazer.entity';
import useGetRepositoryStargazerApi from '../../../../hooks/useGetRepositoryStargazersApi/useGetRepositoryStargazersApi.hook';
import useStyles from '../../../../providers/theme/useStyles.hook';
import getHomepageStargazersStyles, {
  STARGAZER_CARD_HEIGHT,
} from './stargazersList.homepage.styles';
import Images from '../../../../../assets/images/images.asset';

interface Props {
  url: string;
  size: number;
}

const HomepageStargazers = memo<Props>(({url, size}) => {
  const styles = useStyles(getHomepageStargazersStyles);

  const {data, fetchNextPage} = useGetRepositoryStargazerApi(url);

  const getItemLayout = useCallback<
    NonNullable<FlatListProps<StargazerEntity>['getItemLayout']>
  >(
    (_, index) => ({
      length: STARGAZER_CARD_HEIGHT + styles.separator.marginBottom,
      offset: STARGAZER_CARD_HEIGHT * index,
      index,
    }),
    [styles.separator.marginBottom],
  );

  const onOpenGithubUrl = useCallback(
    (githubUrl: string) => async () => {
      const canOpen = Linking.canOpenURL(githubUrl);
      if (!canOpen) {
        return;
      }

      await Linking.openURL(githubUrl);
    },
    [],
  );

  const renderItem = useCallback<ListRenderItem<StargazerEntity>>(
    ({item}) => {
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
            <TouchableOpacity onPress={onOpenGithubUrl(item.homepage)}>
              <Image
                source={Images.share}
                style={styles.stargazerCardShareIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [
      onOpenGithubUrl,
      styles.stargazerCard,
      styles.stargazerCardAvatar,
      styles.stargazerCardLeftContent,
      styles.stargazerCardName,
      styles.stargazerCardRightContent,
      styles.stargazerCardShareIcon,
    ],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.footer}>
        <Text style={styles.footerNote}>{`${data.length} / ${size}`}</Text>
      </View>
    </View>
  );
});

export default HomepageStargazers;
