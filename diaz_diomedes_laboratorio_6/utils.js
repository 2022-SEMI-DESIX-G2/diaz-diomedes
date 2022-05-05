
(() => {
    const Utils = {
        settings: {
            pokeApiUrl: 'https://pokeapi.co/api/v2/',
        },
        getFormattedUrl: ({ query, searchType}) => {
            return `${Utils.settings.pokeApiUrl}${searchType}/${query}`;
        },
        getPokemon: ({ query, searchType = "pokemon" }) => {
            return Utils.fetch({
                url: Utils.getFormattedUrl({ query, searchType }),
                searchType,
            })
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
    };
    document.Utils = Utils;

    
})();
