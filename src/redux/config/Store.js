//컨피그 스토어 임포트
import { configureStore } from '@reduxjs/toolkit';
//리덕스 툴킷 모듈 임포트(계속 추가시킴...)
import room from '../modules/roomSlice';
import LoginSlice from '../modules/LoginSlice';

// import kakaoList from '../modules/kakaoSlice';
import kakaoList from '../modules/LoginSlice';
import chatcollect from '../modules/chatSlice';
import socket from '../modules/socketSlice';
import messages from '../modules/socketSlice';

//투두리스트
import todoSlice from '../modules/todoSlice';
import { saveState, loadState } from './localStorage';
//여기부터 지석이의 코드~
import chatSlice from '../modules/chatSlice';
const persistedState = loadState();

const store = configureStore({
  reducer: {
    room,
    LoginSlice,
    chatcollect,
    socket,
    messages,
    chatSlice,
    kakaoList,
    todos: todoSlice,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
