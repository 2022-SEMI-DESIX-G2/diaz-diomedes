(() => {
    const Utils = {
        settings: {
            backendBaseUrl: "https://pokeapi.co/api/v2",
        },
        getFormattedBackendUrl: ({ query, searchType }) => {
            return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
        },
        getPokemon: ({ query, searchType = "pokemon" }) => {
            return Utils.fetch({
                url: Utils.getFormattedBackendUrl({ query, searchType }),
                searchType,
            });
        },
        getEvoluciones: ({ link, searchType = "" }) => {
            return Utils.fetch({
                url: link,
                searchType,
            });
        },
        fetch: async ({ url, searchType }) => {
            try {
                const rawResponse = await fetch(url);
                if (rawResponse.status !== 200) {
                    throw new Error(`${searchType} not found`);
                }
                return rawResponse.json();
            } catch (error) {
                throw error;
            }
        },
        formatearEvoluciones: (evo, resultado = []) => {
            resultado.push({name: evo.species.name, is_baby: evo.is_baby});
            if (evo.evolves_to.length > 0) {
                for(a of evo.evolves_to ){
                    Utils.formatearEvoluciones(a, resultado);
                } 
            }
            return resultado;

        }
    };
    document.Utils = Utils;
})();