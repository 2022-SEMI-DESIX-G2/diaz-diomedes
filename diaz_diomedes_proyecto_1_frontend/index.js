(() => {
  const App = {
    config: {
      apiBaseUrl: "http://localhost:8080/pokemon",
    },
    htmlElements: {
      form: document.querySelector("#pokemon-form"),
      input: document.querySelector("#pokemon-input"),
      cars: document.querySelector(".pokemon-response"),
      spritesCheckbox: document.querySelector("#sprites-checkbox"),
      ubicationCheckbox: document.querySelector("#ubication-checkbox"),
      evolutionCheckbox: document.querySelector("#evolution-checkbox"),
    },
    init: () => {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.handleFormSubmit
      );
    },
    handlers: {
      handleFormSubmit: async (e) => {
        e.preventDefault();

        try {
          App.htmlElements.cars.innerHTML = App.templates.pokeballsLoanding();
          const pokemon = App.htmlElements.input.value.toLowerCase();
          const querys = `?${
            App.htmlElements.spritesCheckbox.checked ? "sprites=true&" : ""
          }${
            App.htmlElements.ubicationCheckbox.checked ? "ubication=true&" : ""
          }${App.htmlElements.evolutionCheckbox.checked ? "evolution=true" : ""}
          `;
          const url = App.utils.getUrl({ pokemon, querys });
          const { data } = await axios.post(url);
          App.htmlElements.cars.innerHTML = "";
          App.htmlElements.cars.innerHTML = App.templates.pokemonGeneral(
            data.data,
            data
          );
          if (data.data.sprites) {
            App.htmlElements.cars.innerHTML += App.templates.pokemonSprites(
              data.data.sprites
            );
          }
          if (data.data.ubicaciones) {
            App.htmlElements.cars.innerHTML += App.templates.pokemonUbicaciones(
              data.data
            );
          }
          if (data.data.evolution) {
            App.htmlElements.cars.innerHTML += App.templates.evolution(
              data.data
            );
          }
        } catch (e) {
          App.htmlElements.cars.innerHTML = App.templates.errorCard(e);
        }
      },
    },
    templates: {
      errorCard: (error) =>
        `<div class="trayBox error">
          <h2 id="nombre">Error</h2>
          <div id="error-message">
            <p>${error}</p>
              <span>Hubo un error</span><br>
              <br>
          </div>
          <img id="img-pokeball" src="https://webstockreview.net/images/pokeball-clipart-open-drawing-2.png">
        </div>`,
      pokeballsLoanding: () => `
          <img class="img-pokeball" src="./imgs/Pokebals.gif"/>`,
      evolution: ({ evolution }) => {
        evol = evolution.map(
          (evolution) =>
            `<li>${evolution.name} ${
              evolution.isbaby ? "<object data='./imgs/baby.svg'></object>" : ""
            }</li>`
        );
        return `<div class="general-info trayBox">
          <h2>${
            evolution.length > 1
              ? "Lista de Evoluciones"
              : "Pokemon sin evolución"
          }</h2>
            <ul>
              ${evol.join("")}
            </ul>
          </div>`;
      },
      pokemonSprites: (sprites) => {
        spritesList = sprites
          .map((val) => {
            if (typeof val === "string") {
              return `<img src="${val}">`;
            }
          })
          .filter((s) => s);
        console.log(spritesList);
        return `<div class="general-info trayBox">
          <h2>Sprites</h2>
          <ul>
            ${spritesList.join("")}
          </ul>
        </div>`;
      },
      pokemonUbicaciones: (ubicaciones) => {
        ubications = ubicaciones.ubicaciones.map(
          (ubicacion) =>
            `<li>${ubicacion.location_area.name} <br>
            Chance: ${ubicacion.version_details[0].encounter_details[0].chance}</li>`
        );
        return `<div class="general-info trayBox ">
          <h2>Ubicaciones</h2>
          <ul>
            ${ubications.join("")}
          </ul>
        </div>`;
      },

      pokemonGeneral: (
        { name, id, weight, height, abilities },
        { cacheTime, isCached }
      ) => `<div class="general-info trayBox">
          <h2 class="Pokename" >${name}</h2>
          <p class="Pokeid">${id}</p>
          <span>Peso / Altura</span><br/>
          <span>${weight} / ${height}</span>
          <h2>Habilidades</h2>
          <ul class="habilidades">
            ${abilities.map((ability) => `<li>${ability}</li>`).join("")}
          </ul>
        </div>
        <div class="general-info trayBox">
          <h2>${App.utils.CountDown(cacheTime)}</h2>
          <h2>${isCached ? "Si" : "No"} esta en cache</h2>
        </div>`,
    },
    utils: {
      getUrl: ({ pokemon, querys }) => {
        return `${App.config.apiBaseUrl}/${pokemon}${querys}`;
      },
      CountDown: (time) => {
        const now = new Date().getTime();
        const diff = time - now;
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${hours} horas, ${minutes} minutos, ${seconds} segundos`;
      },
    },
  };
  App.init();
})();
