import React, { useState } from "react";
import styled from "styled-components";
import ModalCreateRoom from "./ModalCreateRoom";

export default function CreateRoomButton() {
  //메인페이지의 방만들기 버튼 -  클릭시 모달창 켜지고 꺼지는 기능만.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRoomModalOpen = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert("로그인 후 이용해주세요.");
    }
  };
  const handleRoomModalClose = () => {
    setIsModalOpen(false);
  };
  //로그인여부
  const isLoggedIn = !!localStorage.getItem("Authorization");

  return (
    <div>
      <div>
        <StButton onClick={handleRoomModalOpen}>방만들기</StButton>
        {isModalOpen && <ModalCreateRoom onClose={handleRoomModalClose} />}
      </div>
    </div>
  );
}

// const StTitle = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   margin: 0;
// `;

const StButton = styled.button`
  /* position: relative;
  top: 130px; */
  font-size: 20px;
  width: 177px;
  height: 54px;
  border: solid 3px #ffe45c;
  border-radius: 30px;
  background-color: #ffe45c;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #ffe45c;
    color: black;
    border: solid 3px #3d8afd;
  }
`;
