const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            id: data.id,
            image: data.sprites.front_default,
            type: data.types.map((type) => type.type.name).join(', '),
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <div class="pokemon">
            <img src="${pokeman.image}" alt="${pokeman.name}"/>
            <h3>${pokeman.id}. ${pokeman.name}</h3>
            <p>Type: ${pokeman.type}</p>
        </div>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
