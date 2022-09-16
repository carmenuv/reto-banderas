import { Button, Dialog, DialogContent, Grid, Chip } from "@mui/material"
import { useState } from "react";
import { getDataFromPokemon } from "../Service/Api";


const PokemonDetail = (props) => {
    const [abrir, setAbrir] = useState(false);
    
    const [pokemonData, setPokemonData] = useState({});

    const fetchDetailFromPokemon = async () => {
        const pokemon = await getDataFromPokemon(props.url);
        setPokemonData(pokemon);
    }

    const handleOpenDialog = async () => {
        if (!abrir) {
            await fetchDetailFromPokemon()
        }
        setAbrir(!abrir);
    };

    return (
        <div>
            <Button onClick={handleOpenDialog} variant="contained" color="error"> Detalle del Pokemon</Button>
            <Dialog open={abrir} onClose={handleOpenDialog} >
                <DialogContent>
                    {/* necesifamos extraer ls keys de un objeto  */}
                    {Object.keys(pokemonData).length > 0 && (
                        <div>
                            <h2> {props.pepito}</h2>
                            <Grid container>
                                <Grid item md={10}>
                                    <h4>Habilidades</h4>
                                    {pokemonData.abilities.map((abilitie) => (
                                        <Chip
                                            label={abilitie.ability.name}
                                            color="primary"
                                            sx={{ marginRight: 2 }}
                                        />
                                    ))}
                                    <h4>DAtos</h4>
                                    {pokemonData.types.map((type) => (
                                        <Chip
                                            label={type.type.name} />
                                    ))}
                                    <Grid item>
                                        <img width={300} src={pokemonData.sprites.other["official-artwork"].front_default} />
                                    </Grid>
                                    <Grid container>
                                        <Grid item sm={6}>
                                            <img src={pokemonData.sprites.versions["generation-iii"].emerald["front_shiny"]} width={100} alt="" />

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </div>
                    )}

                    <Button variant="contained" onClick={handleOpenDialog}>Cerrar</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};


export default PokemonDetail;