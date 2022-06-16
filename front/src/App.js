import './App.css';
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main"
import MyPage from "./components/Layout/MyPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => {

  return (
    <>
      <BrowserRouter>

        <Header />
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/MyPage" element={<MyPage/>} />
        </Routes>
      </BrowserRouter>
    </>    
  );
};

export default App;
