import './App.css';
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main"
import MyPage from "./components/Layout/MyPage"
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";


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
        </Routes>
      </BrowserRouter>      
    
    </>    
    
  );
};

export default App;
