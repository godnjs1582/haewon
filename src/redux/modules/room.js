import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
// import { apis } from "../../shared/api";

const CREATE_ROOM = "CREATE_ROOM";
const GET_ROOM = "GET_ROOM";

const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const getRoom = createAction(GET_ROOM, (room_data) => ({room_data}));

const initialState = {

  };

//   const idDupCheckDB=(user_name)=>{
//     return function(dispatch,getState,{history}){
//        axios
//       .get(`http://spt-prac.shop/user/idCheck/${user_name}`)
//       .then((response)=>{
//         if(response.data.result===false){
//           window.alert("사용가능한 아이디입니다.");
//         }else{
//           window.alert("사용불가능한 아이디입니다.");
//         }
//       })
//       .catch((err)=>{
//         console.log(("err확인"+err))
//         window.alert("서버 오류입니다.")
//       })
//     }
//   }
// 방 링크 생성하기
  const createRoomDB = (topic,categoryName,prosName,consName,speechCnt,speechMiniute) => {
    return function (dispatch, getState, { history }) {
      const state = getState();
        axios
        .post("http://3.37.89.93/debate/link",{
            "topic":topic,
            "categoryName":categoryName,
            "prosName":prosName ,
            "consName":consName,
            "speechCnt":speechCnt,git init
            "speechMiniute":speechMiniute})
        .then(
          (res) =>{
            const roomId=res.data.roomId;
            console.log(roomId);
            history.push(`/debate/${roomId}`)
          }
        )
        .catch((error) => {
            console.log(error);
        });
    };
  };
  const getRoomDB = (roomId) => {
    return function (dispatch, getState, { history }) {
      const state = getState();
        axios
        .get(`http://3.37.89.93/debate/${roomId}`)
        .then(
          (res) =>{
           const roomData=res.data
          }

        )
        .catch((error) => {
            console.log(error);
        });
    };
  };
  export default handleActions(
    {
      [CREATE_ROOM]: (state, action) =>
        produce(state, (draft) => {
          console.log(action.payload.post);
        }),
      [GET_ROOM]: (state, action) =>
        produce(state, (draft) => {
          console.log(action.payload.post);
        }),
    },
    initialState
  );
  const ActionCreators = {
    createRoomDB,
    getRoomDB,
  };



  export { ActionCreators };