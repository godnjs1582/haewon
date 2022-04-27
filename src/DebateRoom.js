import React,{useRef,useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import SimplePeer from 'simple-peer';
import './shared/App.css';
import IconButton from "./elements/IconButton";
import { useSelector,useDispatch } from 'react-redux';
import { ActionCreators as RoomActions } from './redux/modules/room';
import * as SockJS from 'sockjs-client';
import Stomp from "stompjs";
import { over } from "stompjs";
// import * as StompJs from '@stomp/stompjs';

const DebateRoom = (props) => {
    const dispatch=useDispatch();
    const [isClose, setClose] = React.useState(false);
    const location = useLocation();
    const roomId=location.pathname.split("/debate/")[1];
    const ConnectionStatus = new Array("OFFERING","RECEIVING","CONNECTED")
    //현재의 연결 상태

    const videoSelf = useRef(null); //나의 비디오(방장임)
    const videoCaller = useRef(null);//들어온 사람(방장 이외의 사람)
    const [connectionStatus, setConnectionStatus] = useState(null);// 연결 상태를 확인

    const [simplePeer, setSimplePeer] = useState();
    const [stream, setStream] = useState();
    const [isInitiator,setIsInitiator]=useState(false);
    const linkToDebate=`http://haewonreactweek3.s3-website.ap-northeast-2.amazonaws.com/debate/${roomId}`;
    const [offerSignal, setOfferSignal] = useState("");

    // var webSocketConnection = new WebSocket(`ws://3.37.89.93/socket`);
    // console.log(webSocketConnection);

  //   function send(message) {
  //     conn.send(JSON.stringify(message));
  // }
  const webSocketConnection = `ws://3.37.89.93/socket`;
  let ws = useRef(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketConnection);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketConnection);
        // setSocketConnected(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketConnection);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketConnection);
        console.log(error);
      };
      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        // setItems((prevItems) => [...prevItems, data]);
      };
    }
    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, []);

//   const sock = new SockJS("http://3.37.89.93/ws-stomp");
//   const stompClient = Stomp.over(sock);
//     stompClient.connect({}, (frame) => {
//     console.log("Connected: ", frame);
//     // stompClient.subscribe("/api/status/compression-status", (message) => {
//     //     console.log(message);
//     // });
// })

  // const created = () => {
  //   try {
  //     ws.connect(
  //       // { Authorization: token },
  //       (frame) => {
  //         ws.subscribe(
  //           `/sub/chat/room/${roomId}`,
  //           (message) => {
  //             console.log(message);
  //             return;
  //             let recv = JSON.parse(message.body);
  //             if (recv.type === "TALK") {
  //               dispatch(chatActions.getChat(recv));
  //               chattingRef.current.scrollIntoView({ behavior: "smooth" });
  //             } else if (recv.type === "ENTER") {
  //               dispatch(chatActions.getChat(recv));
  //               dispatch(subscribersActions.getSubscribers(recv));
  //               chattingRef.current.scrollIntoView({ behavior: "smooth" });
  //             } else if (recv.type === "YOUTUBEURL") {
  //               dispatch(youtubeActions.youtubeUrl(recv.message));
  //               setWorkOut(true);
  //             } else if (recv.type === "YOUTUBEON") {
  //               setWorkOut(true);
  //               dispatch(youtubeActions.youtubeOn(true));
  //             } else if (recv.type === "YOUTUBEPAUSE") {
  //               dispatch(youtubeActions.youtubeOn(false));
  //               setWorkOut(false);
  //             } else if (recv.type === "YOUTUBESTOP") {
  //               setWorkOut(false);
  //             } else if (recv.type === "QUIT") {
  //               dispatch(chatActions.getChat(recv));
  //               dispatch(subscribersActions.leaveSubscribers(recv));
  //             }
  //           },
  //           // { Authorization: token }
  //         );
  //       },
  //       (error) => {
  //         console.log("서버연결 실패", error);
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

    // console.log(linkToDebate);
    // const client = new StompJs.Client({
    //     brokerURL: '/api/ws',
    //     connectHeaders: {
    //       login: 'user',
    //       passcode: 'password',
    //     },
    //     debug: function (str) {
    //       console.log(str);
    //     },
    //     reconnectDelay: 5000, //자동 재 연결
    //     heartbeatIncoming: 4000,
    //     heartbeatOutgoing: 4000,
    //   });
    //   client.onConnect = function (frame) {
    //       //여기에서 시그널과 데이터를 보내야 함
    //       console.log("연결이 완료되었습니다",frame)
    // };

    // client.onStompError = function (frame) {
    //   console.log('Broker reported error: ' + frame.headers['message']);
    //   console.log('Additional details: ' + frame.body);
    // };

    // client.activate();
    // 송 수신 관련 아직은 안씀

    // useEffect(() => {
    //     webSocketConnection.onmessage = (message) => {
    //       const payload = JSON.parse(message.data);
    //       if (payload?.type === "offer") {
    //         sets(payload);
    //         setConnectionStatus(ConnectionStatus.RECEIVING);
    //       } else if (payload?.type === "answer") simplePeer?.signal(payload);
    //     };
    //   }, [simplePeer]);



    // useEffect(()=>{
    //   dispatch(RoomActions.getRoomDB(roomId))
    //   var constraints = { audio: true, video: { width: 350, height: 500 } };
    //   navigator.mediaDevices.getUserMedia(constraints)
    //   .then(function(mediaStream) {
    //     const video = videoSelf.current;
    //     video.srcObject = mediaStream;
    //     video.play();
    // }.catch(function(err) { console.log(err.name + ": " + err.message);});
    //         const sp = new SimplePeer({
    //             trickle: false,
    //             initiator: isInitiator,
    //             stream: mediaStream,
    //           });
    //           console.log(sp);
    //           sp.on("signal", (data) => sock.send(JSON.stringify(data)));
    //           sp.on("connect", () => setConnectionStatus(ConnectionStatus.CONNECTED));
    //           sp.on("stream", (stream) => {
    //             const video = videoCaller.current;
    //             video.srcObject = stream;
    //             video.play();
    //           });
    //           setSimplePeer(sp);
    //         });

    // },[]);

    useEffect(()=>{
      navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })// 유저의 미디어를 가져옴
    .then((mediaStream) => {
      const video = videoSelf.current;
      video.srcObject = mediaStream;
      video.play();

      const sp = new SimplePeer({ // peer 객체 생성
        trickle: false,
        initiator: isInitiator, // 시작한 사람이 아님
        stream: mediaStream,
      });
      console.log(sp);
      // if (isInitiator) setConnectionStatus(ConnectionStatus[0]);
      // else offer && sp.signal(offer);

      sp.on("signal", (data) => webSocketConnection.send(JSON.stringify(data)));
      sp.on("connect", () => setConnectionStatus(ConnectionStatus[2]));
      sp.on("stream", (stream) => {
        const video = videoCaller.current;
        video.srcObject = stream;
        video.play();
      });
      setSimplePeer(sp);
    });

    },[])

  return (
    <Wrapper>
      {!isClose&&
      <DetailModal>
        <div style={{display:"flex", alignItems:"center"}}>
          <IconButton cancle color="#d3d3d3" size="20" onClick={setClose(true)}/>
          <Text>토론방 생성 완료</Text>
        </div>
        <Text>판정단에게 링크를 공유해보세요</Text>
        <Text>{linkToDebate}</Text>
      </DetailModal>
      }
        <h1>토론방 주제가 들어갈 공간입니다</h1>
        <button>토론 시작하기</button>
        <VideoContainer>
            <VideoBox>
              <video playsInline muted ref={videoSelf} autoPlay className="MyVideoBox"/>
            </VideoBox>
            <VideoBox>
              <video playsInline muted ref={videoCaller} autoPlay className="YourVideoBox"/>
            </VideoBox>
        </VideoContainer>
    </Wrapper>
  )
}
const Wrapper=styled.div`
margin:0 auto;
background:lightgrey;
width:800px;
padding:20px;
border-radius:20px;
box-sizing:border-box;
`
const VideoContainer=styled.div`
display:flex;
justify-content:space-between;
`

const VideoBox=styled.div`
width:350px;
height:500px;
padding:20px;
background:transparent;
padding:10px;
box-sizing:border-box;
border-radius:20px
`
const DetailModal = styled.div`
  max-width: 600px;
  width: 350px;
  padding:20px;
  box-sizing:border-box;
  background: white;
  height: 200px;
  border-radius:20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction:column;
  z-index: 5;
`;

const Text=styled.div`
width:100%;
// border:1px solid red;
font-size:12p4;
padding:3px 0px;

`


export default DebateRoom;