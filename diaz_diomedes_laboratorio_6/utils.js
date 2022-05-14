
(() => {
	const Utils = {
		settings: {
			pokeApiUrl: 'https://pokeapi.co/api/v2/',
		},
		getFormattedUrl: ({ query, searchType }) => {
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

		moverCartas: () => {
			const card = document.querySelector(".card");
			const card2 = document.querySelector("#cardBack");
			const circles = document.querySelectorAll(".circle");

			document.getElementsByTagName("body")[0].addEventListener("mousemove", (e) => {
				const x = -(e.pageX + e.currentTarget.offsetLeft);
				const y = -(e.pageY + e.currentTarget.offsetTop);
				if(card){
					card.style.transform = `translate3d(${x / 20}px, ${y / 20}px, 0)`;
				}
				if(card2){
					card2.style.transform = `translate3d(${x / 20}px, ${y / 20}px, 0)`;
				}
				Array.from(circles).forEach((circle) => {
					circle.style.transform = `translate3d(${x / 50}px, ${-y / 50}px, 0)`;
				});
			});
		}
	};
	document.Utils = Utils;


})();
