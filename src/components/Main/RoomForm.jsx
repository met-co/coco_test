import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CreateRoomButton from "./CreateRoomButton";
import { __getRoom } from "../../redux/modules/roomSlice";
import { __postVideoToken } from "../../redux/modules/roomSlice";
import { BsBroadcast } from "react-icons/bs";
import { MdOutlinePeople } from "react-icons/md";
import Card from "./Card";

// RoomForm 컴포넌트에서 rooms state 및 rooms 데이터 가져오는 기능 구현
export default function RoomForm({ rooms, search, category }) {
  const APPLICATION_SERVER_URL = "https://cocodingding.shop/";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getRoom());
  }, []);

  const filteredRooms = rooms
    .filter((room) =>
      room.roomTitle.toLowerCase().includes(search.toLowerCase())
    )
    .filter((room) => (category ? room.category === category : true));

  //로그인여부
  const isLoggedIn = !!localStorage.getItem("Authorization");

  const handleSubmit = (id) => {
    console.log(id);
    dispatch(__postVideoToken(id));
  };

  return (
    <div>
      <StSearch>
        <StCreateRoomButton>
          <div>
            <h2> 방에 참여해보세요.</h2>
          </div>
          <div>
            <CreateRoomButton />
          </div>
        </StCreateRoomButton>
      </StSearch>

      {filteredRooms.length === 0 ? (
        <StCreatedRoom>
          <h3>
            방이없음.. 방 만드셈.. 일단 이거 1차로 할지 2차로 할지 결정이
            안됨...
          </h3>
        </StCreatedRoom>
      ) : (
        <StCreateRooms>
          {filteredRooms.map((room) => {
            return <Card key={room.id} room={room} />;
          })}
        </StCreateRooms>
      )}
    </div>
  );
}
const StSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StCreateRooms = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 40px;
  padding: 2rem;
  width: 250px;
  height: 200px;
  background-image: linear-gradient(
    to bottom,
    rgba(61, 138, 253, 0.3) 66%,
    white 34%
  );

  border-radius: 3rem;
  box-shadow: 4px 5px 15px rgba(0, 0, 0, 0.3);
`;

const StCreateRoomButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;
