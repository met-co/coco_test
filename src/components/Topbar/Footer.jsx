import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";
import { useNavigate, Link } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <StContainer>
      <StLayout>
        <StWrapBox>
          <StStudy
            onClick={() => {
              navigate(`/`);
              window.location.reload();
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/img/logo_1x.png`}></img>
          </StStudy>
          <p
            onClick={() => {
              navigate(`/notice`);
            }}
          >
            공지사항
          </p>
          <p
            onClick={() => {
              navigate(`/members`);
            }}
          >
            팀 소개
          </p>
        </StWrapBox>
      </StLayout>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */

  /* background-color: #fafafa;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem; */
  /* position: sticky; */
  bottom: 0;
  backdrop-filter: blur(30px);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  margin-top: 50px;
  height: 150px;
`;

const StLayout = styled.div`
  width: 100%;
  max-width: 1400px;
  min-width: 600px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  line-height: 150px;
`;

const StWrapBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 130px;
  padding: 0 1rem;
  & > p {
    font-weight: 600;
    font-size: 18px;
    font-family: "AppleSDGothicNeo", "Noto Sans KR", sans-serif;
    cursor: pointer;
  }
`;

const StStudy = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
`;
