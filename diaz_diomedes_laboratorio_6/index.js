((Utils) => {
    const App = {
        htmlElements: {
            formulario: document.querySelector('#formulario'),
            valor: document.querySelector('#valorBusqueda'),
            tipo: document.querySelector('#tipoBusqueda') !== null ? document.querySelector('#tipoBusqueda') : "pokemon",
            pokeCards: document.querySelector('#pokeCards'),
            // pokecard: document.getElementById("#card"),


        },
        handlers: {
            pokemonFinderFormOnSubmit: async (e, cartaGirada = false) => {
                e.preventDefault();

                const query = App.htmlElements.valor.value;

                var searchType = "pokemon";
                var encontrado = false;
                while(!encontrado){
                    try {
                        const pokemon = await Utils.getPokemon({
                            query,
                            searchType,
                        });
                        const renderedTemplate = App.templates.render({
                            searchType,
                            response: pokemon,
                            cartaGirada,    
                        });
                        App.htmlElements.pokeCards.innerHTML = renderedTemplate;
                        Utils.moverCartas();
                        encontrado = true;
                    } catch (error) {
                        if(searchType === "ability"){
                            encontrado = true;
                            App.htmlElements.pokeCards.innerHTML = `<h1>${error}</h1>`;
                        }
                        searchType = "ability";
                    }
                }

            },
            girarCartasOnClick: (e) => {
                const card = document.querySelector("#card");
                const card2 = document.querySelector("#cardBack");
                if(card.style.display === "none"){
                    card.style = "";
                    card2.style.display = "none";
                }
                else{
                    card.style.display = "none";
                    card2.style = "";
                }
            }
        },
        init: () => {
            App.htmlElements.formulario.addEventListener('submit', App.handlers.pokemonFinderFormOnSubmit);
            App.htmlElements.pokeCards.addEventListener('click', App.handlers.girarCartasOnClick);
        },
        templates: {
            render: ({ searchType, response }) => {
                console.log(response);

                
                const renderMap = {
                    ability: App.templates.abilityCard,
                    pokemon: App.templates.pokemonCard,
                };
                return renderMap[searchType]
                    ? renderMap[searchType](response)
                    : App.templates.errorCard();
            },
            pokemonCard: ({ name, id, sprites }) => {
                console.log(name);
                const nombrePokemon = name.charAt(0).toUpperCase() + name.slice(1);
                respuesta = `<div class="canvas">
                                <div class="circle"></div>
                                <div id="card" class="card">
                                    <div class="pokemon text" id="pokemon-name">${nombrePokemon}</div>
                                    <div class="pokemon-id" id="pokemon-id">${id}</div>
                                    <img class="pokemon-imagen" id="pokemon-image" src="${sprites.other.home.front_default}"/>
                                    <div class="name text">Tipos</div>
                                </div>
                                <div id="cardBack" class="card" style="display: none;">
                                    <div class="pokemon text" id="pokemon-name">holla</div>
                                    <div clss="pokemon-id" id="pokemon-id">${id}</div>
                                    <img class="pokemon-imagen" id="pokemon-image" src="${sprites.other.home.front_default}"/>
                                    <div class="name text">Tipos</div>
                                </div>
                                <div class="circle"></div>
                            </div>`;
                return respuesta;
            },
            errorCard: () => `<h1>There was an error</h1>`,
            abilityCard: ({ id, name, pokemon }) => {
                const nombreHabilidad = name.charAt(0).toUpperCase() + name.slice(1);
                const pokemonList = pokemon.map(
                    ({ pokemon, is_hidden }) =>
                        `<li><a target="_blank" href="${pokemon.url}">${pokemon.name}${is_hidden ? "<i class='bx bxs-hide' style='color:#ffffff'  ></i>" : ""
                        }</a></li>`
                );
                return `<div class="canvas">
                            <div class="circle"></div>
                            <div id="cardAbility" class="card">
                                <div class="pokemon-id" id="pokemon-id">${id}</div>
                                <div class="pokemon text" id="pokemon-name">${nombreHabilidad}</div>
                                <ul class="pokemon-list">${pokemonList.join("")}</ul>
                            </div>
                            <div class="circle"></div>
                        </div>`;
            },
        },
    }
    App.init();
})(document.Utils);
