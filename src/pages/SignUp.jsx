import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useState, useCallback } from 'react';

import '../App.css';
import Topbar from '../components/Topbar/Topbar';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [nickname, setNickname] = useState('');

  ///유효성 검사 후 띄울 메세지
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordconfirmMessage] = useState('');
  ///유효성검사시에 이용할 useState 초기값
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  ///1. 닉네임 유효성검사-2글자 이상 12자리 이하 특수문자불가
  const onChangeName = useCallback((e) => {
    const usenameRegex = /[^a-zA-Z0-9ㄱ-힣]/g;
    setNickname(e.target.value);
    if (usenameRegex.test(e.target.value)) {
      setNicknameMessage('특수문자는 이용이 불가능합니다!');
      setIsNickname(false);
    } else if (e.target.value.length < 2) {
      setNicknameMessage('2글자 이상 입력해주세요.');
      setIsNickname(false);
    } else if (e.target.value.length > 12) {
      setNicknameMessage('12자리 이하로 입력해주세요');
      setIsNickname(false);
    } else {
      setNicknameMessage('올바른 형식입니다.');
      setIsNickname(true);
    }
  }, []);

  //2. 이메일 유효성검사-알파벳과숫자,@포함필수
  const onChangeEmail = useCallback((e) => {
    ///이메일정규식
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일형식을 확인해주세요!');
      setIsEmail(false);
    } else {
      setIsEmail(true);
      setEmailMessage('올바른 형식입니다.');
    }
  }, []);
  ///3. 패스워드 유효성검사-알파벳,숫자,특수문자 8자리이상 15자리 이하
  const onChangePassword = useCallback((e) => {
    ///패스워드 정규식사용.
    const passwordRegex =
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        '대문자+소문자+특수문자+숫자 조합으로 8~15자리로 입력해주세요!'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 형식입니다. ');
      setIsPassword(true);
    }
  }, []);
  ///4. 비밀번호 재확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setConfirmpassword(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordconfirmMessage('올바르게 입력했습니다. ');
        setIsPasswordConfirm(true);
      } else {
        setPasswordconfirmMessage(
          '비밀번호가 일치하지 않습니다. 다시 확인해주세요.'
        );
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  ///버튼 클릭시 회원가입 submit
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios({
          method: 'post',
          url: ' https://cocodingding.shop/user/signup',
          data: {
            userNickname: nickname,
            userEmail: email,
            userPassword: password,
          },
        }).then((res) => {
          console.log('response:', res);
          if (res.status === 200) {
            alert('회원가입이 완료되었습니다');
            console.log(
              'User profile',
              res.data.userNickname,
              res.data.userEmail
            );
            window.location.replace('/');
          }
        });
      } catch (err) {
        console.error(err);
      }
    },
    [email, nickname, password]
  );

  return (
    <StwholeDiv>
      <Topbar />
      <StSignupForm onSubmit={onSubmit}>
        <h2>회원가입</h2>
        {/* <Simagelogo src={'img/logo-pink.png'} /> */}
        <StInput
          autoFocus
          required
          onChange={onChangeName}
          value={nickname}
          placeholder='닉네임 2~12자리 입력(특수문자이용은 불가능합니다!)'
        />
        {nickname.length > 0 && (
          <Stspan className={`message ${isNickname ? 'success' : 'error'}`}>
            {nicknameMessage}
          </Stspan>
        )}
        <StInput
          required
          onChange={onChangeEmail}
          value={email}
          placeholder='이메일 주소 입력'
        />
        {email.length > 0 && (
          <Stspan className={`message ${isEmail ? 'success' : 'error'}`}>
            {emailMessage}
          </Stspan>
        )}
        <StInput
          type='password'
          required
          onChange={onChangePassword}
          value={password}
          placeholder='비밀번호 입력(대문자+소문자+특수문자+숫자 조합으로 8~15자리 입력해주세요!)'
        />
        {password.length > 0 && (
          <Stspan className={`message ${isPassword ? 'success' : 'error'}`}>
            {passwordMessage}
          </Stspan>
        )}
        <StInput
          type='password'
          required
          onChange={onChangePasswordConfirm}
          value={confirmpassword}
          placeholder='비밀번호 재확인'
        />
        {confirmpassword.length > 0 && (
          <Stspan
            className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
          >
            {passwordConfirmMessage}
          </Stspan>
        )}
        <Stbutton
          type='submit'
          disabled={!(isNickname && isEmail && isPassword && isPasswordConfirm)}
        >
          회원가입
        </Stbutton>
      </StSignupForm>
    </StwholeDiv>
  );
}
const StSignupForm = styled.form`
  margin: 100px auto auto auto;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  height: 400px;
  width: 500px;
  padding: 20px;
  /* gap: 15px;/ */
`;
const StInput = styled.input`
  border: 1px solid rgba(216, 216, 216);
  border-radius: 10px;
  height: 50px;
  border-bottom: none;
  padding-left: 15px;
  margin-top: 30px;
`;

const Stspan = styled.span`
  font-size: 15px;
`;
const Stbutton = styled.button`
  border-radius: 10px;

  margin-top: 20px;
  border: none;
  height: 50px;
  color: white;
  font-weight: 700;
  background-color: rgba(215, 215, 215);
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const StwholeDiv = styled.div`
  background-color: rgba(249, 249, 249);
  height: 100%;
  width: auto;
`;
const Stimagelogo = styled.img`
  height: 50px;
  width: 120px;
  /* justify-content: center; */
  /* align-items: center; */
  display: flex;
  margin: -70px auto 50px auto;
`;
