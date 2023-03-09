import React from "react";
import styled from "styled-components";

export default function SearchBar({ search, setSearch, setCategory, rooms }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCategory("");
  };

  const selectCategory = (category) => {
    setCategory(category);
    setSearch("");
  };

  const categories = Array.from(new Set(rooms.map((room) => room.category)));

  return (
    <StBackground>
      <StInput
        type="text"
        placeholder="  참여하고싶은 방을 찾아보세요"
        value={search}
        onChange={handleSearchChange}
      />

      <StCategorys>
        {categories.map((category) => (
          <StCategory key={category} onClick={() => selectCategory(category)}>
            #{category}
          </StCategory>
        ))}
      </StCategorys>
    </StBackground>
  );
}

const StBackground = styled.div`
  background-color: #ffe45c;
  width: 500px;
  flex-basis: 60%;
  /* max-width: 105vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "AppleSDGothicNeo", "Noto Sans KR", sans-serif;
`;

const StCategorys = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const StInput = styled.input`
  max-width: 700px;
  width: 100%;
  height: 53px;
  border: solid 1px gray;
  border-radius: 10px;
  background-color: white;
`;

const StCategory = styled.div`
  border: solid 1px gray;
  border-radius: 1.5rem;
  background-color: #fff1ad;
  margin-left: 1rem;
  margin-right: 1rem;

  padding: 0.7rem;
  cursor: pointer;
  &:hover {
    /* background-color: black; */
    color: black;
    border: 2px solid #3d8afd;
    margin-bottom: -2px;
  }
`;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* justify-content: center; */
  margin-top: 30px;
  margin-bottom: 50px;
`;

const StImg = styled.img`
  /* flex-basis: 20%; */
  margin-left: 40px;
  width: 150px;
  height: 150px;
`;
