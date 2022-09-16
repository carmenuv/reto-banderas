import {Container, Grid, FormControl, InputLabel, TextField, Select, MenuItem, Paper, CardMedia, CardContent, CircularProgress,} from "@mui/material";
import { useEffect, useState } from "react";
import { getDataFromPokemon } from "../Service/Api";
import FlagDetail from "./Details";
import './index.css';

const Flags = () => {
    const [countries, setCountries] = useState([]);
  
    const [region, setRegion] = useState("");
  
    const fetchCountries = async () => {
      const response = await getDataFromPokemon(
        "https://restcountries.com/v3.1/all"
      );
      setCountries(response);
    };
  
    const handleRegion = async (e) => {
      setRegion(e.target.value);
      // vamos a evaluar si el valor es igual a all entonces ejecutsa la funcion
      // fetchCountries
      if (e.target.value === "all") {
        fetchCountries();
        return;
      }
  
      // primero debemos limpiar para poder llenarlo con la nueva informacion
      setCountries([]);
      const response = await getDataFromPokemon(
        `https://restcountries.com/v3.1/region/${e.target.value}`
      );
      setCountries(response);
    };
  
    // vamos a crear una funcion la cual se encargue de buscar los paises
    const handleSearchCountry = (e) => {
      // Es una buena practica decirle que inicie a contar cuando tengamos mas de 3 letras
      const countryName = e.target.value;
  
      if (countryName.length === 0) {
        fetchCountries();
      }
  
      if (countryName.length > 3) {
        // aca debemos iniciar la busqueda
        // para poder hacer la busqueda debemos transformar todo el text a UPPERCASE or LOWECASE
        const filterCountries = countries.filter((country) =>
          country.name.official.toUpperCase().includes(countryName.toUpperCase())
        );
        setCountries(filterCountries);
      }
    };
  
    useEffect(() => {
      fetchCountries();
    }, []);
  
    return (
      <Container>
        <Grid container spacing={3} mt={5}>
          <Grid item md={6}>
            <TextField
              onChange={handleSearchCountry}
              label="Busca tu Pais..."
              fullWidth
              variant="filled"
            />
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Filter by Region</InputLabel>
              <Select
                label="Filtra por Region"
                value={region}
                onChange={handleRegion}
              >
                <MenuItem value="all">Todas las regiones</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Americas">Americas</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {countries.length > 0 ? (
            countries.map((country) => (
              <Grid item md={3} xs={12}>
                
                  <Paper elevation={3} >
                    <CardMedia
                      component="img"
                      height={200}
                      image={country.flags.svg}
                    />
                    <CardContent>
                      <h4 className="countryname" style={{textAlign: "center"}}>{country.name.common}</h4>
                    <FlagDetail nombrebandera={country.name.common}/>
                    </CardContent>
                  </Paper>
              
              </Grid>
            ))
          ) : (
            <div className="center loading">
              <CircularProgress />
              <h4>Buscando...</h4>
            </div>
          )}
        </Grid>
      </Container>
    );
  };

export default Flags;