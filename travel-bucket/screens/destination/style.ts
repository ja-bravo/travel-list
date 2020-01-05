import styled from 'styled-components/native';
import BaseText from '../../components/baseText';
import { fonts, palette } from '../../utils/style';
import { Animated, Dimensions } from 'react-native';
import { getBySize } from '../../utils/responsive';

export const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${getBySize({ small: 8, normal: 8, large: 16 })}px;
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

export const Wrapper = Animated.createAnimatedComponent(styled.ImageBackground`
  width: 100%;
  margin-bottom: ${getBySize({ small: 8, normal: 8, large: 16 })}px;
  justify-content: center;
  align-items: center;
`);

export const EditDate = styled(BaseText)`
  color: ${palette.red};
  font-family: ${fonts.bold};
  text-align: center;
  font-size: 14px;
  margin-right: 16px;
`;

export const Subtitle = styled(BaseText)`
  color: white;
  font-family: ${fonts.bold};
  text-align: center;
  font-size: 24px;
`;

export const Year = styled(BaseText)`
  color: white;
  font-family: ${fonts.bold};
  text-align: center;
  font-size: 14px;
`;

export const Overlay = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${palette.blackBackground};
  opacity: 0.4;
  overflow: hidden;
`;

export const Todos = styled.View`
  width: ${Dimensions.get('screen').width - 64}px;
  margin-left: 32px;
  /* height: 45%; */
`;
