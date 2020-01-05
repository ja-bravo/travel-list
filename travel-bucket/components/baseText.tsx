import React from 'react';
import styled from 'styled-components/native';
import { palette, fonts } from '../utils/style';
import { TextStyle } from 'react-native';

const Text = styled.Text`
  font-family: ${fonts.regular};
  color: ${palette.blackBackground};
  font-size: 12px;
`;

const BaseText: React.FC<{ style?: TextStyle[]; numberOfLines?: number }> = ({ children, style, numberOfLines }) => (
  <Text numberOfLines={numberOfLines} style={style}>
    {children}
  </Text>
);
export default BaseText;
