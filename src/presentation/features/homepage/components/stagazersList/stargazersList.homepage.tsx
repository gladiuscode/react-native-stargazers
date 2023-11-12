import {FlatList, Image, ListRenderItem, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import StargazerEntity from '../../../../../domain/entities/stargazer.entity';
import useGetRepositoryStargazerApi from '../../../../hooks/useGetRepositoryStargazersApi/useGetRepositoryStargazersApi.hook';
import useStyles from '../../../../providers/theme/useStyles.hook';
import getHomepageStargazersStyles from './stargazersList.homepage.styles';

interface Props {
  url: string;
  size: number;
}

const HomepageStargazers = memo<Props>(({url, size}) => {
  const styles = useStyles(getHomepageStargazersStyles);

  const {data, fetchNextPage} = useGetRepositoryStargazerApi(url);

  const renderItem = useCallback<ListRenderItem<StargazerEntity>>(
    ({item}) => {
      return (
        <View style={styles.stargazerCard}>
          <Image
            source={{uri: item.avatarUrl}}
            style={styles.stargazerCardAvatar}
          />
          <Text style={styles.stargazerCardName}>{item.name}</Text>
        </View>
      );
    },
    [
      styles.stargazerCard,
      styles.stargazerCardAvatar,
      styles.stargazerCardName,
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
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.footer}>
        <Text style={styles.footerNote}>{`${data.length} / ${size}`}</Text>
      </View>
    </View>
  );
});

export default HomepageStargazers;
