import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __postVideoToken } from "../../redux/modules/roomSlice";
import styled from "styled-components";
import { BsBroadcast } from "react-icons/bs";
import { MdOutlinePeople } from "react-icons/md";

// getColorByCategory 함수를 선언합니다.
const getColorByCategory = (category) => {
  switch (category) {
    case "개발":
      return "#E6FFFF";
    case "취준":
      return "#FFF7CE";
    case "직장인":
      return "#FEEAFF";
    case "수능":
      return "#a5d8c5";
    default:
      return "gray";
  }
};

const Card = ({ room }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = !!localStorage.getItem("Authorization");

  const handleSubmit = (id) => {
    dispatch(__postVideoToken(id));
  };

  return (
    <StCreatedRoom key={room.id} category={room.category}>
      <StContainer category={room.category}>
        <StRoomUpper>
          <div>
            <StCategory>#{room.category}</StCategory>
          </div>

          <StBroadcast>
            <StUser>
              <MdOutlinePeople /> {room.currentMember} / 4
            </StUser>
            <BsBroadcast />
          </StBroadcast>
        </StRoomUpper>
        <h2>{room.roomTitle}</h2>
        <StNickname>{room.masterUserNickname}</StNickname>
      </StContainer>
      <StButtonBox>
        <StButton
          onClick={() => {
            handleSubmit(room.openviduRoomId);
            if (isLoggedIn) {
              navigate(`/detail/${room.openviduRoomId}`);
            } else {
              alert("로그인이 필요한 기능입니다.");
            }
          }}
        >
          입장하기
        </StButton>
      </StButtonBox>
    </StCreatedRoom>
  );
};

export default Card;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 30px 28px 30px 28px;
  width: 410px;
  height: 250px;
  border-radius: 3rem;
  box-shadow: 4px 5px 15px rgba(0, 0, 0, 0.3);
`;

const StContainer = styled.div`
  background-color: ${(props) => getColorByCategory(props.category)};
  height: 60%;
  padding: 30px 20px 0px 20px;
  border-radius: 3rem 3rem 0rem 0rem;
`;

const StRoomUpper = styled.div`
  display: flex;
  font-size: 17px;
  color: gray;
  justify-content: space-between;
`;

const StNickname = styled.div`
  margin-right: 40px;
  margin-bottom: 45px;
`;

const StCategory = styled.div``;

const StBroadcast = styled.div`
  display: flex;
  color: red;
  font-size: 25px;
`;

const StUser = styled.div`
  color: black;
  font-size: 20px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  gap: 7px;
`;

const StButtonBox = styled.div`
  width: 410px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StButton = styled.button`
  font-size: 20px;
  border: solid 2px #3d8afd;
  color: #3d8afd;
  border-radius: 30px;
  background-color: white;
  width: 300px;
  height: 40px;
  /* margin: 0px 50% 20px 25%; */
  cursor: pointer;
  &:hover {
    color: white;
    border: 3px solid #3d8afd;
    background-color: #3d8afd;
    transition: all 0.5s ease;
  }
`;
