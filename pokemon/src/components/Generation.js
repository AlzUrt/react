import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../App.css';

const Generation = ({ generation, limit }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(limit);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchMorePokemon = async () => {
      try {
        if (isInitialLoad) {
          setIsInitialLoad(false);
          return;
        }

        const speciesList = generation.pokemon_species.slice(
          visiblePokemonCount - 5,
          visiblePokemonCount
        );

        const pokemonDataList = await Promise.all(
          speciesList.map(async (species) => {
            const response = await fetch(species.url);
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données du Pokémon');
            }
            const pokemonData = await response.json();
            return pokemonData;
          })
        );

        setPokemonList((prevPokemonList) => [...prevPokemonList, ...pokemonDataList]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMorePokemon();
  }, [generation, visiblePokemonCount, isInitialLoad]);

  const handleLoadMoreClick = () => {
    setVisiblePokemonCount((prevVisiblePokemonCount) => prevVisiblePokemonCount + 5);
  };

  return (
    <div className="generation">
      <h2>{generation.main_region.name}</h2>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon, index) => (
          <Card key={index} pokemon={pokemon} />
        ))}
      </div>
      <button onClick={handleLoadMoreClick}>Charger 5 Pokémon de plus</button>
    </div>
  );
};

export default Generation;
