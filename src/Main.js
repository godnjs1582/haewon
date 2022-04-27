import React from 'react'
import { useHistory } from "react-router-dom";

const Main = () => {
    const history = useHistory();
    const goCreateRoom=()=>{
        history.push("/room");
        window.location.reload();
    }
  return (
    <>
        <div>메인화면입니다</div>
        <button onClick={goCreateRoom}>클릭시 방생성 페이지 이동</button>
    </>

  )
}

export default Main