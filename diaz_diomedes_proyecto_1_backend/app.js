require("dotenv").config();
var colors = require("colors");

const maxCacheTime = 1000 * 30;

const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

const { PORT = 3000 } = process.env;

const CACHE = {};
const ERROR = {};

app.use(cors());

app.get("/cache", function (req, res) {
  res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function (req, res) {
  const { name } = req.params;

  const pokeDataFormat = (data, evolution, ubicaciones) => {
    const pokedata = {
      name: capital(data.name),
      weight: data.weight,
      height: data.height,
      abilities: data.abilities.map((ability) => capital(ability.ability.name)),
    };
    req.query.sprites && (pokedata.sprites = data.sprites);
    req.query.ubicacion && (pokedata.ubicaciones = ubicaciones);
    req.query.evolution && (pokedata.evolution = evolution);

    return pokedata;
  };

  if (
    CACHE[name] &&
    Date.parse(JSON.parse(CACHE[name]).cacheTime) > Date.now() - maxCacheTime
  ) {
    dataResponse = pokeDataFormat(JSON.parse(CACHE[name]).data);
    return res.json({
      name,
      cacheTime: JSON.parse(CACHE[name]).cacheTime,
      data: dataResponse,
      isCached: true,
    });
  }
  // if (ERROR[name]) {
  //   return res.json({ name, data: JSON.parse(ERROR[name]), isCached: true });
  // }

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  let responseData;
  try {
    const { data } = await axios.get(url);
    const species = await axios.get(data.species.url);
    var evolution = await axios(species.data.evolution_chain.url);
    console.log(evolution.data);

    console.log(formatEvolutionChain(evolution.data));
    evolution = formatEvolutionChain(evolution.data?.chain);
    const ubicaciones = await axios.get(data.location_area_encounters);
    responseData = pokeDataFormat(data, evolution, ubicaciones.data);

    CACHE[name] = JSON.stringify({ cacheTime: new Date(), data });
    console.log(CACHE[name]);
  } catch {
    // responseData = data;
    ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
  }
  res.json({
    name,
    cacheTime: JSON.parse(CACHE[name]).cacheTime,
    data: responseData,
    isCached: false,
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});

function formatEvolutionChain(evo, resultado = []) {
  resultado.push({ name: evo.species.name, is_baby: evo.is_baby });
  for (let e of evo.evolves_to) {
    Utils.formatearEvoluciones(e, resultado);
  }
  return resultado;
}

function capital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
