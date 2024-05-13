import { useState } from 'react';
import './App.css';
import { Pokemones } from './Components/MiApi';
import { Buscador } from './Components/Buscador';

function App() {
    const [pokemones, setPokemones] = useState([]);
    const [filteredPokemones, setFilteredPokemones] = useState([]);

	const handleSort = (pokemonesFiltered) => {
		setFilteredPokemones(pokemonesFiltered);
	};

    return (
        <>
		<div class="navbar bg-danger navbar-expand-lg mt-4">
			<div class="container">
				<a href="#" class="navbar-brand fs-3">POKEDEX</a>
				<Buscador
                pokemones={pokemones}
                setFilteredPokemones={handleSort}/>

			</div>
		</div>
		<section class="testimonial bg-light text-secondary p-5">
			<div class="container">
				<Pokemones
				pokemones={pokemones}
                setPokemones={setPokemones}
                filteredPokemones={filteredPokemones}
            	/>
			</div>
		</section>
            
        </>
    );
}

export default App;
