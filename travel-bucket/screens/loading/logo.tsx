import React from 'react';
import { Image } from 'react-native';
const LogoSrc = require('../../assets/topLogo.png');

export default class Logo extends React.Component {
  public render() {
    return <Image source={LogoSrc} {...this.props} />;
  }
}
