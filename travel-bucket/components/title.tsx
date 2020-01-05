import React from 'react';
import styled from 'styled-components/native';
import { palette, fonts } from '../utils/style';
import { getBySize } from '../utils/responsive';

const TitleS = styled.Text`
  font-family: ${fonts.bold};
  color: ${palette.blackBackground};
  margin-left: 16px;
  margin-top: ${getBySize({ small: 8, normal: 8, large: 16 })}px;
  margin-bottom: ${getBySize({ small: 8, normal: 8, large: 16 })}px;
  font-size: 20px;
`;

const Title = ({ children }) => <TitleS>{children}</TitleS>;
export default Title;
