"use client";

import { useState } from "react";
import { Song } from "./_types/song";
import axios from "axios";

export default function Home() {
const lastFmKey = "9a8a3facebbccaf363bb9fd68fa37abf"; 
  // Pour obtenir l'input de l'utilisateur
  const [artistName, setArtistName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  // Pour afficher les données
  const [similarArtists, setSimilarArtists] = useState<string[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
   
  const [ErrorMessage, setErrorMessage] = useState("")

  // Requête #1
  async function getSimilarArtists(){

    try{
       const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=${lastFmKey}&format=json`);
       console.log(response.data);

     let  similarArtists:string[] = []
     for (let s  of response.data.similarartists.artist)
     {
      
       similarArtists.push(s.name)
        
     }
     setSimilarArtists(similarArtists);
    
    }
     catch(error) {
      setErrorMessage("Cet artiste n'existe pas.");
    
     }
  }

  // Requête #2
  async function getTopSongs(){

    const response = await axios.get("https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag= "+genre+"&api_key="+lastFmKey+"&format=json");
    console.log(response.data);

    let songList : Song[] = [];
    for (let s of response.data.tracks.track)
    {
      songList.push(new Song(s.name, s.artist.name, s.duration));
    }
    setSongs(songList);
    
  }

  return (
    <div className="w-5xl m-auto mt-2">
      <div className="bg-zinc-700 py-4 px-2 rounded-lg text-4xl">
        🎵 Laboratoire 3
      </div>
      <div className="flex gap-2 mt-2">

        {/* Colonne à gauche : Obtenir les artistes similaires */}
        <div className="flex-1 bg-zinc-700 p-2 rounded-lg">

          {/* Formulaire */}
          <div className="flex items-center">
            <span className="font-bold">Artiste :</span>
            <input value={artistName } onChange={(e) => setArtistName(e.target.value)} type="text" className="px-1 py-0.5 bg-zinc-100 rounded-sm border-1 mx-2 text-zinc-900 text-sm border-zinc-500" placeholder="Nana Mouskouri" />
            <button className="bg-zinc-300 rounded-md border-zinc-500 border-1 cursor-pointer px-2 py-0 text-zinc-900 active:bg-zinc-400" onClick={getSimilarArtists}>Chercher</button>
          </div>
          <hr className="text-zinc-400 my-2" />

          {/* Données */}
          <div className="text-xl">Résultats :</div>
          <ul className="list-disc ml-4 text-sm">          
             {similarArtists.map((i)=> <li key={i}>{i}</li>)}
           
          </ul>
        </div>

        {/* Colonne pas à gauche : Obtenir les meilleurs chansons d'un genre */}
        <div className="flex-1 bg-zinc-700 p-2 rounded-lg">

          {/* Formulaire */}
          <div className="flex items-center">
            <span className="font-bold">Genre :</span>
            <input value={genre} onChange={(e) => setGenre(e.target.value)} type="text" className="px-1 py-0.5 bg-zinc-100 rounded-sm border-1 mx-2 text-zinc-900 text-sm border-zinc-500" placeholder="pop" />
            <button className="bg-zinc-300 rounded-md border-zinc-500 border-1 cursor-pointer px-2 py-0 text-zinc-900 active:bg-zinc-400" onClick={getTopSongs}>Chercher</button>
          </div>

          <hr className="text-zinc-400 my-2" />

          {/* Données */}
          <div className="text-xl">Résultats :</div>
          <ul className="list-disc ml-4 text-sm">
            {songs.map((i)=> <li key={i.name}>{i.name} de {i.artist} ({i.duration} secondes)</li>)}
           
          </ul>
        </div>

      </div>
    </div>
  );
}
