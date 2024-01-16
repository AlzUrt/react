import './App.css';
import AllPokemon from './screens/AllPokemon';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonDetail from './screens/PokemonDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:name" element={<PokemonDetail />} />
          <Route path="/" element={<AllPokemon />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
