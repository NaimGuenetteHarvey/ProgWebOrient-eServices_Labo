'use client';
import Image from "next/image";

import { use, useState } from "react";
import { Towel } from "./_types/towel";
export default function Home() {
   const [myWisdom, SetMyWisdom ] = useState("C'est long")
   const [n, SetN ] = useState(13)
   const [towel, SetTowel] = useState(new Towel("brun", 1.2, "téléchargement.jpg" ) )
   //Fonction
   function bruh() : String{
    return "bruh";
   }
   function equalToN(value : number) : String{
    
     if (value == n){

        return "Identique"
     }
     else
     {
        return "Différent"

     } 
    
   }
  return (
   
  <div className="m-auto w-3xl">
    <div className="flex mt-1">
      <div className="flex-1 p-1 bg-pink-100">
        {n}
      </div>
      <div className="flex-3 p-1 bg-blue-100">
        {myWisdom}
      </div>
    </div>
      <div className="flex mt-1">
      <div className="flex-1 p-1 plume">
        {bruh()}
      </div>
      <div className="flex-3 p-1 bg-blue-100">
       {equalToN(8)}

       {equalToN(13)}
      </div>
    </div>
    <div className="flex mt-1">
      <div className="flex-1 p-1 plume">
        {bruh()}
      </div>
      <div className="flex-3 p-1 bg-blue-100">
        J'ai une belle serviette {towel.color} de {towel.lenght}
        La cible est maintenant {towel.wet}
        <img src={'/Image/' + towel.image}></img>
      </div>
    </div>
  </div>
  
  

  );
}
