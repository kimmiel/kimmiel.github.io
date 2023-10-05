//1前端第一步安装之後 ch n16 Navigate用来redirect到其他page
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext"; //ch n16 一直和const { user } = useAuthContext();是一套的
import NewHome from "./pages/NewHome"; //從pages/Home拿Home這function

import  Streaming  from "./pages/streaming";
import  Upcomeing  from "./pages/upcomeing";
import  StreamDatas  from "./pages/streamDatas"
import Navbar from "./components/Navbar.js";
import Signup from "./pages/Signup"; //ch n9 滙入Signup function
import Login from "./pages/login"; //ch n9 滙入login function
function App() {
  const { user } = useAuthContext(); //ch n16

  return (
    <div className="App">
      {/*2 先採用BrowserRouter,在Switch中設定Route，利用Route設定哪個路徑會對應到哪個component */}
      <BrowserRouter>
        {/* <Navbar /> */}

        <Routes>
          {/*home component being rendered for the root  path 站址後面是/就會連到下面*/}
          {/* ch 16n 條件?ture:false 如果没有login不能到home page(從http://localhost:3000/自動变成http://localhost:3000/login)*/}
          <Route
            path="/"
            element={user ? <NewHome /> : <Navigate to="/login" />}
        
          />
          <Route
            path="/streaming"
            element={user ? <Streaming/> : <Navigate to="/login" />}

          />
          <Route
            path="/NewHome"
            element={user ? <NewHome /> : <Navigate to="/login" />}
        
          />
          <Route
            path="/streamDatas"
            element={user ? <StreamDatas /> : <Navigate to="/login" />}
          />

          {/* ch n9 在加上login和signup的网址  ch 16n  如果login了不能到Login 和 Signup page,会直接連回home page**/}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//安裝react router dom 令app可以添加不同的頁面
