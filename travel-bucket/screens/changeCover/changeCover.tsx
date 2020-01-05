import React, { useState } from 'react';
import { TouchableOpacity, FlatList, Alert } from 'react-native';
import Page from '../../components/page';
import Title from '../../components/title';
import { TopBar, Wrapper, Images } from './style';
import { palette } from '../../utils/style';
import { NavigationScreenProp } from 'react-navigation';
import Input from '../../components/input';
import _ from 'lodash';
import Unsplash from '../../utils/unsplash';
import { toJson } from 'unsplash-js';
import styled from 'styled-components/native';
import { getBySize } from '../../utils/responsive';

const Image = styled.Image`
  width: ${getBySize({ small: 100, large: 100 })}px;
  height: ${getBySize({ small: 100, large: 100 })}px;
  margin-bottom: 16px;
  border-radius: 4px;
`;

const ImageSquare: React.FC<{ uri: string; onPress: any }> = ({ onPress, uri }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={{ uri }} resizeMode="cover" />
  </TouchableOpacity>
);

const ChangeCover: React.FC<{ navigation: NavigationScreenProp<any> }> = ({ navigation }) => {
  const onChange = navigation.getParam('onChange');
  const [results, setResults] = useState([]);
  const onSearch = _.debounce((topic: string) => {
    Unsplash.search
      .photos(topic, 1, 200, { orientation: 'landscape' })
      .then(toJson)
      .then(r => {
        setResults(r['results']);
      });
  }, 500);

  const onPress = (image: any) => {
    Unsplash.photos.downloadPhoto(image);
    onChange(image['urls']['full']);
    navigation.goBack();
  };

  return (
    <Page>
      <Wrapper contentContainerStyle={{ alignItems: 'center' }}>
        <TopBar>
          <Title>Change destination cover</Title>
        </TopBar>

        <Input label="Search" type="black" onChangeText={onSearch} />

        <Images>
          {results.map(r => (
            <ImageSquare
              key={r.id}
              uri={r['urls']['small']}
              onPress={() => {
                Alert.alert('Select this image', '', [{ onPress: () => onPress(r), text: 'Accept' }, { text: 'Cancel' }]);
              }}
            />
          ))}
        </Images>
      </Wrapper>
    </Page>
  );
};

export default ChangeCover;
