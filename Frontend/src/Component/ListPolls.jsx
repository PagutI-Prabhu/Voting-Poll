import React, { useEffect, useState } from "react";
import axios from "axios";

const ListPolls = () => {
  const [state, setState] = useState([]);

  const fetchApi = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/polls");
      setState(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      await axios.post(`http://localhost:5000/polls/${pollId}/vote`, {
        pollId,
        optionIndex,
      });
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pollId) => {
    try {
      await axios.delete(`http://localhost:5000/polls/${pollId}`);
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="ListPolls">
      <h2>All Polls</h2>

      <div className="cards_container">
        {state.length === 0 ? (
          <h2>No Poll Found Create one !</h2>
        ) : (
          state.map(({ id, question, options }) => {
            const totalVotes =
              options?.reduce((sum, opt) => sum + opt.votes, 0) || 0;

            return (
              <div key={id} className="cards">
                <button className="delete" onClick={() => handleDelete(id)}>
                  Delete Poll
                </button>

                <h3>{question}</h3>

                {options.map((opt, index) => {
                  const percent =
                    totalVotes === 0 ? 0 : (opt.votes / totalVotes) * 100;

                  return (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <p>
                        {opt.text.text} {/* 🔥 FIX HERE */}
                        <button
                          className="voteBtn"
                          onClick={() => handleVote(id, index)}
                        >
                          Vote
                        </button>
                      </p>

                      <p>
                        {opt.votes} votes ({percent.toFixed(1)}%)
                      </p>

                      <div className="Bar">
                        <div
                          className="Bar_styling"
                          style={{ width: percent + "%" }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListPolls;