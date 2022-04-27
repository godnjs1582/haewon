import React from 'react'
import styled from 'styled-components';
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { ActionCreators as RoomActions} from "./redux/modules/room";
import IconButton from "./elements/IconButton";


const CreateRoom = () => {

    const history =useHistory();
    const dispatch = useDispatch();
    //방 생성 키를 받을떄 전달 해 줄 6가지 데이터들
    const [topic,setTopic]=useState('');//1) 주제 입력
    const [categoryName,setCategoryName]=useState('');//2) 카테고리 입력
    const [prosName,setProsName]=useState('');//3) 찬성측 입력
    const [consName,setConsName]=useState('');//4) 반대측 입력
    const [speechCnt,setSpeechCnt]=useState('');//5) 1회 발언 시간, 숫자만 입력가능하게 세팅할 것
    const [speechMiniute,setSpeechMiniute]=useState('');//6) 발언 횟수,숫자만 입력가능하게 세팅할 것

    const goDebate=()=>{
        console.log("잘 실행되니?");
        dispatch(RoomActions.createRoomDB(topic,categoryName,prosName,consName,speechCnt,speechMiniute));

    }

    React.useEffect(() => {
        console.log("제바,ㄹ되라")
        return(
            <></>
        )
      }, []);

  return (
      <>
        <ModalBg/>
            <Wrapper>
                <div style={{display:"flex", alignItems:"center"}}>
                    <IconButton cancle color="#d3d3d3" size="20"/>
                    <div style={{marginLeft:"50%", transform:"translateX(-65%)"}}>
                        <h1>토론방 생성하기</h1>
                    </div>
                </div>


                    <h3>토론주제</h3>

        <p>카테고리선택</p>
        <CateInput onChange={(e) => {setCategoryName(e.target.value)}}/>

        <p>토론주제를 입력해주세요</p>
        <TitleInput onChange={(e) => {setTopic(e.target.value)}}/>

        <p>찬성측 토론 아아디</p>
        <input onChange={(e) => {setProsName(e.target.value)}}/>

        <p>반대측 토론 아아디</p>
        <input onChange={(e) => {setConsName(e.target.value)}}/>

        <p>토론자 발언 시간</p>
        <input onChange={(e) => {setSpeechCnt(e.target.value)}}/>

        <p>토론자 발언 횟수</p>
        <input onChange={(e) => {setSpeechMiniute(e.target.value)}}/>
        <button onClick={goDebate}>토론방 생성</button>
    </Wrapper>
      </>
  )
}

const Wrapper=styled.div`
margin:0 auto;
background:white;
border:1px solid #d3d3d3;
color:#404040;
width:500px;
padding:20px 20px;
border-radius:20px;
z-index:100;
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
    h1{
        font-size:18px;
    }
    h3{
        font-size:14px;
    }
`
const TitleBox=styled.div`
width:auto;
padding:10px;
background:#d3dede;
border-radius:10px;
color:black;
`
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
`;
const CateInput=styled.input`
width:auto;
padding:10px;
background: #ECECEC;
color:#404040;
border:none;
border-radius:10px;
`
const TitleInput=styled.input`
width:100%;
padding:10px;
background: #ECECEC;
color:#404040;
border:none;
border-radius:10px;
`


export default CreateRoom;

