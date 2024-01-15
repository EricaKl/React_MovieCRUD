// EditMovieModal.js
import React, { useState, useEffect } from 'react';
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

const EditMovie = ({ isOpen, onClose, movieId, onEditSuccess }) => {
    debugger;
    const [title, setTitle] = useState('');
    const [releaseDate, setreleaseDate] = useState('');
    const [posterPath, setposterPath] = useState('');

  useEffect(() => {
    // Fetch the movie data based on the provided movieId
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${movieId}`);
        const movieData = response.data;
        setTitle(movieData.title);
        setreleaseDate(movieData.releaseDate);
        setposterPath(movieData.posterPath);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    if (isOpen) {
      fetchMovieData();
    }
  }, [isOpen, movieId]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
   
      await axios.put(`http://localhost:3000/movies/${movieId}`, { title, releaseDate, posterPath });
      onEditSuccess(); 
      onClose(); 
    } catch (error) {
      console.error('Error editing movie:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <FormContainer>
        <h2>Edit Movie</h2>
        <Form onSubmit={handleEdit}>
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
          <button type="submit">Save Changes</button>
        </Form>
      </FormContainer>
    </Modal>
  );
};

export default EditMovie;
