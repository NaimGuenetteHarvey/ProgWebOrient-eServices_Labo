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

        // Est-ce qu'un paramètre de route a été reçu ? Si non, on utilise "kenny"
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
    <h3>Détails sur ???</h3>
    <img src="/images/???.png" alt="???" />

    <div>
        <table>
            <tbody>
                <tr><td><b>Nom complet</b> : </td><td>???</td></tr>
                <tr><td><b>Âge</b> : </td><td>???</td></tr>
                <tr><td><b>Occupation</b> : </td><td>???</td></tr>
                <tr><td><b>Grade</b> : </td><td>???</td></tr>
                <tr><td><b>Nombre d'épisodes</b> : </td><td>???</td></tr>
            </tbody>
        </table>
    </div>
</div>
  );
}