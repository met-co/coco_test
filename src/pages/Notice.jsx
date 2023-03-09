import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";

export default function Notice() {
  const navigate = useNavigate();

  return (
    <Layout>
      <StContainer>공지사항이 없습니다.</StContainer>
      <StBtn
        onClick={() => {
          navigate(`/`);
        }}
      >
        <button>메인으로</button>
      </StBtn>
    </Layout>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-weight: 900;
  font-size: 30px;
`;
const StBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 200px;
    height: 50px;
    font-weight: 900;
    font-size: 30px;
    cursor: pointer;
    background-color: #ffe45c;
    border: none;
    border-radius: 15px;
  }
`;
