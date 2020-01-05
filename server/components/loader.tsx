import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  opacity: 0.5;
  overflow: none;
  z-index: 999999;
`;

const Loader = () => {
  useEffect(() => {
    const ogFlow = document.querySelector('body').style.overflow;
    window.scrollTo(0, 0);
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      document.querySelector('body').style.overflow = ogFlow;
    };
  }, []);
  return (
    <Wrapper>
      <CircularProgress color="primary" />
    </Wrapper>
  );
};

export default Loader;
