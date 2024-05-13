import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Buscador = ({ pokemones, setFilteredPokemones }) => {
	const handleSort = (typeSort) => {
		if (typeSort === 'asc') {
			const pokemonesSorted = [...pokemones].sort((pokemon_1, pokemon_2) =>
				pokemon_1.name.localeCompare(pokemon_2.name)
			);

			setFilteredPokemones(pokemonesSorted);
		} else {
			const pokemonesSorted = [...pokemones].sort((pokemon_1, pokemon_2) =>
				pokemon_2.name.localeCompare(pokemon_1.name)
			);

			setFilteredPokemones(pokemonesSorted);
		}
	};

	const handleChange = (event) => {
		const value = event.target.value.toLowerCase().trim(); 

		const dataFiltered = pokemones.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(value) 
		);

		setFilteredPokemones(dataFiltered);
	};

	return (
		<>
			<div className="row">
				<div className="col-8">
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon1"></InputGroup.Text>
						<Form.Control
							onChange={handleChange}
							type="search"
							placeholder="Buscador.."
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
				</div>
				<div className="col-4">
					<Form.Select
						aria-label="Default select example"
						onChange={(event) => handleSort(event.target.value)}
					>
						<option defaultChecked>Filtro</option>
						<option value="asc">A-Z</option>
						<option value="desc">Z-A</option>
					</Form.Select>
				</div>
			</div>
		</>
	);
};

Buscador.propTypes = {
	pokemones: PropTypes.array.isRequired,
	setFilteredPokemones: PropTypes.func.isRequired,
};

export default Buscador;
