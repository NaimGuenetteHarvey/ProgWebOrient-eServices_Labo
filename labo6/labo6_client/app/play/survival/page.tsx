"use client";

import { CounterContext } from "@/app/_components/context";
import { Question } from "@/app/_types/question";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
export default function Survival(){

    // Statistiques
    const {counter, 
                setCounter, 
             
                survie, 
                setSurvie } = useContext(CounterContext);
    
    

    // États pour le jeu
    const [questions, setQuestions] = useState<Question[]>([]);
    const [nbErrors, setNbErrors] = useState(0);
    const [score, setScore] = useState<number>(0);
    const [questionIndex, setQuestionIndex] = useState(0);

    // Compte à rebours aléatoire (1 à 10) pour la bombe
    const [countdown, setCountdown] = useState(Math.floor(Math.random() * 10) + 1);

    // Obtenir les 5 premières questions du jeu
    useEffect(() => {

        fillQuestions(5);

    }, []);

    // Cliquer réduit le compte à rebours de 1
    function bombClick(){
        setCountdown(Math.max(0, countdown - 1));
    }

    // Retourne un <div> avec une bombe ou une explosion selon le compte à rebours
    function getFidgetBomb(){
        return <div className="bomb" onClick={bombClick}>{countdown > 0 ? '💣' : '💥'}</div>
    }

    // Remplir la liste de questions
    async function fillQuestions(length : number){

        setQuestions(await getQuestions(length));

    }

    // Retourne la classe appropriée pour les choix de réponses (vert, rouge ou rien)
    function getAnswerClass(question : Question, index : number){

        if(question.selected < 0) return "";
        if(question.correct == index) return "right";
        if(question.selected == index && question.correct != index) return "wrong";
        return "";

    }

    // Gérer le choix d'une réponse, potentiellement valide ou erroné
    async function chooseAnswer(question : Question, answer : string){
        if(question.selected >= 0) return;
        let updatedQuestions = [...questions];
        let currentIndex = 0;
        let mistakeMade = false;
        for(let q of updatedQuestions){
            if(q.text == question.text){
                q.selected = q.answers.indexOf(answer);
                currentIndex = updatedQuestions.indexOf(q);
                if(q.selected == q.correct) setScore(score + 1);
                else{
                    setNbErrors(nbErrors + 1);
                    mistakeMade = true;

                    // Fin de la partie
                    if(nbErrors + 1 == 3){

                        // Retirer les questions suivantes
                        updatedQuestions.splice(currentIndex + 1, updatedQuestions.length - currentIndex - 1);
                        
                        // +1 partie jouée
                        setCounter(counter + 1);

                        // Nouveau record ?
                        setSurvie(Math.max(survie, updatedQuestions.length - 3));
                    }
                }
            }
        }

        if(nbErrors + (mistakeMade ? 1 : 0) < 3 && currentIndex == updatedQuestions.length - 1){
            updatedQuestions.push(...(await getQuestions(5)));
        }

        setQuestionIndex(questionIndex + 1);
        setQuestions(updatedQuestions);
    }

    // Requête pour obtenir les questions
    async function getQuestions(length : number){

        if(isNaN(length) || length <= 0) length = 5; // Longueur invalide ? Utilisons 5

        const response = await axios.get(`http://localhost:5064/api/questions/getquestions/${length}`);
        console.log(response.data);

        let q : Question[] = [];

        for(let r of response.data){
            q.push(new Question(r.text, r.correct, r.answers, -1));
        }

        return q;

    }

    return(
        <div>
            {getFidgetBomb()}
            <div className="options">
                <div>Nombre de parties : {counter}</div>
                <div>Record (survie) : {survie}</div>
            </div>
            <h3>Mode survie (3 erreurs max.)</h3>
            <div>
                {questions.map((q, index) => questionIndex >= index &&
                <div key={index} className="question">
                    <div>{q.text}</div>
                    <div className="answers">
                        {q.answers.map((a, index) => 
                        <div key={index} onClick={() => chooseAnswer(q, a)} className={getAnswerClass(q, index)}>{a}</div>
                        )}
                    </div>
                </div>
                )}
                { nbErrors >= 3 &&
                  <div className="result">Votre score est de {score} !</div> 
                }
            </div>
        </div>
    );

}