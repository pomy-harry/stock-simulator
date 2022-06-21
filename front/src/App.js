import './App.css';
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main"
import MyPage from "./components/Layout/MyPage"
import KakaoLogin from "./components/Layout/KakaoLogin"
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import KakaoRedirectHandler from './components/Commons/KakaoRedirectHandler';

const App = () => {
  
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const loginModalOnClose = () => {
    setLoginModalOpen(false)
  }

  const loginModalOnClick = () => {
    setLoginModalOpen(true)
  }

  return (
    <>
      <BrowserRouter>

        <Header open={loginModalOpen} onClose={loginModalOnClose} onClick={loginModalOnClick}/>        
        
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/MyPage" element={<MyPage/>} />
          <Route exact path="/KakaoLogin/:code" element={<KakaoLogin/>} />
        </Routes>
      </BrowserRouter>      
    
    </>    
    
  );
};

export default App;
