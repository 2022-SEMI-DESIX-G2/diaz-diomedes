const axios = require('axios').default;
const c = require('ansi-colors');

// +===============================+
// | Variable para cambiar pokemon |
pokemon = "Pikachu";

async function getPokemon(busqueda) {
    try {
        busqueda = busqueda.toLowerCase();
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${busqueda}/`);
        const cadena = await axios.get(data.species.url);
        const evoluciones = await axios.get(cadena.data.evolution_chain.url);
        // console.log((evoluciones.data));
        console.log((template(data, evoluciones.data)));

    } catch (error) {
        console.error(error);
    }
}

getPokemon(pokemon);




function template({ name, id, weight, height, abilities }, { chain }) {
    ;
    name = name.replace(name[0], name[0].toUpperCase());
    lineaName = `| ${c.bold.blue(name)}                       ${c.bold.yellow(id)}  |`;
    lineaName = deleteSpace(name, lineaName);
    lineaName = deleteSpace(id.toString(), lineaName);
    lineaWeight = `| ${c.greenBright(weight)}                     ${c.green(height)}    |`;
    lineaWeight = deleteSpace(weight.toString(), lineaWeight);
    lineaWeight = deleteSpace(height.toString(), lineaWeight);
    habilidadesList = abilities.map(
        ({ ability }) =>
            deleteSpace(ability.name, `| ${c.cyan(ability.name)}                         |`)
    );
    // evolucionesList = [];
    console.log(c.bgGreenBright("---------------------------------"))
    // console.log(chain)
    evoluciones = formatearEvoluciones(chain);
    // console.log(evoluciones)
    // console.log(c.bgBlack(evoluciones));
    evolucionesList = evoluciones.map(
        ( name ) => 
            deleteSpace(name, `| ${c.magentaBright(name)}                         |`)
        );
    respuesta = c.red(`
        ▒█████▒▒▒▒▒▒▒▒▒▒█▒▒████▒████▒▒███▒▒▒▒▒█████▒▒███████
        ██▒▒▒█▒▒██████▒▒████▒▒▒▒█▒▒▒▒▒█▒██▒▒▒▒▒█▒▒█▒▒▒▒▒█▒▒▒
        █▒▒███▒▒█▒▒▒▒█▒▒█▒▒██▒▒▒███▒▒▒█▒▒██▒▒▒█████▒▒▒▒▒█▒▒▒
        ████▒▒▒▒█▒▒▒██▒▒█▒▒▒██▒▒█▒▒▒▒▒███▒███▒█▒▒▒▒▒▒▒▒█▒▒▒▒
        █▒▒▒▒▒▒▒█████▒▒▒█▒▒▒▒██▒█▒▒▒▒█▒▒▒▒▒▒█▒█▒▒▒▒▒▒▒▒█▒▒▒▒
        █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒████▒█▒▒▒▒▒▒█▒█▒▒▒▒▒████████
                    +--------------------------+
                    ${(lineaName)}
                    |                          |
                    |                          |
                    | ${c.bold.greenBright("Weight")}            ${c.bold.green("height")} |
                    ${(lineaWeight)}
                    |                          |
                    | ${c.bold.cyan("Habilidades")}              |
                    ${habilidadesList.join("\n\t\t    ")}       
                    |                          |
                    | ${c.bold.magenta("Evoluciones")}              |
                    ${evolucionesList.join("\n\t\t    ")}
                    |                          |
                    +--------------------------+`);
    return respuesta;
}


function deleteSpace(valor, cadena) {
    for (let i = 0; i < valor.length; i++) {
        cadena = cadena.replace('  ', ' ');
    }
    return cadena;
}


function formatearEvoluciones(evo, resultado = []) {
    resultado.push(evo.species.name);
    for (a of evo.evolves_to) {
        formatearEvoluciones(a, resultado);
    }
    return resultado;

}