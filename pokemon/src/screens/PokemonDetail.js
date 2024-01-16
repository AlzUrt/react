import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du Pokémon');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return <div><Header /><div>Chargement en cours...</div></div>;
  }

  return (
    <div>
      <div>
        <Header />
      </div>
    <div className="page-container">  
        <h1 className="pokemon-name">{name}</h1>
        <img className="pokemon-image" src={pokemonData.sprites.other.showdown.front_default} alt={name} />
        <div className="types">Types : {pokemonData.types.map((type) => type.type.name).join(', ')}</div>
        <div className="pokemon-info">Poids : {pokemonData.weight / 10} kg</div>
        <div className="pokemon-info">Taille : {pokemonData.height / 10} m</div>
        <div className="abilities">Capacités : {pokemonData.abilities.map((abilitie) => abilitie.ability.name).join(', ')}</div>
      </div>
    </div>
  );
};

export default PokemonDetail;
