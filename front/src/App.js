import './App.css';
import Header from "./layout/Header/Header";
import Main from "./layout/Main/Main"
import MyPage from "./layout/MyPage/MyPage"
import KakaoLogin from "./features/KakaoLogin/KakaoLogin"
import KakaoJoin from "./features/KakaoLogin/KakaoJoin"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <>
      <BrowserRouter>

        <Header />
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/MyPage" element={<MyPage/>} />
          <Route exact path="/KakaoLogin/:code" element={<KakaoLogin/>} />
          <Route exact path="/KakaoJoin/:code" element={<KakaoJoin/>} />
        </Routes>
      </BrowserRouter>
    </>    
  );
};

export default App;
