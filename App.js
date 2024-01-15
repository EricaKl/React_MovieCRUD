import logo from './logo.svg';
import './App.css';
import MovieCrud from './Components/MovieCrud';
import AddMovie from './Components/AddMovie';

function App() {
  return (
    <div className="App">
    <h1>Movie App</h1>             
    <MovieCrud />
    {/* <AddMovie />            */}
  </div>
  );
}

export default App;
