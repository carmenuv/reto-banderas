import { Container, Grid, Card, CardMedia, CardContent } from "@mui/material"
import { useEffect, useState } from "react";
import PokemonDetail from "./Dialog";
import { getDataFromPokemon } from "./services";

const Home = () => {
    const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"
    //guarda la lista de pokemones
    const [pokemons, setPokemon] = useState([])

    //ejecuta a getDataFromPokemon
    const fetchPokemonList = async () => {
        const listPokemones = await getDataFromPokemon();
        //como ya se tiene la lsita de pokemones,se usat setPokemons para guardar la lista
        console.log("listapokemones", listPokemones.results);
        setPokemon(listPokemones.results);
    };
    // {pokemons.length > 0 &&
    //   pokemons.map(pokemon =>
    //   <p>{pokemon.name}</p>
    //  )}
    //useEffect se usa para ejecutar una funcion al inicializar una aplicacion
    useEffect(() => {
        fetchPokemonList();
    }, [])
    return (
        <Container className="container">
            <h1>Pokedex</h1>
            <Grid container spacing={4}>
                {pokemons.length > 0 &&
                    pokemons.map((pokemon, index) =>
                        <Grid item md={4} sm={5} xs={5}>
                            <Card className="card-pokemon">
                                <CardMedia component="img" className="img-pokemon" image={`${imgUrl}${index + 1}.svg`} />
                                <CardContent className="center">
                                    <h3 className="name-pokemon">{pokemon.name}</h3>
                                    <PokemonDetail pepito={pokemon.name} url={pokemon.url}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
            </Grid>

        </Container>
    )
}

export default Home;