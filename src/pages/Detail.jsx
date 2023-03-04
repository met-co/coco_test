import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '../components/Layout/Layout';
import TopbarDetail from '../components/Topbar/TopbarDetail';
import styled from 'styled-components';
// import { OpenVidu } from 'openvidu-browser';
import { OpenVidu } from 'openvidu-browser';
import { useLocation } from 'react-router-dom';
// import VideoRecord from "../components/videoRecord/VideoRecord";
import VideoRecord from '../components/VideoRecord/VideoRecord';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import Chat from '../components/Chat/Chat';
import UserVideoComponent from '../components/VideoRecord/UserVideoComponent';
// import UserVideoComponent from "../components/VideoRecord/UserVideoComponent";
import {
  __postVideoToken,
  __postExitRoom,
  __getRoomNickname,
  __getRoom,
} from '../redux/modules/roomSlice';

import ReactPlayer from 'react-player';

export default function Detail() {
  //리프레시토큰//
  const reIssue = async () => {
    try {
      const refreshToken = localStorage.getItem('Refresh');
      const userEmail = localStorage.getItem('userEmail');

      const data = {
        headers: { Refresh: `${refreshToken}` },
        params: { userEmail: userEmail },
      };

      const repo = await axios.post(
        'https://cocodingding.shop/user/refresh',
        null,
        data
      );

      localStorage.setItem('Authorization', repo.headers.authorization);
      localStorage.setItem('Refresh', repo.headers.refresh);
    } catch (error) {
      console.error(error);
    }
  };

  setInterval(() => {
    reIssue();
  }, 30000 * 10);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { openviduRoomId } = useParams();
  console.log(openviduRoomId);

  //오픈비듀
  const [session, setSession] = useState(undefined);
  const [OV, setOV] = useState();
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [checkMyScreen, setCheckMyScreen] = useState('');
  const [isConnect, setIsConnect] = useState(false); // 커넥팅 체크
  // const [role,setRole] = useState(location.state.role) // 역할

  ////////////////////////////////////////////////////////////////////
  const nickname = localStorage.getItem('nickname');
  const roomData = useSelector((state) => state.room.roomInfo);
  const { roomNicknames } = useSelector((state) => state.room);
  // const accessToken = localStorage.getItem("Authorization");
  const [roomTitle, setRoomTitle] = useState(null);
  const [keyToken, setKeyToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [nicknames, setNickNames] = useState(null);
  const [videoOnOff, setVideoOnOff] = useState(true);
  // const [usernickname, setUsernickname] = useState(null);
  const [nowSubscriber, setNowSubscriber] = useState(null);

  // useEffect(() => {
  //   dispatch(__getRoomInfo(openviduRoomId));
  // }, []);

  // get한 데이터가 들어왔을 때 useState로 관리
  useEffect(() => {
    setRoomTitle(roomData.roomTitle);
    setKeyToken(roomData.enterRoomToken);
    setSessionId(roomData.sessionId);
  }, [roomData]);

  useEffect(() => {
    joinSession();
  }, [keyToken]);

  console.log(sessionId);
  console.log(keyToken);
  console.log(roomData);

  // 오픈 비듀
  const deleteSubscriber = (streamManagerId) => {
    try {
      setSubscribers((current) =>
        current.filter(
          (sub) => sub.stream.connection.connectionId !== streamManagerId
        )
      ); //e.stream.session.options.sessionId
      setCheckMyScreen(false);
    } catch (error) {}
  };

  // 브라우저 새로고침, 종료, 라우트 변경
  // const leaveload = async () => {
  //   let accessToken2 = localStorage.getItem("accessToken")
  //   try{
  //     if(role === "master"){
  //       setCheckMyScreen(false)
  //       const getOutRoomMaster = await axios.delete(`/room/${location.state.sessionId}`,{headers:{"authorization":accessToken2,"refreshtoken":refreshtoken}})
  //       leaveSession();
  //     }else if(role === "user"){
  //       setCheckMyScreen(false)
  //       const getOutRoomUser = await axios.post(`/room/${location.state.sessionId}/member`,{},{headers:{"authorization":accessToken2,"refreshtoken":refreshtoken}})
  //     }
  //   }catch(error){
  //   }
  // };

  // '나가기' 버튼 연결하기
  const leaveSession = () => {
    setSubscribers([]);
    setOV(undefined);
    setPublisher(null);
    setMainStreamManager(undefined);
    setKeyToken(null);
    dispatch(__postExitRoom(roomData.openviduRoomId));
    navigate(`/`);
  };

  const joinSession = () => {
    // openvidu 세션 생성하기
    // 1. openvidu 객체 생성
    const newOV = new OpenVidu();
    // 2. initSesison 생성
    const newsession = newOV.initSession();
    setSession(newsession);
    // JSON.parse(JSON.stringify(newSession))
    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(newOV);
    // 4. session에 connect하는 과정
    newsession.on('streamCreated', (e) => {
      const newSubscriber = newsession.subscribe(e.stream, undefined);
      setSubscribers(() => [...subscribers, newSubscriber]);
      setIsConnect(true);
    });
    // 1-2 session에서 disconnect한 사용자 삭제
    newsession.on('streamDestroyed', (e) => {
      if (e.stream.typeOfVideo === 'CUSTOM') {
        deleteSubscriber(e.stream.connection.connectionId);
      } else {
        // setCheckMyScreen(true);
      }
    });
    // 1-3 예외처리
    newsession.on('exception', (exception) => {});

    // 토큰값 가져오기

    // getToken().then((token) => {
    console.log('keytoken', keyToken);
    newsession
      .connect(keyToken, { clientData: nickname })
      .then(async () => {
        await newOV
          .getUserMedia({
            audioSource: false,
            videoSource: undefined,
            resolution: '380x240',
            frameRate: 10,
          })
          .then((mediaStream) => {
            let videoTrack = mediaStream.getVideoTracks()[0];

            let newPublisher = newOV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default audio input
              videoSource: videoTrack, // The source of video. If undefined default video input
              publishAudio: true, // Whether you want to start the publishing with audio unmuted or muted
              publishVideo: true, // Whether you want to start the publishing with video enabled or disabled
              // resolution: '1280x720',  // The resolution of your video
              // frameRate: 10,   // The frame rate of your video
              insertMode: 'APPEND', // How the video will be inserted according to targetElement
              mirror: true, // Whether to mirror your local video or not
            });
            // 4-b user media 객체 생성
            newPublisher.once('accessAllowed', () => {
              newsession.publish(newPublisher);
              setPublisher(newPublisher);
              console.log('pub', publisher);
            });

            // Obtain the current video device in use
            let devices = newOV.getDevices();
            let videoDevices = devices.filter(
              (device) => device.kind === 'videoinput'
            );
            let currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            setCurrentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            // Set the main video in the page to display our webcam and store our Publisher
            setMainStreamManager(publisher);
            // setPublisher = publisher;
          });
      })
      .catch((error) => {
        console.warn(
          'There was an error connecting to the session:',
          error.code,
          error.message
        );
      });
    // });
  };

  const getToken = async () => {
    await createSession();
    return await createToken();
  };

  const createSession = async () => {
    const sessionResponse = sessionId;
    return sessionResponse;
  };

  const createToken = async () => {
    const tokenResponse = keyToken;
    return tokenResponse; // The token
  };

  // 새로운 유저 받아오기
  // const getUserName = async () => {
  //   setNickNames(streamManager.stream.connection.data.split("%")[2])
  //   }

  // 유저 갱신 useEffect
  // useEffect(() => {
  //   getUserName()
  // },[publisher,subscribers]);

  // 브라우저 삭제 및 새로고침 시 leave
  // window.onbeforeunload=function(){
  //   leaveload()
  // }

  // 리프레시 토큰
  // const reIssue = async () => {
  //   try{
  //     let refreshtoken = localStorage.getItem("refreshtoken")
  //     let accessToken = localStorage.getItem("accessToken")
  //     const repo = await axios.get(`/member/reissue`,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
  //     localStorage.removeItem("accessToken");
  //     localStorage.setItem("accessToken",repo.headers.authorization)
  //   }catch(error){
  //   }
  // }

  // 리프레시 토큰 셋인터벌로 관리
  // setInterval(()=>{
  //   reIssue()
  // },60000 * 10)

  //참여자 비디오 컨트롤
  const onClickSubscriberVideoToggle = (connectionId) => {
    const subConnectionId = connectionId;
    setVideoOnOff(!videoOnOff);

    const subscriberFilter = subscribers.filter((sub) => {
      return sub.stream.connection.connectionId === subConnectionId;
    });
    setNowSubscriber(subscriberFilter);
  };

  //참여자 비디오 컨트롤
  useEffect(() => {
    console.log('onClickSubscriberVVVVideoToggle : ', videoOnOff);
    console.log('❗ nowSubscriber : ', nowSubscriber);
    if (nowSubscriber && nowSubscriber.length > 0) {
      const subscriber = nowSubscriber;
      subscriber[0].subscribeToVideo(videoOnOff);
    }
  }, [videoOnOff]);

  console.log(videoOnOff);

  useEffect(() => {}, [subscribers]);

  const player = useRef();
  const sendCurYoutubeTime = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   if (isPlaying) {
  //     sendCurYoutubeTime.current = setInterval(() => {
  //       dispatch(
  //         commonActions.setPlayInfo({
  //           curYoutubeTime: Math.ceil(player.current.getCurrentTime()),
  //         })
  //       );
  //     }, 1000);
  //   }
  //   return () => clearInterval(sendCurYoutubeTime.current);
  // }, [isPlaying]);

  return (
    <>
      <TopbarDetail />
      <Layout>
        <StTitle>
          <h1>Welcome ! {roomData.roomTitle} 방 입니다.</h1>
        </StTitle>
        <StContainer>
          {/* <StVideoContainer><UserVideoComponent /></StVideoContainer> */}
          <StVideoContainer>
            <StVideo>
              {/* <UserVideoComponent /> */}
              <div className='video-chat'>
                {session !== undefined ? (
                  <StRoomVideo>
                    {/* 메인스트림매니저가 있을 때 */}
                    {mainStreamManager !== undefined ? (
                      <StPub>
                        <VideoRecord
                          streamManager={mainStreamManager}
                          // role={location.state.role}
                          // nicknames={nicknames}
                        ></VideoRecord>
                      </StPub>
                    ) : null}

                    {/* 퍼블리셔가 있을 때 */}
                    {publisher !== null && (
                      <StSub>
                        <Stbox>
                          <div className='sub'>
                            {/* <StnickName>나</StnickName> */}
                            <VideoRecord
                              streamManager={publisher}
                              // role={location.state.role}
                            ></VideoRecord>
                            {publisher.length > 0 &&
                              publisher.map((sub, index) => (
                                <button
                                  onClick={() => {
                                    onClickSubscriberVideoToggle(
                                      sub.stream.connection.connectionId
                                    );
                                  }}
                                >
                                  hkjh
                                  {videoOnOff ? '비디오 on' : '비디오 off'}
                                </button>
                              ))}
                          </div>
                        </Stbox>

                        <Stbox>
                          {subscribers.length > 0
                            ? subscribers.map((sub, index) => (
                                <>
                                  <StnickName></StnickName>
                                  <button
                                    onClick={() => {
                                      onClickSubscriberVideoToggle(
                                        sub.stream.connection.connectionId
                                      );
                                    }}
                                  >
                                    hkjh
                                    {videoOnOff ? '비디오 on' : '비디오 off'}
                                  </button>
                                  <button>dfadfs</button>
                                  <VideoRecord
                                    streamManager={sub}
                                    key={index}
                                    // role={location.state.role}
                                  ></VideoRecord>
                                </>
                              ))
                            : null}
                        </Stbox>
                      </StSub>
                    )}
                  </StRoomVideo>
                ) : null}

                {/* <StPlayerContainer>
                  <ReactPlayer
                    url='https://youtu.be/HdIumpGExJk'
                    width='600px'
                    height='100%'
                    ref={player}
                    // playing={isPlaying}
                    // 특정시점부터 시작
                    config={{
                      youtube: {
                        playerVars: {
                          start: 1,
                        },
                      },
                    }}
                    // onStart={() => {
                    //   props.setIsStart(true);
                    // }}
                    // onEnded={endVideo}
                    // muted={isMuted}
                    volume={5}
                    controls
                  />
                </StPlayerContainer> */}
              </div>
            </StVideo>

            <StcontrolBox>
              <button onClick={leaveSession}>나가기</button>
              {subscribers.length > 0 &&
                subscribers?.map((sub, index) => (
                  <button
                    onClick={() => {
                      onClickSubscriberVideoToggle(
                        sub.stream.connection.connectionId
                      );
                    }}
                  >
                    hkjh
                    {videoOnOff ? '비디오 on' : '비디오 off'}
                  </button>
                ))}
            </StcontrolBox>
          </StVideoContainer>

          <StChatContainer>
            {/* 방id 파람값전달.. */}
            <Chat
              openviduRoomId={openviduRoomId}
              nickname={localStorage.getItem('userNickname')}
            />
          </StChatContainer>
        </StContainer>
      </Layout>
    </>
  );
}

const StTitle = styled.div`
  margin-top: 40px;
  & > button {
    border: 1px solid black;
    cursor: pointer;
  }
`;

const StContainer = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  width: 100%;
  height: 700px;
  margin-top: 50px;

  display: flex;
`;

const StVideoContainer = styled.div`
  flex-basis: 70%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StChatContainer = styled.div`
  flex-basis: 30%;
  width: 100%;
`;

const StPub = styled.div`
  /* width: 200px;
  height: 400px; */
`;

const StRoomVideo = styled.div`
  /* width: 500px;
  height: 500px; */
`;

const StSub = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 300px;
`;

const Stbox = styled.div`
  width: 800px;
  height: 200px;
  & > button {
    width: 200px;
    height: 30px;
  }
`;

const StnickName = styled.div`
  /* position: absolute;
  top: 300px;
  left: 10px;
  z-index: 1;
  color: #fff;
  padding: 6px 16px;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.5); */
`;

const StVideo = styled.div`
  height: 90%;
`;

const StcontrolBox = styled.div`
  background-color: aliceblue;
  height: 80px;
  & > button {
    width: 60px;
    height: 20px;
  }
`;

const StPlayerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  justify-content: center;
  /* display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 600px;
  height: 400px; */
  /* @media screen and (max-width: 1440px) {
    width: 758px;
    height: 426px;
  } */
`;
