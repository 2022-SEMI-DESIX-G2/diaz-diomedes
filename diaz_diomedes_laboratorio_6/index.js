
((Utils) => {
    const App = {
        htmlElements: {
            formulario: document.querySelector('#formulario'),
            valor: document.querySelector('#valorBusqueda'),
            tipo: document.querySelector('#tipoBusqueda'),
            pokeCards: document.querySelector('#pokeCards'),
        },
        init: () => {
            App.htmlElements.formulario.addEventListener('submit', App.handlers.pokemonFinderFormOnSubmit);

        },
        templates: {
            pokemonCard: ({ name, id, sprites }) => {
                return `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <img src="${sprites.front_default}" alt="${name}">
                        </div>
                    </div>
                `;
            },
        },
        handlers: {
            pokemonFinderFormOnSubmit: async (e) => {
                e.preventDefault();

                const query = App.htmlElements.valor.value;
                const searchType = App.htmlElements.tipo.value;
                try {
                    const pokemon = await Utils.getPokemon({
                        query,
                        searchType,
                    });
                    App.htmlElements.pokeCards.innerHTML = App.templates.pokemonCard(pokemon);
                } catch (error) {
                    App.htmlElements.pokeCards.innerHTML = `<h1>${error}</h1>`;
                }
            },
        },
    }

    App.init();



})(document.Utils);
