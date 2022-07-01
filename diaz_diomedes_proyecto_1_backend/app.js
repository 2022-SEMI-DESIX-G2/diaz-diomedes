require("dotenv").config();
var colors = require("colors");

const maxCacheTime = 1000 * 60;

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
      id: data.id,
      name: capital(data.name),
      weight: data.weight,
      height: data.height,
      abilities: data.abilities.map((ability) => capital(ability.ability.name)),
    };
    req.query.sprites && (pokedata.sprites = data.sprites);
    req.query.ubication && (pokedata.ubicaciones = ubicaciones);
    req.query.evolution && (pokedata.evolution = evolution);

    return pokedata;
  };

  if (CACHE[name] && JSON.parse(CACHE[name]).cacheTime > new Date()) {
    evolution = formatEvolutionChain(JSON.parse(CACHE[name]).evolution.chain);
    dataResponse = pokeDataFormat(
      JSON.parse(CACHE[name]).data,
      evolution,
      JSON.parse(CACHE[name]).ubicaciones
    );
    return res.json({
      name,
      cacheTime: JSON.parse(CACHE[name]).cacheTime,
      data: dataResponse,
      isCached: true,
    });
  }
  if (ERROR[name]) {
    return res.json({ name, data: JSON.parse(ERROR[name]), isCached: true });
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  let responseData;
  try {
    const { data } = await axios.get(url);
    const species = await axios.get(data.species.url);
    let evolution = await axios(species.data.evolution_chain.url);
    const ubicaciones = await axios.get(data.location_area_encounters);

    data.sprites = formatSprites(data.sprites).filter((s) => s);
    CACHE[name] = JSON.stringify({
      cacheTime: Date.now() + maxCacheTime,
      data,
      evolution: evolution.data,
      ubicaciones: ubicaciones.data,
    });

    evolution = formatEvolutionChain(evolution.data.chain);
    responseData = pokeDataFormat(data, evolution, ubicaciones.data);
  } catch {
    responseData = data;
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
  resultado.push({ name: capital(evo.species.name), is_baby: evo.is_baby });
  for (let e of evo.evolves_to) {
    formatEvolutionChain(e, resultado);
  }
  return resultado;
}

function formatSprites(images) {
  sprites = Object.keys(images).map(function (key) {
    if (images[key] !== null) {
      if (typeof images[key] === "string") {
        return images[key];
      }
    }
  });
  return sprites;
}

function capital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
