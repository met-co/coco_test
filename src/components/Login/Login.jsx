import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//컴포넌트
import { KAKAO_AUTH_URL } from '../../shared/OAuth';

// window.Kakao.init('2630b13acd7d87daf981d810de94858f');
export default function Login({ onClose }) {
  const closeModal = () => {
    onClose();
  };

  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [error, setError] = useState('');
  // const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // Client-side validation- 둘 중 하나가 공란일 때
    if (!userEmail || !userPassword) {
      setError('이메일과 패스워드를 모두 입력해주세요!');
      return;
    }
    try {
      // 서버에 userEmail, userPassword를 보내서 요청

      await axios
        .post(
          'https://cocodingding.shop/user/login',
          {
            userEmail,
            userPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            'Authorization',
            res.headers.get('Authorization')
          );
          // localStorage.setItem('Access', res.headers.get('Access'));
          localStorage.setItem('Refresh', res.headers.get('Refresh'));

          console.log('로그인정보', res);
          const userNickname = res.data.userNickname;
          console.log(userNickname);
          localStorage.setItem('userNickname', userNickname);
          localStorage.setItem('userEmail', userEmail);
        });
      navigate(`/`);
      alert('로그인성공');
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('아이디/비밀번호가 올바르지 않습니다.');
      }
    }
  }

  //FIXME: 이거 왜 필요한지 모르겠음... -지석
  // useEffect(() => {
  //   axios
  //     .get('https://cocodingding.shop/user/login')
  //     .then((res) => console.log(res))
  //     .catch();
  // }, []);

  return (
    <StContainer>
      <StTopBar>
        <div></div>
        <h2>로그인 </h2>
        <button onClick={closeModal}>X</button>
      </StTopBar>
      <Stform>
        <div>
          {/* 로컬로그인 부분 */}

          <form onSubmit={handleSubmit}>
            <StInput
              // required
              autoFocus
              placeholder='이메일 주소 입력(필수)'
              value={userEmail}
              onChange={(event) => setuserEmail(event.target.value)}
            />
            <StInput
              // required
              type='Password'
              placeholder='비밀번호 입력(필수)'
              value={userPassword}
              onChange={(event) => setuserPassword(event.target.value)}
            />
            <div>
              <span className='error'>{error}</span>
            </div>
            <Stbuttonform>
              <StButton
                type='submit'
                // onClick={() => {
                //   navigate(`/`);
                //   window.location.reload();
                // }}
              >
                로그인
              </StButton>

              <div>
                <StButton
                  onClick={() => {
                    navigate('/SignUp');
                  }}
                >
                  회원가입
                </StButton>
              </div>
            </Stbuttonform>
          </form>
        </div>

        <StDivider />
        <h2>SNS계정 간편 로그인</h2>
        <div>
          <a href={KAKAO_AUTH_URL}>
            <img
              src={`${process.env.PUBLIC_URL}/img/kakao_login_medium_wide.png`}
            ></img>
            {/* <span>카카오계정 로그인</span> */}
          </a>
        </div>
      </Stform>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 400px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 600%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;

  /* 내부 박스 배치 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem 1rem 2rem;
`;

const StTopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Stform = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Stbuttonform = styled.div`
  margin-top: 20px;
`;

const StInput = styled.input`
  width: 99%;
  height: 35px;
  border: solid 1px black;
  border-radius: 0.5rem;
  background-color: white;
  margin-top: 10px;
`;

const StButton = styled.button`
  width: 100%;
  border: solid 1px black;
  border-radius: 0.5rem;
  background-color: white;
  margin-top: 10px;

  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const StDivider = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid gray;
  margin: 50px 0 10px 0;
`;
