import React from "react";
import { nanoid } from "nanoid";


export default function Quiz( props){
    return (
        <div  className="questions" >
        <h1 dangerouslySetInnerHTML={{__html:props.question}}></h1>
           
            <form >
            {props.answer.map((ans) => {
                  const uniqueId = nanoid();
                  const isCorrectAnswer =props.showAnswers && ans === props.correctAns
                   const isSelectedAnswer = props.showAnswers && props.checked === ans
            return(
                <div key={uniqueId} 
                className ={`button
                ${isCorrectAnswer&&isSelectedAnswer? "correct1":""|| isCorrectAnswer ? "correct" : "" }
                ${isSelectedAnswer ? "selected" : ""} 
                `}>
                    
            <input 
                type="radio"
                name={props.name}
                value={ans}
                id={uniqueId}
                checked={props.checked===ans}
                onChange ={ ()=> props.onChange(props.id, ans)}
                   disabled ={props.disabled}
                />

                <label htmlFor={uniqueId} dangerouslySetInnerHTML={{__html:ans}}></label>
                </div>
                )})}
                </form>
           
            <hr />
        </div>

    )

    
}