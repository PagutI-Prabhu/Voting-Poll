import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreatePolls = () => {

  let [state, setState] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: ''
  });

  let [showMore, setShowMore] = useState(false);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  let sendData = async (e) => {
    e.preventDefault();

    if (
      !state.question.trim() ||
      !state.option1.trim() ||
      !state.option2.trim() ||
      (showMore && (!state.option3.trim() || !state.option4.trim()))
    ) {
      alert("Please fill all required fields");
      return;
    }

      
    try {
      let payload = {
        question: state.question,
        options: [
          { text: state.option1, votes: 0 },
          { text: state.option2, votes: 0 },
        ]
      };

      let { data } = await axios.post('http://localhost:5000/polls', payload);
      console.log(data);

    } catch (err) {
      console.log(err);
    }
  }


  let navigate = useNavigate();

  return (
    <div className='createPolls'>

      <form onSubmit={sendData}>
        <h3>Questions* 🔍</h3>
        <input onChange={handleChange} type="text" name='question' placeholder='Enter your question' />

        <h3>Options [Min 2]*</h3>
        <input onChange={handleChange} type="text" name='option1' placeholder='Option 1' />
        <input onChange={handleChange} type="text" name='option2' placeholder='Option 2' /> <br />
      
        {showMore && (
          <>
            <input onChange={handleChange} type="text" name='option3' placeholder='Option 3' /> <br />
            <input onChange={handleChange} type="text" name='option4' placeholder='Option 4' /> <br />
          </>
        )}

        {/* <button type=""className='addOptionBtn'>+Add Option</button> */}
        <button type="submit" className='submitBtn' onClick={()=>navigate('/ListPolls')}>Create Poll</button>
      </form>
    </div>
  )
}

export default CreatePolls