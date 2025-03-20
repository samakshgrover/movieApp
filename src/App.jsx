import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

const apiKey = "5d1a4607";

const data_base_url = `http://www.omdbapi.com`;
const poster_base_url = `http://img.omdbapi.com`;


function App() {

  const [term, setTerm] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(term){
      setResults(await getMoviesFromSearchTerm(term));
    }
  }

  return (
    <div>
      <div>
        <input onChange={(e) =>{
          e.preventDefault();
          setTerm(e.currentTarget.value)
        }} value={term}></input>
        <button onClick={handleSubmit}> Submit</button>
      </div>
      <div>
        {results && <ShowResults results={results} />}

      </div>
    </div>
  )
}

export default App

async function getMoviesFromSearchTerm(term) {
  const result = await axios.get(data_base_url, {
    params: {
      apiKey,
      s: term,
      // y: year,
      type: "movie",
      plot: "full",
      r: "json",
      page: 1,
    },
  });

  console.log(result.data);
  return result.data;
}

function ShowResults({results}){
  const movies = results.Search;
  const totalResults = results.totalResults;
  const Response = !!results.Response;
  console.log({movies, totalResults, Response})

  return <div>
    {
    !Response ? "No result found" :
    <div >
      {
      movies.map((movie, i) => {
        return (
        <div id={i} style={{display: "flex", gap: "5px" ,border: "1px solid", margin: "20px", padding: "10px"}} >
          <a style={{cursor: "pointer"}}>{movie.Title}</a>
          <div>{movie.Year}</div>
          <div>{movie.Type}</div>
        </div>)
      })}
    </div>
      }
  </div>
}