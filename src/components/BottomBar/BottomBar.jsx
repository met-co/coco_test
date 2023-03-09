import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../Layout/Layout";

export default function BottomBar() {
  const navigate = useNavigate();

  // 로그인 상태 판별
  const isLoggedIn = !!localStorage.getItem("Authorization");

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    window.location.reload();
  };

  return (
    <StContainer>
      <Layout>
        <StWrapBox>
          <StStudy
            onClick={() => {
              navigate(`/`);
              window.location.reload();
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/img/logo_1x.png`}></img>
          </StStudy>
          <StRight>
            {/* localStorage에 "Authorization"이 존재할때 "마이페이지", 존재하지않을때 "로그인"  */}
            ss
          </StRight>
        </StWrapBox>
      </Layout>
    </StContainer>
  );
}

const StWrapBox = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const StStudy = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
`;

const StRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const StMyPage = styled.div`
  font-size: 25px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #3d8afd;
  }
`;
const StButton = styled.h4`
  font-size: 17px;

  padding: 10px 30px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #3d8afd;
  }
`;

const StContainer = styled.div`
  width: 1400px;
`;
