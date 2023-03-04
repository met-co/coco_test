import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({ size, children, ...restProps }) => {
  return (
    <StyledButton {...restProps} size={size}>
      {children}
    </StyledButton>
  );
};

export default Button;
const StyledButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ bc }) => bc};
  color: ${({ color }) => color};
  font-size: ${({ fs }) => fs};
  border-radius: ${({ br }) => br};
  &:active {
    color: ${({ activeC }) => activeC};
    background-color: ${({ activeBc }) => activeBc};
  }
  &:hover {
    color: ${({ hoverC }) => hoverC};
    background-color: ${({ hoverBc }) => hoverBc};
  }
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  img {
    display: flex;
    justify-content: center;
    align-items: center;

    object-fit: cover;
  }

  ${(props) => {
    if (props.size === 'l') {
      return css`
        height: 50px;
        width: 200px;
      `;
    } else if (props.size === 'm') {
      return css`
        height: 50px;
        width: 80px;
      `;
    } else if (props.size === 's') {
      return css`
        height: 20px;
        width: 20px;
      `;
    } else if (props.size === 'h') {
      return css`
        height: 18px;
        width: 50px;
      `;
    } else {
      return css`
        height: 40px;
        width: 100px;
      `;
    }
  }}
`;
