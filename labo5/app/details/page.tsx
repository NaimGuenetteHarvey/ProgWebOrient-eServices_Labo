'use client'; // Seulement nécessaire pour les composants interactifs

export default function details() {

  const characterName : string | null = null
  const characterDetails : Character | null = null
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