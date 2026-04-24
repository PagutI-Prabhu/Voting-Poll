import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="main_container">
      <h2>Voting Polls</h2>

    
      <div className="Polls">
        <button onClick={() => navigate("/ListPolls")}>Show Polls</button>
        <button onClick={() => navigate("/CreatePolls")}>Create Polls</button>

      </div>

    </div>
  );
};

export default Home;
