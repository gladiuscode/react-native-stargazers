import {
  FlatList,
  FlatListProps,
  Linking,
  ListRenderItem,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import StargazerEntity from '../../../../../domain/entities/stargazer.entity';
import useGetRepositoryStargazerApi from '../../../../hooks/useGetRepositoryStargazersApi/useGetRepositoryStargazersApi.hook';
import useStyles from '../../../../providers/theme/useStyles.hook';
import StargazerCard from '../../../../components/atoms/stargazerCard/stargazerCard.atom';
import getHomepageStargazersStyles from './stargazersList.homepage.styles';
import {STARGAZER_CARD_HEIGHT} from '../../../../components/atoms/stargazerCard/stargazerCard.styles';
import {useLocalization} from '../../../../providers/localization/localization.container';

interface Props {
  style?: StyleProp<ViewStyle>;
  url: string;
  size: number;
}

const HomepageStargazers = memo<Props>(({style, url, size}) => {
  const {t} = useLocalization();
  const styles = useStyles(getHomepageStargazersStyles);

  const {data, loading, error, fetchNextPage, retry} =
    useGetRepositoryStargazerApi(url);

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

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.errorButton} onPress={retry}>
            <Text style={styles.errorButtonMessage}>
              {t('no_stargazers_found_retry_button_text')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>{t('missing_stargazers_text')}</Text>
      </View>
    );
  }, [
    error,
    loading,
    retry,
    styles.emptyContainer,
    styles.emptyMessage,
    styles.errorButton,
    styles.errorButtonMessage,
    styles.errorContainer,
    styles.errorMessage,
    t,
  ]);

  return (
    <View style={[styles.container, style]}>
      <FlatList
        testID={'stargazers-list'}
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
