import Container, { ContainerProps } from '@material-ui/core/Container';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled(Container)`
  padding-top: 16px;
  padding-bottom: 16px;
  @media (min-width: 600px) {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  @media (min-width: 960px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }
` as React.ComponentType<ContainerProps>;
const Layout: React.FC = ({ children }) => {
  return <Wrapper maxWidth="lg">{children}</Wrapper>;
};

export default Layout;
