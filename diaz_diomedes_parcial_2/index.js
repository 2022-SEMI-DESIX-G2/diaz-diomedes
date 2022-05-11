((Utils) => {
    const App = {
        htmlElements: {
            formularioBuscador: document.querySelector("#formulario-buscador"),
            tipoBusqueda: document.querySelector("#tipo-busqueda"),
            entradaBuscador: document.querySelector("#entrada-buscar"),
            botonLimpiar: document.querySelector("#boton-limpiar"),
            botonBuscar: document.querySelector("#boton-buscar"),
            tarjetasSalida: document.querySelector("#tarjetas"),
        },
        init: () => {
            App.htmlElements.formularioBuscador.addEventListener("submit",App.handlers.buscarPokemonSubmit);
            App.htmlElements.botonLimpiar.addEventListener("click",App.handlers.limpiarTarjetasClick);
        },
        handlers: {
            buscarPokemonSubmit: async (e) => {
                e.preventDefault();

                const query = App.htmlElements.entradaBuscador.value;
                const searchType = App.htmlElements.tipoBusqueda.value;
                try {
                    const response = await Utils.getPokemon({
                        query,
                        searchType,
                    });
                    const renderedTemplate = App.templates.render({
                        searchType,
                        response,
                    });
                    App.htmlElements.tarjetasSalida.innerHTML = await renderedTemplate;
                    App.htmlElements.botonLimpiar.style.display = "";

                    App.htmlElements.botonBuscar.disabled = true;

                } catch (error) {
                    App.htmlElements.tarjetasSalida.innerHTML = App.templates.errorCard(error);
                    App.htmlElements.botonLimpiar.style.display = "";

                    App.htmlElements.botonBuscar.disabled = true;
                }
            },
            limpiarTarjetasClick: (e) => {
                e.preventDefault();
                App.htmlElements.tarjetasSalida.innerHTML = "";
                App.htmlElements.botonLimpiar.style = "display: none";

                App.htmlElements.botonBuscar.disabled = false;

            },
            buscarEvoluciones: async (link) => {
                try {
                    let response = await Utils.getEvoluciones({link});
                    let cadenaEvolucion = await Utils.getEvoluciones({link: response.evolution_chain.url});
                    respuesta = Utils.formatearEvoluciones(cadenaEvolucion.chain);
                    return respuesta;
                } catch(e) {
                    console.log(e);
                }
            }
        },
        templates: {
            render: ({ searchType, response }) => {
                const renderMap = {
                    ability: App.templates.abilityCard,
                    pokemon: App.templates.pokemonCard,
                };
                return renderMap[searchType]
                    ? renderMap[searchType](response)
                    : App.templates.errorCard(response);
            },

            errorCard: (error) =>  `<div class="tarjeta">
                                        <h2 id="nombre">Error</h2>
                                        <div id="who-learn">
                                            <span>Hubo un error</span><br>
                                            <span>${error}</span>
                                        </div>
                                    </div>`,
                                        
            pokemonCard: async ({ id, name, weight, height, sprites, abilities, species }) => {
                const habilidadesLista = abilities.map(
                    ({ ability }) =>
                        `<li>${ability.name}</li>`
                    );


                evolucion = await App.handlers.buscarEvoluciones(species.url);

                const evoLista = evolucion.map(
                    ({ name,is_baby }) =>
                    `<li>${name}${is_baby ? "<object data='imgs/baby.svg'></object>" : ""}</li>`
                );  
                
                return `<div class="tarjeta">
                            <h2 id="nombre">${name} (${id})</h2>
                            <div id="sprites">
                                <span>Sprites</span><br>
                                <img id="img-front" src="${sprites.front_default}">
                                <img id="img-back" src="${sprites.back_default}">
                            </div>
                            <div id="evolution-chain">
                                <span>Evolution chain</span><br>
                                <ul>
                                    ${evoLista.join("")}
                                </ul>
                            </div>
                            <div id="weight-height">
                                <span>Weight / Height</span><br>
                                <p>${weight} / ${height}</p>
                            </div>
                            <div id="abilities">
                                <span>Abilities</span><br>
                                <ul>${habilidadesLista.join("")}</ul>
                            </div>
                        </div> `;
            },
            abilityCard: ({name, pokemon }) => {
                const pokemonLista = pokemon.map(
                    ({ pokemon, is_hidden }) =>
                        `<li>${pokemon.name}${is_hidden ? "<object data='imgs/hide.svg'></object>" : ""}</li>`
                    );
                return `<div class="tarjeta">
                            <h2 id="nombre">${name}</h2>
                        <div id="who-learn">
                            <span>Who can learn it?</span><br>
                            <ul>
                                ${pokemonLista.join("")}  
                            </ul>
                        </div>
                    </div>`;
            },
        },
    };
    App.init();
})(document.Utils);