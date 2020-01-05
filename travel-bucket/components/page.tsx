import React from 'react';
import styled from 'styled-components/native';
import { palette } from '../utils/style';
import { TouchableWithoutFeedback, ViewStyle } from 'react-native';

const Wrapper = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: ${palette.whiteBackground};
  padding-top: 12px;
`;

const Page: React.FC<{ onPress?: () => void; style?: ViewStyle }> = React.forwardRef(({ onPress, children, style }, ref) => {
  if (onPress) {
    return (
      <TouchableWithoutFeedback onPress={() => onPress()} style={{ flex: 1 }}>
        <Wrapper style={style}>{children}</Wrapper>
      </TouchableWithoutFeedback>
    );
  } else {
    return <Wrapper style={style}>{children}</Wrapper>;
  }
});
export default Page;
