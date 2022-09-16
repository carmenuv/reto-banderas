const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100"

export const getDataFromPokemon = async(url=BASE_URL)=>{
  try{
    //ahora debemos ejecutar el fetch para poder traer información
    const response = await fetch (url)
    const data = response.json();
    console.log("data", data);
    return data;

  }catch(error){
    console.log(error.message)
  }
}