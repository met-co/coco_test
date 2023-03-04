import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRoom } from "../../redux/modules/roomSlice";
import { __createRoom } from "../../redux/modules/roomSlice";
import { useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";

function ModalCreateRoom({ onClose, isOpen }) {
  const APPLICATION_SERVER_URL = "https://cocodingding.shop/";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    onClose();
  };

  const [post, setPost] = useState({
    category: "",
    roomTitle: "",
    status: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  console.log(post);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(__createRoom(post));
    getToken();
    // alert('방이 생성되었습니다.');
    // window.location.reload();
    // navigate('/');
  };

  const getToken = async () => {
    // const sessionId = await createSession();
    // return await createToken(sessionId);
  };

  // const [roomId, setRoomId] = useState("");

  // const createSession = async () => {
  //   const sessionResponse = await axios.post(
  //     APPLICATION_SERVER_URL + "detail/room",
  //     {
  //       roomTitle: post.roomTitle,
  //       category: post.category,
  //     },

  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization:
  //         //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFAbmF2ZXIuY29tIiwiZXhwIjoxNjc2NzA1MDc1LCJpYXQiOjE2NzY3MDMyNzV9.pbFr0vxt3HEflehW-pcauZSw2Jn5PRYXgwYZ0UdJyt8RPj9Xh7krp5b8wQxKDcg8SFuXAQITteHjYAOQhJi-qQ",
  //       },
  //     }
  //   );
  //   return sessionResponse.data;
  // };

  // console.log(roomId);

  // const createToken = async (sessionId) => {
  //   console.log(roomId);
  //   const tokenResponse = await axios.post(
  //     APPLICATION_SERVER_URL + `detail/room/17`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization:
  //         //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFAbmF2ZXIuY29tIiwiZXhwIjoxNjc2NzA1MDc1LCJpYXQiOjE2NzY3MDMyNzV9.pbFr0vxt3HEflehW-pcauZSw2Jn5PRYXgwYZ0UdJyt8RPj9Xh7krp5b8wQxKDcg8SFuXAQITteHjYAOQhJi-qQ",
  //       },
  //     },
  //     { withCredentials: true }
  //   );
  //   return tokenResponse.data; // The token
  // };

  // const handleSelectChange = (e) => {
  //   setCategory(e.target.value);
  // };

  return (
    <StContainer>
      <StHeader>
        <StTitle>방만들기</StTitle>
        <StCloseButton onClick={closeModal}>
          <GrClose />
        </StCloseButton>
      </StHeader>
      {/* 상단바.. */}
      <StDivider />
      {/* 방이름,  카테고리, 방만들기,취소하기 버튼. 컴포넌트 */}
      {/* <CreateRoomForm /> */}

      <form onSubmit={handleSubmit}>
        <div>
          <h3>방이름</h3>
          <Stcenter>
            <StInput
              type="text"
              placeholder="여기에 입력합니다."
              value={post.title}
              name="roomTitle"
              onChange={handleChange}
            />
          </Stcenter>
        </div>

        <h3>카테고리</h3>
        <Stcenter>
          <StSelect
            value={post.category}
            name="category"
            onChange={handleChange}
          >
            <option>카테고리 선택하세요.</option>
            <option>수학</option>
            <option>심리학</option>
            <option>철학</option>
            <option>뇌과학</option>
          </StSelect>
        </Stcenter>
        <input type="text"></input>
        <StButtons>
          <StButton onClick={closeModal}>취소하기</StButton>
          <StButton type="submit">방만들기</StButton>
        </StButtons>
      </form>
    </StContainer>
  );
}
export default ModalCreateRoom;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 704px;
  height: 772px;
  /* 최상단 위치 */
  z-index: 50;
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background-color: white;
  border: 1px solid #ece9e9;
  border-radius: 8px;
  padding: 3rem;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2rem 0px 2rem;
`;

const StTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const StCloseButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const StDivider = styled.hr`
  border: 0;
  border-top: 1px solid gray;
  margin: 20px 0 40px 0;
`;

const StInput = styled.input`
  display: flex;
  width: 585px;
  height: 80px;
  border: none;
  border-radius: 0.5rem;
  border: 2px solid #a7a7a7;
`;

const StSelect = styled.select`
  width: 585px;
  height: 80px;
  border: 2px solid #a7a7a7;
  border-radius: 0.5rem;

  color: #a7a7a7;
  /* background-color: #a7a7a7; */
`;

const Stcenter = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 50px;
`;

const StButtons = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
`;

const StButton = styled.button`
  width: 272px;
  height: 80px;
  border: 2px solid #a7a7a7;
  border-radius: 0.5rem;
  background-color: white;

  cursor: pointer;
  &:hover {
    border: 2px solid #5cabff;
  }
`;
