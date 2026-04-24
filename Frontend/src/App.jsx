import "./App.css";
import Home from "./Component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPolls from "./Component/ListPolls";
import CreatePolls from "./Component/CreatePolls";

function App() {
  return (
    <BrowserRouter>
    <Home/>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/ListPolls" element={<ListPolls />} />
        <Route path="/CreatePolls" element={<CreatePolls />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
