// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';


function MovieCrud() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);



  useEffect(() => {
          axios.get('http://localhost:3000/movies')
        .then(response => setMovies(response.data));
});

  useEffect(() => {
    axios.get('http://localhost:3000/favourites')
    .then(response => setFavorites(response.data));
},[]);

  const  addToFavorites =  (movie) => {
     axios.post('http://localhost:3000/favourites', movie);
    setFavorites(prevFavorites => [...prevFavorites, movie]);
  };

  const removeFromFavorites = (favoriteid) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== favoriteid);
    setFavorites(updatedFavorites);
  };

  const handleDeleteFavorite = async (favoriteid) => {
    removeFromFavorites(favoriteid);
     axios.delete(`http://localhost:3000/favourites/${favoriteid}`);    
  };

 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  const openEditModal = (movieId) => {
    setSelectedMovieId(movieId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedMovieId(null);
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    console.log('Movie edited successfully!');
  };

  return (
    <div>
  <h1>Movies</h1>
  <h3 >
  <button onClick={openModal}>Add Movie</button>
  <AddMovie isOpen={isModalOpen} onClose={closeModal} />
  </h3>

    {movies.map(movie=> (
    <Card style={{ width: '18rem' , alignSelf:'flex-start', marginLeft: '20px', marginTop:'20px'}}>
     <h1 key={movie.id}></h1>
    <Card.Img variant="top" src={movie.posterPath} />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>
       {movie.releaseDate}
      </Card.Text>
      <Button variant="primary" onClick={() => addToFavorites(movie)}>Add Favorite</Button>
      <br/>
      <button onClick={() => openEditModal(movie.id)}>Edit Movie</button>
      <EditMovie
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        movieId={selectedMovieId}
        onEditSuccess={handleEditSuccess}
      />
      <br/>
      <br/>
    </Card.Body>
  </Card>
    ))}
                                         
      <h1>Favorites</h1>
    {favorites.map((favorite) => (
    <Card style={{ width: '18rem' , marginLeft:'400px' , marginTop:'20px'}}>
    <Card.Img variant="top" src={favorite.posterPath} />
    <Card.Body>
      <Card.Title>{favorite.title}</Card.Title>
      <Card.Text>
      {favorite.releaseDate}
      </Card.Text>
      {/* <button onClick={() => handleDeleteFavorite(favorite.id)}>Remove from Favorites</button> */}
      <Button variant="primary" onClick={() => handleDeleteFavorite(favorite.id)}>Delete Favorite</Button>
    </Card.Body>   
  </Card>
    ))}
    </div>
  );
}

export default MovieCrud;
