import { Route, Routes } from "react-router";
import "./App.css";
import Advertisement from "./Screens/Advertisement";
import Compose from "./Screens/Compose";
import Inbox from "./Screens/Inbox";
import Login from "./Screens/Login";
import Saved from "./Screens/Saved";
import Sent from "./Screens/Sent";
import Signin from "./Screens/Signin";
function App() {
  return (
    <div className="App">
      {/* <SideNav> */}
      <Routes>
        <Route path="/" element={<Advertisement />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inbox" element={<Inbox/>}/>
        <Route path="/sent" element={<Sent/>}/>
        <Route path="/compose" element={<Compose/>}/>
        <Route path="/saved" element={<Saved/>}/>
      </Routes>
      {/* </SideNav> */}
    </div>
  );
}

export default App;
