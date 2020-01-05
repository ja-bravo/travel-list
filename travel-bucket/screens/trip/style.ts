import styled from 'styled-components/native';
import { fonts, palette } from '../../utils/style';
import { getBySize } from '../../utils/responsive';

export const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TitleInput = styled.TextInput`
  font-family: ${fonts.bold};
  color: ${palette.blackBackground};
  margin-left: 16px;
  margin-top: ${getBySize({ small: 8, normal: 8, large: 16 })}px;
  margin-bottom: ${getBySize({ small: 8, normal: 8, large: 16 })}px;
  font-size: 20px;
  width: ${getBySize({ small: 50, normal: 55, large: 70 })}%;
`;
