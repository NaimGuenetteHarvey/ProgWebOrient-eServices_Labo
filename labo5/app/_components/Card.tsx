

export default function Card(props: { characterName: string }) {
    return(
    <div className="card" title={`Afficher les détails de ${props.characterName}`}>
    <h4>characterName</h4>
    <img src={`/images/${props.characterName}.png`} alt={props.characterName} />
    </div>
     )

}