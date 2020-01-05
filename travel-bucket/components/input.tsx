import React, { useEffect, useRef, useState } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { getBySize } from '../utils/responsive';
import { palette, fonts } from '../utils/style';
import BaseText from './baseText';

interface IProps extends TextInputProps {
  type: 'black' | 'white';
  label: string;
  containerStyle?: ViewStyle;
  ref?: any;
  notEditable?: boolean;
  onTouchStart?: () => void;
}

const Wrapper = styled.View<{ type: 'black' | 'white'; editable: boolean }>`
  border-radius: 4px;
  height: ${getBySize({ small: 50, normal: 55, large: 60 })}px;
  width: 80%;
  max-width: 300px;
  border-color: ${p => (p.type === 'black' ? palette.blackBackground : palette.whiteBackground)};
  border-width: 2px;
  display: flex;
  padding: 8px;
`;

const TextInput = styled.TextInput<{ type: 'black' | 'white' }>`
  color: ${p => (p.type === 'black' ? palette.blackBackground : palette.whiteBackground)};
  width: 100%;
  height: 100%;
  background: transparent;
`;

const Label = styled.Text<{ colour: 'black' | 'white'; editable: boolean }>`
  color: ${p => (p.colour === 'black' ? palette.blackBackground : palette.whiteBackground)};
  font-size: 18px;
  position: absolute;
  top: ${getBySize({ small: 10, normal: 15, large: 20 })}px;
  left: 8px;
  font-family: ${fonts.regular};
`;

const AnimatedLabel = Animated.createAnimatedComponent(Label);

const Input: React.FC<IProps> = React.forwardRef(
  ({ type, label, value, containerStyle, notEditable, onChangeText, onTouchStart, ...rest }, ref: any) => {
    const focusedValue = getBySize({ small: -23, normal: -25, large: -28 });
    const notFocusedValue = getBySize({ small: 13, normal: 15, large: 20 });
    const [isFocused, setIsFocused] = useState(value ? true : false);
    const top = useRef(new Animated.Value(getBySize({ small: 10, normal: 15, large: 20 })));

    useEffect(() => {
      if (isFocused || (value && value.length >= 1)) {
        Animated.spring(top.current, { toValue: focusedValue }).start();
      } else if (!value || value.length === 0) {
        Animated.spring(top.current, { toValue: notFocusedValue }).start();
      }
    }, [isFocused, value]);

    return (
      <Wrapper onTouchStart={() => onTouchStart && onTouchStart()} editable={!notEditable} type={type} style={containerStyle}>
        <AnimatedLabel editable={!notEditable} colour={type} type="book" style={{ top: top.current }}>
          {label}
        </AnimatedLabel>
        <TextInput
          underlineColorAndroid="transparent"
          ref={ref}
          type={type}
          value={value}
          onChangeText={t => {
            if (onChangeText) onChangeText(t);

            if (!onChangeText && t && t.length > 0) {
              setIsFocused(true);
            }
          }}
          editable={!notEditable}
          {...rest}
          onFocus={() => {
            if (rest.onFocus) rest.onFocus(null);
            setIsFocused(true);
          }}
          onBlur={() => {
            if (rest.onBlur) rest.onBlur(null);
            if (value || value === '') {
              setIsFocused(false);
            }
          }}
        />
      </Wrapper>
    );
  },
);

export default Input;
