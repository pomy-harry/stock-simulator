import { useState } from "react";
import Header from "./components/Layout/Header";

function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Header show={show} onOpen={handleShow} onClose={handleClose}/>
    </>

  )
}

export default App;
