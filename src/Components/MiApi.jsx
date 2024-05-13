import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export const Pokemones = ({ pokemones, setPokemones, filteredPokemones }) => {
    const api_url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

    const fetchData = async () => {
        try {
            const response = await axios.get(api_url);
            const data = response.data.results;

            const promises = data.map(async pokemon => {
                const res = await axios.get(pokemon.url);
                const pokemonData = res.data;
                return {
                    name: pokemonData.name,
                    sprite: pokemonData.sprites.front_default,
                    types: pokemonData.types.map(type => type.type.name),
                };
            });

            const pokemones = await Promise.all(promises);
            setPokemones(pokemones);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="row">
                {filteredPokemones.length ? (
                    filteredPokemones.map((pokemon, key) => (
                        <div key={key} className="col">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={pokemon.sprite} />
                                <Card.Body>
                                    <Card.Title>{pokemon.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Types:</strong> {pokemon.types.join(', ')}
                                    </Card.Text> 
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : pokemones.length ? (
                    pokemones.map((pokemon, key) => (
                        <div key={key} className="col">
                            <Card style={{ width: '20rem' }}>
                                <Card.Img variant="top" src={pokemon.sprite} />
                                <Card.Body>
                                    <Card.Title>{pokemon.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Types:</strong> {pokemon.types.join(', ')}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <h1>Cargando...</h1>
                )}
            </div>
        </>
    );
};

Pokemones.propTypes = {
    pokemones: PropTypes.array.isRequired,
    setPokemones: PropTypes.func.isRequired,
    filteredPokemones: PropTypes.array.isRequired,
};

