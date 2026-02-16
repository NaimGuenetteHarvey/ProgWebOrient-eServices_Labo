'use client'; // Seulement nécessaire pour les composants interactifs
import { useEffect, useState } from "react";
import { Character } from "../_types/character";;
import axios from "axios";
import { useParams } from "next/navigation";
export default function details() {

   const [characterName, setCharacterName] = useState<string|null>(null);
   const [characterDetails, setCharacterDetails] = useState<Character|null>(null);
   const params = useParams<{ characterName : string[] }>();
     useEffect(() => {

        
        const name = params.characterName ? params.characterName[0] : "kenny";

        setCharacterName(name);
        getCharacter(name);

    }, []);


  async function getCharacter(name : string){

     const response = await axios.get("https://spapi.dev/api/characters?search=" + name)
     console.log(response.data);
     const json = response.data.data[0];

    setCharacterDetails(new Character(json.name, json.age, json.occupation, json.grade, json.episodes.length));

  }

  return (
     <div>
            {
                characterDetails != null && characterName != null && 
                <div>
                    <h3>Détails sur {characterName}</h3>
                    <img src={`/images/${characterName}.png`} alt={characterName} />

                    <div>
                        <table>
                            <tbody>
                                <tr><td><b>Nom complet</b> : </td><td>{characterDetails.name}</td></tr>
                                <tr><td><b>Âge</b> : </td><td>{characterDetails.age}</td></tr>
                                <tr><td><b>Occupation</b> : </td><td>{characterDetails.occupation}</td></tr>
                                <tr><td><b>Grade</b> : </td><td>{characterDetails.grade}</td></tr>
                                <tr><td><b>Nombre d'épisodes</b> : </td><td>{characterDetails.nbEpisodes}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            
        </div>
  );
}