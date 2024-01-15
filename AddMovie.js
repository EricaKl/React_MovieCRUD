// src/components/AddMovie.js
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

function AddMovie({isOpen, onClose}) {
  const [title, setTitle] = useState('');
  const [releaseDate, setreleaseDate] = useState('');
  const [posterPath, setposterPath] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const newMovie = {
      title: title,
      releaseDate : releaseDate,
      posterPath : posterPath
   
    };

    await axios.post('http://localhost:3000/movies', newMovie);   
    setTitle('');
    setreleaseDate('');
    setposterPath('');
  
  };

  return (
    <div>  
      {/* <h2>Add New Movie</h2> */}
      <Modal isOpen={isOpen} onRequestClose={onClose}>
      <FormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <table>
            <tr>
              <td> <label>Title:</label></td>
              <td>  <input 
                      type="text" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      required /> 
              </td>
            </tr>
            <br/>
            <tr>
              <td><label>Release date:</label></td>
              <td>  <input 
                     type="text" 
                     value={releaseDate} 
                     onChange={(e) => setreleaseDate(e.target.value)} 
                     required />
              </td>
            </tr>
            <br/>
            <tr>
              <td> <label>Poster Path:</label></td>
              <td> <input 
                    type="text" 
                    value={posterPath} 
                    onChange={(e) => setposterPath(e.target.value)} 
                    required />
              </td>
            </tr>
            <br/>
          </table>
        </div>
        <button type="submit">Add Movie</button>
      </form>
      </FormContainer>
      </Modal>
    </div>
  );
}

export default AddMovie;
