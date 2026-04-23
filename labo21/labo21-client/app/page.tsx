"use client";

import { useEffect, useRef } from "react";
import { usePictureAPI } from "./_hooks/use-picture-api";

export default function Home() {
 const myFileInput = useRef<HTMLInputElement>(null);


  const {
    // État
    pictureIds,
    // Requêtes
    postPicture, getPictureIds, deletePicture
  } = usePictureAPI();

  useEffect(() => {

    // Appeler la bonne fonction pour remplir l'état pictureIds dans le hook usePictureAPI.
    getPictureIds();

  }, []);

  function prepareFormData() {


    if (myFileInput.current == null)
    {
      console.log("PAS BON");
      return;

    }
    if (myFileInput.current.files == null)
    {

      console.log("AUCUN FICHIER");
      return;
    }
    const file = myFileInput.current.files[0];
    const formData= new FormData();
    formData.append("myImage", file);


     postPicture(formData);

  }
  

  return (
    <div>
      <h3>Laboratoire 21</h3>

      <input type="file" ref={myFileInput} accept="images/*" multiple />
      <button onClick={prepareFormData}>Ajouter l'image</button><br /><br />
      <button onClick={getPictureIds}>Mettre à jour les images affichées</button>

      <br /><br />

      {/* Affichage des images */}
      {
        pictureIds.map(i => 
          <div className="picture" key={i}>
            <div className="delete"><button onClick={()=>deletePicture}>Supprimer</button></div>
            <a href="" target="blank">
              <img alt="monImage" src={'https://localhost:7180/api/Pictures/GetPicture/small/' + i}/>
            </a>
          </div>
        )
      }

    </div>

  );
}
