import React, {memo} from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import InputField from '../../../../components/atoms/inputField/inputField.atom';
import Images from '../../../../../assets/images/images.asset';
import useHomepageFormFacade from './useForm.homepage.facade';

interface Props {
  style?: StyleProp<ViewStyle>;
  onSubmit: (owner: string, repository: string) => void;
}

const HomepageForm = memo<Props>(({style, onSubmit}) => {
  const {
    styles,
    form,
    repositoryInputRef,
    getErrorMessageOf,
    onChangeText,
    onInputSubmit,
    onSearchPress,
  } = useHomepageFormFacade(onSubmit);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputsContainer}>
        <InputField
          style={styles.ownerInput}
          id={'owner'}
          initialValue={form.owner}
          placeholder={'Owner*'}
          errorMessage={getErrorMessageOf('owner')}
          returnKeyType={'next'}
          onChangeText={onChangeText}
          onSubmit={onInputSubmit}
        />
        <InputField
          ref={repositoryInputRef}
          id={'repository'}
          initialValue={form.repository}
          placeholder={'Repository*'}
          errorMessage={getErrorMessageOf('repository')}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          testID={'search-button'}
          style={styles.searchButton}
          onPress={onSearchPress}>
          <Image source={Images.search} style={styles.searchImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default HomepageForm;
