import {
  FlatList,
  FlatListProps,
  Linking,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import StargazerEntity from '../../../../../domain/entities/stargazer.entity';
import useGetRepositoryStargazerApi from '../../../../hooks/useGetRepositoryStargazersApi/useGetRepositoryStargazersApi.hook';
import useStyles from '../../../../providers/theme/useStyles.hook';
import StargazerCard from '../../../../components/atoms/stargazerCard/stargazerCard.atom';
import getHomepageStargazersStyles from './stargazersList.homepage.styles';
import {STARGAZER_CARD_HEIGHT} from '../../../../components/atoms/stargazerCard/stargazerCard.styles';

interface Props {
  url: string;
  size: number;
}

const HomepageStargazers = memo<Props>(({url, size}) => {
  const styles = useStyles(getHomepageStargazersStyles);

  const {data, loading, fetchNextPage} = useGetRepositoryStargazerApi(url);

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

  const onOpenGithubUrl = useCallback(async (githubUrl: string) => {
    const canOpen = Linking.canOpenURL(githubUrl);
    if (!canOpen) {
      return;
    }

    await Linking.openURL(githubUrl);
  }, []);

  const renderItem = useCallback<ListRenderItem<StargazerEntity>>(
    ({item}) => {
      return <StargazerCard item={item} onSharePress={onOpenGithubUrl} />;
    },
    [onOpenGithubUrl],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  const renderEmptyComponent = useCallback(() => {
    if (loading) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>No stargazers found</Text>
      </View>
    );
  }, [loading, styles.emptyContainer, styles.emptyMessage]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        getItemLayout={getItemLayout}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.footer}>
        <Text style={styles.footerNote}>{`${data.length} / ${size}`}</Text>
      </View>
    </View>
  );
});

export default HomepageStargazers;
