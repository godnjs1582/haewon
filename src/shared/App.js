import Main from "../Main";
import CreateRoom from "../CreateRoom";
import DebateRoom from "../DebateRoom";
import { Route} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
// import Video from "../Components/Video";
import './App.css';
import React from "react";

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        {/* <Route path ="/video" exact component={Video}/> */}
        <Route path ="/" exact component={Main}/>
        <Route path="/room" exact component={CreateRoom}/>
        <Route path="/debate/:roomid" exact component={DebateRoom}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
