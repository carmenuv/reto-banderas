const BASE_URL=`https://pokeapi.co/api/v2/pokemon?limit=200`

export const getDataFromPokemon = async (url=BASE_URL)=>{
    try{
        //para traer la informacion
        const response = await fetch(url);
        //para que deje de ser jsom
        const data = await response.json();
        console.log("data",data); 
        return data;
    }
    catch (error){
        console.log(error.message);
    }
}