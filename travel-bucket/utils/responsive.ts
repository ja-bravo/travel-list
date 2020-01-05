import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export enum SIZES {
  XLARGE, // iPhone XR or bigger -> 6.1'
  LARGE, //  iPhone 7+,iPhone X or Bigger -> 5.8'
  NORMAL, // iPhone 7 -> 4.8' to 5.5'
  SMALL, // iPhone 5/6 -> 4' to 4'7
}

export const PHONE_SIZE = screenHeight <= 600 ? SIZES.SMALL : screenHeight < 700 ? SIZES.NORMAL : screenHeight < 820 ? SIZES.LARGE : SIZES.XLARGE;

interface IProps {
  small?: any;
  normal?: any;
  large?: any;
  xlarge?: any;
}

export const getBySize = (sizes: IProps) => {
  const { small, normal, large, xlarge } = sizes;
  switch (PHONE_SIZE) {
    case SIZES.SMALL:
      return small || normal || large || xlarge || 0;
    case SIZES.NORMAL:
      return normal || small || large || xlarge || 0;
    case SIZES.LARGE:
      return large || normal || xlarge || small || 0;
    case SIZES.XLARGE:
      return xlarge || large || normal || small || 0;
    default:
      return 0;
  }
};
