import {Button, Dialog, DialogContent, Grid, Card, CardMedia, ListItem, ListItemText, Divider, Typography, IconButton} from "@mui/material"
import { useState } from "react";
import { getDataFromPokemon } from "../Service/Api";
import CloseIcon from '@mui/icons-material/Close';

const FlagDetail = (props) => {
  const [abrir, setAbrir] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const fetchDetailFromPokemon = async () => {
      const country = await getDataFromPokemon(`https://restcountries.com/v2/name/${props.nombrebandera}`);
      console.log(country);
      setCountryData(country);
  }

  const handleOpenDialog = async () => {
      if (!abrir) {
          await fetchDetailFromPokemon()
      }
      setAbrir(!abrir);
  }


  return (
      <div>
          <Button onClick={handleOpenDialog} variant="outlined" color="error" fullWidth> Detalle del País</Button>
          <Dialog open={abrir} onClose={handleOpenDialog}>
              <DialogContent>
                  {
                      Object.keys(countryData).length > 0 && (
                          <div>
                              <ListItem sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                              <Typography variant="h3" gutterBottom>{props.nombrebandera}</Typography>
                              <IconButton
                                onClick={handleOpenDialog}
                                aria-label="close"
                              >
                                <CloseIcon />
                              </IconButton>                           

                              
                              </ListItem>
                                  
                                  <ListItem>
                                    <ListItemText 
                                    primary={countryData[0].capital}
                                    secondary="Capital"
                                    />
                                  </ListItem>                                  
                                  <Divider/>
                                  <ListItem>
                                    <ListItemText
                                    primary={countryData[0].subregion}
                                    secondary="Subregion"
                                    />
                                  </ListItem>
                                  <Divider/>
                                  <ListItem>
                                    <ListItemText
                                    primary={countryData[0].region}
                                    secondary="Continent"
                                    />                                    
                                  </ListItem>
                                  <Divider/>
                                  <ListItem>
                                    <ListItemText  
                                    primary={countryData[0].population} 
                                    secondary="Población" />
                                  </ListItem>                                  
                                  
                                  <CardMedia
                                      component="img"
                                      height={200}
                                      image={countryData[0].flags.svg}
                                  />                                  

                              

                          </div>
                      )
                  }
              </DialogContent>
          </Dialog>
      </div>
  );
};

export default FlagDetail;