import React from 'react';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return <StWrap>{children}</StWrap>;
};
export default Layout;

const StWrap = styled.div`
  /* font-family: "Gowun Dodum", sans-serif; */
  max-width: 1400px;
  min-width: 600px;
  margin: 0 auto;
`;
