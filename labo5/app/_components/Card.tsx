import Link from "next/link"

import styles from '../_styles/card.module.css';

export default function Card(props: { characterName: string }) {
    return(
    <Link href={'/details/' + props.characterName}>
    <div className="card" title={`Afficher les détails de ${props.characterName}`}>
    <h4>characterName</h4>
    <img src={`/images/${props.characterName}.png`} alt={props.characterName} />
    </div>
    </Link>
     )

}