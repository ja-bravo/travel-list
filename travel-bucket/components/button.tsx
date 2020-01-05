import React from 'react';
import { ActivityIndicator, TextStyle, ViewStyle } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import styled from 'styled-components/native';
import { palette } from '..//utils/style';
import { getBySize } from '../utils/responsive';
import BaseText from './baseText';

const getColor = (type: string) => {
  switch (type) {
    case 'white':
      return palette.whiteBackground;
    case 'black':
      return palette.blackBackground;
    case 'green':
      return palette.green;
    case 'red':
      return palette.red;
    default:
      return palette.whiteBackground;
  }
};
const ButtonContent = styled.View<{ type: 'black' | 'white' | 'green' | 'red'; small?: boolean }>`
  border-radius: 4px;
  height: ${p => (!p.small ? getBySize({ small: 50, normal: 55, large: 60 }) : 40)}px;
  width: ${p => (!p.small ? '100%' : getBySize({ small: '110px', normal: '130px', large: '145px' }))};
  background-color: ${p => getColor(p.type)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TouchablePlat = styled(Touchable)``;

interface IProps {
  type: 'black' | 'white' | 'green' | 'red';
  onPress: () => void;
  text: string;
  containerStyle?: ViewStyle;
  touchableStyle?: ViewStyle;
  textStyle?: TextStyle;
  small?: boolean;
  loading?: boolean;
}

const Button: React.FC<IProps> = ({ type, onPress, text, containerStyle, textStyle, touchableStyle, small, loading }) => (
  <TouchablePlat onPress={onPress} style={[{ width: '60%', maxWidth: 250 }, touchableStyle]}>
    <ButtonContent type={type} style={containerStyle} small={small}>
      {!loading && (
        <BaseText style={[{ color: type === 'white' ? palette.blackBackground : palette.whiteBackground, fontSize: small ? 14 : 18 }, textStyle]}>
          {text}
        </BaseText>
      )}
      {loading && <ActivityIndicator color={type === 'white' ? palette.blackBackground : palette.whiteBackground} />}
    </ButtonContent>
  </TouchablePlat>
);

export default Button;
